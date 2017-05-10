'use strict';

import CartItemConstants from '../constants/CartItemConstants';

const calculateTotal = (cartItems) => {
	let subTotal = 0;
	cartItems.forEach((item) => {
		subTotal += parseInt(item.cartQty, 10) * parseInt(item.merchItem.price, 10);
	});
	subTotal = subTotal.toFixed(2);
	return subTotal;
};

const updateSessionCart = (newCartItems) => {
	sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
};

const cartIsActive = (state = 'hide', action) => {
	switch (action.type) {
		case CartItemConstants.TOGGLE:
			return action.data;
		default:
			return state;
	}
};

const cartItems = (state = [], action) => {
	let cartItems, newItem, index;
	switch (action.type) {
		case CartItemConstants.ADD_CART_ITEM:
			cartItems = [...state];
			newItem = action.data;
			index = state.findIndex((item) => item.merchItem.id === action.data.merchItem.id);
			if (index < 0) {
				cartItems.push(action.data);
			} else {
				let newQty = cartItems[index].cartQty + newItem.cartQty;
				cartItems[index] = newItem;
				cartItems[index].cartQty = newQty;
			}
			updateSessionCart(cartItems);
			return cartItems;
		case CartItemConstants.REMOVE_CART_ITEM:
			cartItems = [...state];
			index = state.findIndex((cartItem) => cartItem.merchItem.id === action.data.id);
			if (index !== -1) {
				cartItems[index].cartQty -= action.data.cartQty;
				if (cartItems[index].cartQty < 1) {
					cartItems.splice(index, 1);
				}
			}
			updateSessionCart(cartItems);
			return cartItems;
		default:
			return state;
	}
};

const cartTotal = (state = 0.00, action) => {
	switch (action.type) {
		case CartItemConstants.UPDATE_CART_TOTAL:
			let newSubTotal = calculateTotal(action.data);
			return newSubTotal;
		default:
			return state;
	}
};

export {
	cartIsActive,
	cartItems,
	cartTotal
};
