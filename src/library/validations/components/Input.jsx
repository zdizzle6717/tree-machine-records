'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import defaultValidations from '../constants/defaultValidations';
import FormActions from '../actions/FormActions';
import {addErrorMessage, removeErrorMessage, getInput, findFormName} from '../utilities';

const mapStateToProps = (state) => {
	return {
		'forms': state.forms
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addInput': FormActions.addInput,
		'removeInput': FormActions.removeInput
	}, dispatch);
};

class Input extends React.Component {
	constructor(props, context) {
        super(props, context);

        this.state = {
			'name': null,
			'value': null,
			'formName': null,
			'errors': [],
			'valid': true,
			'initial': true,
			'touched': false,
			'pristine': true,
			'focused': false,
			'blurred': false
        };

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.updateErrorMessages = this.updateErrorMessages.bind(this);
    }

	componentDidMount() {
		this.validateInit(this.props);
	}

	// Accounts for initial data returned from a service after componentDidMount and
	// re-validates when conditionally required inputs change
	componentWillReceiveProps(nextProps) {
		if (this.props.required !== nextProps.required || this.state.initial && this.state.pristine && nextProps.value) {
			setTimeout(() => {
				this.validateInit(nextProps, true);
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.value !== this.props.value || nextState.value !== this.state.value) {
			return true;
		}
		for (let prop in nextState) {
			if (nextState[prop] !== this.state[prop]) {
				return true;
			}
		}
		return false;
	}

	// This will update validation in the case that an input is conditionally visible
	componentWillUnmount() {
		if (!this.props.preserveState) {
			let input = {
				'name': this.props.name,
				'formName': this.state.formName
			}
			setTimeout(() => {
				this.props.removeInput(input);
			});
		}
	}

	// propsHaveLoaded is a check for the parent component state change after a service call is complete
	// these checks account for the async delay and prevent race conditions
	validateInit(props, propsHaveLoaded = false) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = findFormName(elem);
		let existingInput = propsHaveLoaded ? false : getInput(props.forms, formName, props.name);
		if (existingInput) {
			this.setState(existingInput);
			return;
		}
		let value = props.value;
		let empty = props.required ? (value ? false : true) : false;
		let input = {
			'name': props.name,
			'value': value,
			'formName': formName
		};
		if (props.min || props.max || props.min === 0) {
			if (props.min || props.min === 0) {
				this.updateErrorMessages(input, (parseFloat(value) >= parseFloat(props.min)), 'minValue', `Min value is ${props.min}`);
			}
			if (props.max) {
				this.updateErrorMessages(input, (parseFloat(value) <= parseFloat(props.max)), 'maxValue', `Max value is ${props.max}`);
			}
		}
		if (props.inputMatch) {
			this.updateErrorMessages(input, (value === props.inputMatch), 'inputMatch', 'Fields do not match');
		}
		if (props.validate) {
			this.updateErrorMessages(input, (defaultValidations[props.validate].regex.test(value)), props.validate);
		}
		this.updateErrorMessages(input, !empty, 'requiredField', 'Required field');
		if (propsHaveLoaded) {
			input.initial = false;
		}
		input = Object.assign({}, this.state, input);
		this.setState(input);
		setTimeout(() => {
			this.props.addInput(input);
		});
	}

	validateInput(e) {
		e.preventDefault();
		let value = e.target.value;
		let empty = this.props.required ? (value ? false : true) : false;
		let input = {
			'name': e.target.name,
			'value': value,
			'initial': false,
			'pristine': false
		}
		if (this.props.min || this.props.max || this.props.min === 0) {
			if (this.props.min || this.props.min === 0) {
				this.updateErrorMessages(input, (parseFloat(value) >= parseFloat(this.props.min)), 'minValue', `Min value is ${this.props.min}`);
			}
			if (this.props.max) {
				this.updateErrorMessages(input, (parseFloat(value) <= parseFloat(this.props.max)), 'maxValue', `Max value is ${this.props.max}`);
			}
		}
		if (this.props.inputMatch) {
			this.updateErrorMessages(input, (value === this.props.inputMatch), 'inputMatch', 'Fields do not match');
		}
		if (this.props.validate) {
			this.updateErrorMessages(input, (defaultValidations[this.props.validate].regex.test(value)), this.props.validate);
		}
		this.updateErrorMessages(input, !empty, 'requiredField', 'Required field');
		input = Object.assign({}, this.state, input);
		this.setState(input);
		this.props.addInput(input);
		this.props.handleInputChange(e);
	}

	updateErrorMessages(input, condition, key, text) {
		let newErrorMessages;
		if (!condition) {
			let errorText = text || defaultValidations[this.props.validate].message;
			newErrorMessages = addErrorMessage(this.state.errors, key, errorText);
		} else {
			newErrorMessages = removeErrorMessage(this.state.errors, key);
		}
		input.errors = newErrorMessages;
		input.valid = newErrorMessages.length === 0;
		input = Object.assign({}, this.state, input);
		this.setState(input);
		setTimeout(() => {
			this.props.addInput(input);
		});
	}

	handleMouseDown() {
		let input = Object.assign({}, this.state, {'touched': true});
		this.setState(input);
		this.props.addInput(input);
	}

	handleFocus() {
		let input = Object.assign({}, this.state, {'focused': true, 'blurred': false});
		this.setState(input);
		this.props.addInput(input);
	}

	handleBlur() {
		let input = Object.assign({}, this.state, {'focused': false, 'blurred': true});
		this.setState(input);
		this.props.addInput(input);
	}

	render() {
		let validationClasses = classNames({
			'valid': this.state.valid,
			'invalid': !this.state.valid,
			'touched': this.state.touched,
			'untouched': !this.state.touched,
			'pristine': this.state.pristine,
			'focused': this.state.focused,
			'blurred': this.state.blurred,
			'dirty': !this.state.pristine
		});

		return (
			<div className="validate-error-element">
				<input className={validationClasses} type={this.props.type} name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} min={this.props.min} max={this.props.max} minLength={this.props.minlength} maxLength={this.props.maxlength} onChange={this.validateInput} onMouseDown={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} autoComplete={this.props.autoComplete} disabled={this.props.disabled}/>
				<div className="validate-errors">
					{
						this.state.errors.map((error, i) =>
							<div key={i} className="validate-error">{error.message}</div>
						)
					}
				</div>
			</div>
		)
	}
}

Input.propTypes = {
	'autoComplete': PropTypes.string,
	'type': PropTypes.string.isRequired,
	'name': PropTypes.string.isRequired,
	'placeholder': PropTypes.string,
	'min': PropTypes.number,
	'minlength': PropTypes.number,
	'maxlength': PropTypes.number,
	'max': PropTypes.number,
	'validate': PropTypes.string,
	'handleInputChange': PropTypes.func.isRequired,
	'preserveState': PropTypes.bool,
	'required': PropTypes.bool,
	'disabled': PropTypes.bool,
	'inputMatch': PropTypes.string
}

Input.defaultProps = {
	'autoComplete': 'on',
	'preserveState': false
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Input));
