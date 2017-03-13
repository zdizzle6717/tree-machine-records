'use strict';

import MerchItemConstants from '../constants/MerchItemConstants';

const merchItem = (state = {}, action) => {
	switch (action.type) {
		case MerchItemConstants.GET_MERCH_ITEM:
			return Object.assign({}, state, action.data);
		case MerchItemConstants.CREATE_MERCH_ITEM:
			return Object.assign({}, state, action.data);
		case MerchItemConstants.UPDATE_MERCH_ITEM:
			return Object.assign({}, state, action.data);
		default:
			return state;
	}
};

const merchItems = (state = [], action) => {
	switch (action.type) {
		case MerchItemConstants.GET_MERCH_ITEMS:
			return [...action.data];
		case MerchItemConstants.CREATE_MERCH_ITEM:
			return [
				...state,
				merchItem(undefined, action)
			];
		case MerchItemConstants.REMOVE_MERCH_ITEM:
			let merchItemArray = [...state];
			let index = state.findIndex((merchItem) => merchItem.id === action.data);
			if (index !== -1) {
				merchItemArray.splice(index, 1);
			}
			return merchItemArray;
		case MerchItemConstants.FILTER_MERCH_ITEMS:
			return [...action.data];
		default:
			return state;
	}
};

export {
	merchItem,
	merchItems
};
