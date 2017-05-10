'use strict';

import CartItemConstants from '../constants/CartItemConstants';

const updateSessionCart = (newCartItems) => {
	sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
};

const updateSessionPlaceholders = (placeholders) => {
	sessionStorage.setItem('cartQuantities', JSON.stringify(placeholders));
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
			index = state.findIndex((item) => item.product.id === action.data.product.id);
			if (index < 0) {
				cartItems.push(newItem);
			} else {
				cartItems[index].product = action.data.product;
				cartItems[index].cartQty += action.data.cartQty;
			}
			updateSessionCart(cartItems);
			return cartItems;
		case CartItemConstants.CLEAR_CART:
			return [];
		case CartItemConstants.UPDATE_CART_ITEM:
			cartItems = [...state];
			newItem = action.data;
			index = cartItems.findIndex((item) => item.product.id === action.data.product.id);
			if (index < 0) {
				cartItems.push(newItem);
			} else {
				cartItems[index].product = action.data.product;
				cartItems[index].cartQty = action.data.cartQty;
			}
			if (cartItems[index].cartQty < 1) {
				cartItems.splice(index, 1);
			}
			updateSessionCart(cartItems);
			return cartItems;
		case CartItemConstants.REMOVE_CART_ITEM:
			cartItems = [...state];
			index = state.findIndex((cartItem) => cartItem.product.id === action.id);
			if (index !== -1) {
				cartItems.splice(index, 1);
			}
			updateSessionCart(cartItems);
			return cartItems;
		default:
			return state;
	}
};

const cartQtyPlaceholders = (state = {}, action) => {
	let placeholders, productId;
	switch (action.type) {
		case CartItemConstants.ADD_CART_ITEM:
			placeholders = Object.assign({}, state);
			productId = action.data.product.id;
			placeholders[productId] = placeholders[productId] ? placeholders[productId] + action.data.cartQty: action.data.cartQty;
			updateSessionPlaceholders(placeholders);
			return placeholders;
		case CartItemConstants.CLEAR_CART:
			return {};
		case CartItemConstants.UPDATE_CART_ITEM:
			placeholders = Object.assign({}, state);
			productId = action.data.product.id;
			placeholders[productId] = action.data.cartQty;
			updateSessionPlaceholders(placeholders);
			return placeholders;
		case CartItemConstants.REMOVE_CART_ITEM:
			placeholders = Object.assign({}, state);
			productId = action.id;
			placeholders[productId] = 0;
			updateSessionPlaceholders(placeholders);
			return placeholders;
		default:
			return state;
	}
};

export {
	cartItems,
	cartQtyPlaceholders,
	cartIsActive
};
