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
import {findFormName, getInput} from '../utilities';

const mapStateToProps = (state) => {
	return {
		'forms': state.forms
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addInput': FormActions.addInput,
		'removeInput': FormActions.removeInput
	}, dispatch);
}

class RadioGroup extends React.Component {
	constructor() {
        super();

		this.state = {
			'name': null,
			'value': null,
			'formName': null,
			'valid': true,
			'initial': true,
			'touched': false,
			'pristine': true,
			'focused': false,
			'blurred': false
		}

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInputChange = this.validateInputChange.bind(this);
    }

	componentDidMount() {
		this.validateInit(this.props);
	}

	// Accounts for initial data check and conditionally required inputs
	componentWillReceiveProps(nextProps) {
		if (this.state.initial && this.state.pristine && nextProps.value || this.props.required !== nextProps.required) {
			this.validateInit(nextProps, true);
		}
	}

	// TODO: Test if this will work as expected
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

	validateInit(props, propsHaveLoaded = false) {
		let elem = ReactDOM.findDOMNode(this);
		let formName = findFormName(elem);
		let existingInput = propsHaveLoaded ? false : getInput(props.forms, formName, props.name);
		if (existingInput) {
			this.setState(existingInput);
			return;
		}
		let validity = props.required ? (props.value ? true : false) : true;
		let input = {
			'name': props.name,
			'value': props.value || props.options[0],
			'formName': formName,
			'valid': validity
		};
		if (propsHaveLoaded) {
			input.initial = false;
		}
		input = Object.assign({}, this.state, input);
		this.setState(input);
		setTimeout(() => {
			this.props.addInput(input);
		});
		let pseudoEvent = {
			'target': {
				'value': input.value,
				'name': input.name
			},
			'currentTarget': {
				'value': input.value,
				'name': input.name
			}
		};
		this.props.handleInputChange(pseudoEvent);
	}

	validateInputChange(option, e) {
		let validity = this.props.required ? (e.target.value ? true : false) : true;
		let input = {
			'name': e.target.name,
			'value': option,
			'valid': validity,
			'initial': false,
			'pristine': false
		}
		input = Object.assign({}, this.state, input);
		this.setState(input);
		this.props.addInput(input);
		this.props.handleInputChange(e);
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
			'validate-error-element': true,
			'radio-group': true,
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
			<div className={validationClasses}>
				<label>{this.props.label}</label>
				{this.props.options.map((option) => <div key={option} className="radio-group">
					<input name={this.props.name} id={option} value={option} type="radio" checked={this.state.value === option} onChange={this.validateInputChange.bind(this, option)}/> <label htmlFor={option} onMouseDown={this.handleMouseDown}>{option}</label>
				</div>)}
			</div>
		)
	}
}

RadioGroup.propTypes = {
	'name': PropTypes.string.isRequired,
	'value': PropTypes.string,
	'label': PropTypes.string.isRequired,
	'options': PropTypes.array.isRequired,
	'handleInputChange': PropTypes.func.isRequired,
	'preserveState': PropTypes.bool,
	'required': PropTypes.bool,
	'disabled': PropTypes.bool
}


RadioGroup.defaultProps = {
	'preserveState': false
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RadioGroup));
