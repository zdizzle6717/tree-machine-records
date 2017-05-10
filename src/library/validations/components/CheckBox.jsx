'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import defaultValidations from '../constants/defaultValidations'
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

class CheckBox extends React.Component {
	constructor() {
        super();

		this.state = {
			'name': null,
			'value': false,
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
			'value': props.value || false,
			'formName': formName,
			'valid': validity,
			'touched': false,
			'pristine': true,
			'focused': false,
			'blurred': false
		};
		this.setState(input);
		if (propsHaveLoaded) {
			input.intial = false;
			this.setState({
				'initial': false
			});
		}
		input = Object.assign({}, this.state, input);
		setTimeout(() => {
			this.props.addInput(input);
		});
	}

	validateInputChange(e) {
		// We are validating for the new value, so some booleans may seem to be reversed (They are not)
		let validity = this.props.required ? (!this.state.value ? true : false) : true;
		let input = {
			'name': this.props.name,
			'value': !this.state.value,
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
			'check-box': true,
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
				<input className="" name={this.props.name} id={this.props.name} type="checkbox" checked={this.state.value} onClick={this.handleMouseDown} onChange={this.validateInputChange} onFocus={this.handleFocus} onBlur={this.handleBlur} disabled={this.props.disabled}/>
				<label className={this.props.required ? 'required' : ''} htmlFor={this.props.name}>{this.props.label}</label>
			</div>
		)
	}
}

CheckBox.propTypes = {
	'name': PropTypes.string.isRequired,
	'value': PropTypes.bool,
	'label': PropTypes.string.isRequired,
	'handleInputChange': PropTypes.func.isRequired,
	'preserveState': PropTypes.bool,
	'required': PropTypes.bool,
	'disabled': PropTypes.bool
}

CheckBox.defaultProps = {
	'preserveState': false
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckBox));
