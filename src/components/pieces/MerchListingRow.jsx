'use strict';

import React from 'react';
import { Link } from 'react-router';
import roleConfig from '../../../roleConfig';
import createAccessControl from '../../library/authentication/components/AccessControl';
const AccessControl = createAccessControl(roleConfig);

export default class MerchListingRow extends React.Component {
	constructor() {
		super();

		this.addToCart = this.addToCart.bind(this);
	}

	addToCart() {
		console.log(this.props.id + ' added to cart');
	}

	render() {
		return (
			<tr>
				<td>{this.props.sku}</td>
				<td>{this.props.catalogueNumber}</td>
				<td>{this.props.title}</td>
				<td>{this.props.artist}</td>
				<td>{this.props.format}</td>
				<td>{this.props.price}</td>
				<td><a onClick={this.addToCart}>Add to Cart</a></td>
				<td className="text-center">
					<div className="action-buttons">
						<AccessControl access={['siteAdmin']}>
							<Link key="merchEdit" to={`/profile/merch/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						</AccessControl>
					</div>
				</td>
			</tr>
		)
	}
}

MerchListingRow.propTypes = {
	'artist': React.PropTypes.string,
	'catalogueNumber': React.PropTypes.string,
	'format': React.PropTypes.string.isRequired,
	'id': React.PropTypes.number.isRequired,
	'removeMerch': React.PropTypes.func.isRequired,
	'sku': React.PropTypes.string.isRequired,
	'title': React.PropTypes.string.isRequired
}
