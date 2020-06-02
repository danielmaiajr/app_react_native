import { ADD_ITEMS_CART, SUB_ITEMS_CART, DELETE_CART_ITEM, CHANGE_SHOW_CART, GET_CART_ITEMS } from '../types';
import axios from 'axios';

export const getCartItems = () => (dispatch) => {
	axios
		.get('http://teststoreapp-com.umbler.net/api/cart-items')
		.then((res) => {
			dispatch({
				type: GET_CART_ITEMS,
				payload: res.data
			});
		})
		.catch((err) => [
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			})
		]);
};

export const addItemsCart = (item) => (dispatch) => {
	axios
		.put('http://teststoreapp-com.umbler.net/api/cart-items/add', { product_id: item.product_id })
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
		.put('http://teststoreapp-com.umbler.net/api/cart-items/sub', { product_id: item.product_id })
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

export const deleteItemsCart = () => (dispatch) => {
	axios
		.delete('http://teststoreapp-com.umbler.net/api/cart-items')
		.then((res) => {
			dispatch({
				type: DELETE_CART_ITEM,
				payload: []
			});
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
		});
};

export const changeShowCart = () => (dispatch) => {
	dispatch({
		type: CHANGE_SHOW_CART,
		payload: null
	});
};
