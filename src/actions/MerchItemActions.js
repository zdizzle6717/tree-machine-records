'use strict';

import MerchItemConstants from '../constants/MerchItemConstants';
import MerchItemService from '../services/MerchItemService';

const _initiateRequest = (type, data) => {
	return {
		'type': type,
		'data': data
	};
};
const _returnResponse = (type, data) => {
	return {
		'type': type,
		'data': data,
		'receivedAt': Date.now()
	};
};

export default {
	get: (id) => {
		return (dispatch) => {
			dispatch(_initiateRequest(MerchItemConstants.INITIATE_MERCH_ITEM_REQUEST, id));
			return MerchItemService.get(id).then((merchItem) => {
				dispatch(_returnResponse(MerchItemConstants.GET_MERCH_ITEM, merchItem));
				return merchItem;
			});
		}
	},
	getAll: () => {
		return (dispatch, getState) => {
			dispatch(_initiateRequest(MerchItemConstants.INITIATE_MERCH_ITEM_REQUEST));
			return MerchItemService.getAll().then((merchItems) => {
				dispatch(_returnResponse(MerchItemConstants.GET_MERCH_ITEMS, merchItems));
			});
		};
	},
	search: (criteria) => {
		return (dispatch) => {
			dispatch(_initiateRequest(MerchItemConstants.INITIATE_MERCH_ITEM_REQUEST));
			return MerchItemService.search(criteria).then((response) => {
				dispatch(_returnResponse(MerchItemConstants.GET_MERCH_ITEMS, response.results));
				return response.pagination;
			});
		}
	},
	create: (data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(MerchItemConstants.INITIATE_MERCH_ITEM_REQUEST));
			return MerchItemService.create(data).then((merchItem) => {
				dispatch(_returnResponse(MerchItemConstants.CREATE_MERCH_ITEM, merchItem));
				return merchItem;
			});
		};
	},
	update: (id, data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(MerchItemConstants.INITIATE_MERCH_ITEM_REQUEST));
			return MerchItemService.update(id, data).then((merchItem) => {
				dispatch(_returnResponse(MerchItemConstants.UPDATE_MERCH_ITEM, merchItem));
				return merchItem;
			});
		};
	},
	remove: (id) => {
		return (dispatch) => {
			dispatch(_initiateRequest(MerchItemConstants.INITIATE_MERCH_ITEM_REQUEST, id));
			return MerchItemService.remove(id).then((response) => {
				dispatch(_returnResponse(MerchItemConstants.REMOVE_MERCH_ITEM, id));
			});
		};
	},
	filter: (data) => {
		return (dispatch) => {
			dispatch({
				'type': MerchItemConstants.FILTER_MERCH_ITEMS,
				'data': data
			})
		}
	}
};
