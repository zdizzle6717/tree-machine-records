'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class Tab extends React.Component {
	constructor() {
		super();

		this.state = {}
	}

	componentDidMount() {
		// let elem = ReactDOM.findDOMNode(this);
		// let childForm = elem.getElementsByTagName('form');
		// console.log(childForm[0]);
	}

	render() {
		return (
			<div className="tab-content" name="this.props.tabName">
				{this.props.children}
			</div>
		)
	}
}

Tab.propTypes = {
	'title': PropTypes.string.isRequired,
	'name': PropTypes.string.isRequired,
	'errorCount': PropTypes.number
}
