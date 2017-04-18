'use strict';

import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import roleConfig from '../../../roleConfig';
import createAccessControl from '../../library/authentication/components/AccessControl';
const AccessControl = createAccessControl(roleConfig);

export default class MerchListingRow extends React.Component {
	constructor() {
		super();

		this.addToCart = this.addToCart.bind(this);
	}

	addToCart() {
		let qty = 1;
		this.props.addToCart(this.props.id, qty);
	}

	render() {
		return (
			<tr>
				<td>{this.props.catalogueNumber}</td>
				<td>{this.props.title}</td>
				<td>{this.props.artist}</td>
				<td>{this.props.format}</td>
				<td>{this.props.price}</td>
				<td><a onClick={this.addToCart}>Add to Cart</a></td>
				<td className="text-center">
					<div className="action-buttons">
						<AccessControl access={['siteAdmin']}>
							<Link key="merchEdit" to={`/admin/merch/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						</AccessControl>
					</div>
				</td>
			</tr>
		)
	}
}

MerchListingRow.propTypes = {
	'artist': PropTypes.string,
	'addToCart': PropTypes.func,
	'catalogueNumber': PropTypes.string,
	'format': PropTypes.string.isRequired,
	'id': PropTypes.number.isRequired,
	'removeMerch': PropTypes.func.isRequired,
	'title': PropTypes.string.isRequired
}
