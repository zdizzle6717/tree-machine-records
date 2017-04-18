'use strict';

import CartItemConstants from '../constants/CartItemConstants';

export default {
	add: (cartItem, qty) => {
		let data = {
			'merchItem': cartItem,
			'cartQty': qty
		};
		return (dispatch) => {
			dispatch({
				'type': CartItemConstants.ADD_CART_ITEM,
				'data': data
			});
		};
	},
	remove: (itemId, qty) => {
		let data = {
			'id': itemId,
			'cartQty': qty
		};
		return (dispatch) => {
			dispatch({
				'type': CartItemConstants.REMOVE_CART_ITEM,
				'data': data
			});
		};
	},
	updateTotal: (currentCartItems) => {
		return (dispatch) => {
			dispatch({
				'type': CartItemConstants.UPDATE_CART_TOTAL,
				'data': currentCartItems
			});
		};
	}
};
