'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import roleConfig from '../../../roleConfig';
import createAccessControl from '../../library/authentication/components/AccessControl';
const AccessControl = createAccessControl(roleConfig);

export default class MerchListingRow extends React.Component {
	constructor() {
		super();

		this.addToCart = this.addToCart.bind(this);
	}

	addToCart(e) {
		let qty = e.target.value;
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
				<td>{this.props.stockQty}</td>
				<td>
					{
						this.props.isInStock ?
						<div className="cart-num-items">
							<select onChange={this.addToCart}>
								<option value={0}>0</option>
								{
									this.props.priceOptions.filter(option => option.numItems < this.props.stockQty).map((option, i) =>
										<option key={i} value={option.numItems}>{option.numItems} - ({option.basePrice} / piece)</option>
									)
								}
							</select>
						</div> :
						<span className="color-alert">Out of stock</span>
					}
				</td>
				<AccessControl access={['siteAdmin']}>
					<td className="text-center">
						<div className="action-buttons">
							<Link key="merchEdit" to={`/admin/merch/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						</div>
					</td>
				</AccessControl>
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
	'title': PropTypes.string.isRequired,
	'priceOptions': React.PropTypes.arrayOf(React.PropTypes.shape({
		'id': React.PropTypes.number,
		'basePrice': React.PropTypes.number.isRequired,
		'numItems': React.PropTypes.number.isRequired,
   })).isRequired
}
