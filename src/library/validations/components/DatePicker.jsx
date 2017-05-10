'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import defaultValidations from '../constants/defaultValidations';
import classNames from 'classnames';
import FormActions from '../actions/FormActions';
import {findFormName, getInput, range} from '../utilities';

// TODO: Add error checking and make sure validation is working

let _monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let _thirtyDayMonths = ['April', 'June', 'September', 'November'];
let _thirtyOneDayMonths = ['January', 'March', 'May', 'July', 'August', 'October', 'December'];
let _dayOptions = range(1, 31);
let _yearOptions = range(1900, 2017).reverse();

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

class DatePicker extends React.Component {
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
			'blurred': false,
			'month': '',
			'day': '',
			'year': ''
        };

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validateInit = this.validateInit.bind(this);
		this.validateInput = this.validateInput.bind(this);
    }

	componentWillMount() {
		let now = Date.now();
		let currentYear = moment(now).format('YYYY');
		_yearOptions = this.props.minYear ? range(this.props.minYear, currentYear).reverse() : _yearOptions;
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
		let input;
		if (props.value) {
			let dateValue = new Date(props.value);
			let dateISO = dateValue.toISOString();
			let dateFormatted = moment(dateValue).format('MMMM-DD-YYYY');
			let dateAsArray = dateFormatted.split('-');
			input = {
				'name': props.name,
				'value': dateISO,
				'formName': formName,
				'valid': validity,
				'month': dateAsArray[0],
				'day': dateAsArray[1][0] === '0' ? dateAsArray[1].substring(1) : dateAsArray[1],
				'year': dateAsArray[2]
			};
		} else {
			input = {
				'name': props.name,
				'value': props.value,
				'formName': formName,
				'valid': validity,
			};
		}
		this.setState(input);
		if (propsHaveLoaded) {
			input.initial = false;
			this.setState({
				initial: false
			})
		}
		input = Object.assign({}, this.state, input);
		setTimeout(() => {
			this.props.addInput(input);
		});
	}

	validateInput(e) {
		e.preventDefault();
		let input, validity;
		let month = e.target.name === `${this.props.name}Month` ? e.target.value : this.state.month;
		let day = e.target.name === `${this.props.name}Day` ? e.target.value : this.state.day;
		let year = e.target.name === `${this.props.name}Year` ? e.target.value : this.state.year;
		let leapYear = (e.target.name === `${this.props.name}Year`) ? (e.target.value % 4 === 0 ? true : false) : (this.state.year % 4 === 0 ? true : false);
		if (e.target.name === `${this.props.name}Month` && e.target.value === 'February' || e.target.name !== `${this.props.name}Month` && this.state.month === 'February') {
			_dayOptions = leapYear ? range(1, 29) : range(1, 28);
			day = (leapYear && day > 29) ? '29' : (!leapYear && day > 28 ? '28' : day);
		} else {
			let valueToCheck;
			let hasThirtyDays = false;
			if (e.target.name === `${this.props.name}Month`) {
				valueToCheck = e.target.value;
			} else {
				valueToCheck = this.state.month;
			}
			for (let i = 0; i < _thirtyDayMonths.length; i++) {
				if (valueToCheck === _thirtyDayMonths[i]) {
					hasThirtyDays = true;
					_dayOptions = range(1, 30);
					day = day === '31' ? '30' : day;
					break;
				}
			}
			if (!hasThirtyDays) {
				_dayOptions = range(1, 31);
			}
		}

		if (this.state.value || (e.target.name === `${this.props.name}Day`)) {
			let dateISO;
			let newDateValue = new Date(month + ' ' + day + ', ' + year);
			try {
				dateISO = newDateValue.toISOString();
			} catch(error) {
				dateISO = undefined;
			}
			validity = true;
			input = {
				'name': this.props.name,
				'value': dateISO,
				'valid': validity,
				'initial': false,
				'pristine': false,
				'day': day,
				'month': month,
				'year': year
			};
		} else {
			validity = this.props.required ? false : true;
			input = {
				'name': this.props.name,
				'value': null,
				'valid': validity,
				'initial': false,
				'pristine': false,
				'day': day,
				'month': month,
				'year': year
			};
		}
		input = Object.assign({}, this.state, input);
		this.setState(input);
		this.props.addInput(input);
		let phantomEvent = {
			'target': {
				'name': this.props.name,
				'value': input.value
			}
		}
		this.props.handleInputChange(phantomEvent);
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
			<div className="validate-error-element date-picker">
				<select className={validationClasses} type={this.props.type} name={`${this.props.name}Month`} value={this.state.month} onChange={this.validateInput} onMouseDown={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} disabled={this.props.disabled || !this.state.year}>
					<option value="">---Select---</option>
					{
						_monthOptions.map((month, i) =>
							<option value={month} key={i}>{month}</option>
						)
					}
				</select>
				<select className={validationClasses} type={this.props.type} name={`${this.props.name}Day`} value={this.state.day} onChange={this.validateInput} onMouseDown={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} disabled={this.props.disabled || !this.state.year || !this.state.month}>
					<option value="">--Select--</option>
					{
						_dayOptions.map((day, i) =>
							<option value={day} key={i}>{day}</option>
						)
					}
				</select>
				<select className={validationClasses} type={this.props.type} name={`${this.props.name}Year`} value={this.state.year} onChange={this.validateInput} onMouseDown={this.handleMouseDown} onFocus={this.handleFocus} onBlur={this.handleBlur} disabled={this.props.disabled}>
					<option value="">--Select--</option>
					{
						_yearOptions.map((year, i) =>
							<option value={year} key={i}>{year}</option>
						)
					}
				</select>
			</div>
		)
	}
}

DatePicker.propTypes = {
	'name': PropTypes.string.isRequired,
	'value': PropTypes.string,
	'handleInputChange': PropTypes.func.isRequired,
	'preserveState': PropTypes.bool,
	'required': PropTypes.bool,
	'disabled': PropTypes.bool,
	'minYear': PropTypes.number,
	'minDate': PropTypes.string,
	'maxDate': PropTypes.string
}

DatePicker.defaultProps = {
	'preserveState': false,
	'dateAsIso': true
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatePicker));
