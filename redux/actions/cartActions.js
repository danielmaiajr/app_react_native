import { ADD_ITEMS_CART, SUB_ITEMS_CART, DELETE_CART_ITEM, CHANGE_SHOW_CART, GET_CART_ITEMS } from '../types';
import axios from 'axios';

import { loading } from './loadingActions';
export const getCartItems = () => (dispatch) => {
	dispatch(loading(true));
	axios
		.get('/api/cart-items')
		.then((res) => {
			dispatch(loading(false));
			dispatch({
				type: GET_CART_ITEMS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch(loading(false));
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};

export const addItemsCart = (item) => (dispatch) => {
	axios
		.put('/api/cart-items/add', { id: item.id })
		.then((res) => {
			const product = {
				...item,
				quantity: res.data.quantity
			};
			dispatch({
				type: ADD_ITEMS_CART,
				payload: product
			});
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERROR',
				payload: err.data
			});
		});
};

export const subItemsCart = (item) => (dispatch) => {
	axios
		.put('/api/cart-items/sub', { id: item.id })
		.then((res) => {
			const product = {
				...item,
				quantity: res.data.quantity
			};
			dispatch({
				type: SUB_ITEMS_CART,
				payload: product
			});
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERROR',
				payload: err.data
			});
		});
};

export const deleteItemsCart = (callback = () => {}) => (dispatch) => {
	axios
		.delete('/api/cart-items')
		.then((res) => {
			dispatch({
				type: DELETE_CART_ITEM,
				payload: []
			});
			callback();
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
			callback();
		});
};

export const changeShowCart = () => (dispatch) => {
	dispatch({
		type: CHANGE_SHOW_CART,
		payload: null
	});
};
