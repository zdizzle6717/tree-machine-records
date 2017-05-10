'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import PropTypes from 'prop-types';
import CartActions from '../../actions/CartActions';

const mapStateToProps = (state) => {
	return {
		'cartTotal': state.cartTotal,
		'cartItems': state.cartItems,
		'cartIsActive': state.cartIsActive
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'updateOrderTotal': CartActions.updateTotal,
		'addToCart': CartActions.add,
		'removeFromCart': CartActions.remove,
		'toggleCart': CartActions.toggle
	}, dispatch);
}

class CartSummary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'showCart': false
		}
	}

	componentDidMount() {
		if (this.props.cartItems.length < 1) {
			let storedItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
			storedItems.forEach((item) => {
				this.props.addToCart(item.merchItem, item.cartQty);
			});
			// TODO: Check if this needs a set timeout
			setTimeout(() => {
				this.props.updateOrderTotal(this.props.cartItems);
			});
		}
	}

	getPrice(item) {
		let priceOption = item.merchItem.PriceOptions.find((option) => {
			option.numItems === item.cartQty;
		});
		return priceOption.basePrice;
	}

	removeItem(item, qty) {
		this.props.removeFromCart(item.merchItem.id, qty);
		// TODO: Check if this needs a set timeout
		setTimeout(() => {
			this.props.updateOrderTotal(this.props.cartItems);
		});
	}

	toggleCart(showHide) {
		this.props.toggleCart(showHide);
	}

	render() {
		let backdropClasses = classNames({
			'cart-backdrop': true,
			'show': this.props.cartIsActive
		});

		return (
			<li className="mini-cart">
				<a className="menu-link cart-button" onClick={this.toggleCart}><span className="fa fa-shopping-cart"></span></a>
				<div className={this.props.cartIsActive ? 'cart-summary show' : 'cart-summary'} >
					<div className="header">
						<h2>Cart Summary</h2>
						<span className="fa fa-times-circle-o pointer" onClick={this.toggleCart.bind(this, 'hide')}></span>
					</div>
					<div className="body">
						{
							this.props.cartItems.length > 0 ?
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Price</th>
										<th>Qty</th>
										<th>Remove?</th>
									</tr>
								</thead>
								<tbody>
									{
										this.props.cartItems.map((item, i) =>
											<tr key={i} className="item-row">
												<td>{item.merchItem.title}</td>
												<td>${this.getPrice.bind(this, item)}</td>
												<td>({item.cartQty})</td>
												<td className="pointer" onClick={this.removeItem.bind(this, item, item.cartQty)}><span className="fa fa-minus"></span></td>
											</tr>
										)
									}
								</tbody>
							</table> :
							<h3 className="text-center push-top-2x">There are currently no items in the cart</h3>
						}
					</div>
					<div className="footer">
						<h4>Order Total: ${this.props.cartTotal}</h4>
						<Link to="store/cart" className="button push-top-2x">View Cart</Link>
						<Link to="store/checkout" className="button">Go To Checkout</Link>
					</div>
				</div>
				<div className={backdropClasses} onClick={this.toggleCart.bind(this, 'hide')}></div>
			</li>
		)
	}
}

CartSummary.propTypes = {};

CartSummary.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
