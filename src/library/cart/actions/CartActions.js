'use strict';

import CartItemConstants from '../constants/CartItemConstants';

export default {
	add: (product, qty) => {
		let data = {
			'product': product,
			'cartQty': parseInt(qty, 10)
		};
		return (dispatch) => {
			dispatch({
				'type': CartItemConstants.ADD_CART_ITEM,
				'data': data
			});
		};
	},
	clearCart: () => {
		return (dispatch) => {
			dispatch({
				'type': CartItemConstants.CLEAR_CART,
				'data': true
			});
		};
	},
	toggle: (showHide) => {
		return (dispatch) => {
			dispatch({
				'type': CartItemConstants.TOGGLE,
				'data': showHide
			});
		};
	},
	update: (product, newCartQty) => {
		let data = {
			'product': product,
			'cartQty': parseInt(newCartQty, 10)
		};
		return (dispatch) => {
			dispatch({
				'type': CartItemConstants.UPDATE_CART_ITEM,
				'data': data
			});
		};
	},
	remove: (itemId) => {
		return (dispatch) => {
			dispatch({
				'type': CartItemConstants.REMOVE_CART_ITEM,
				'id': itemId
			});
		};
	}
};
