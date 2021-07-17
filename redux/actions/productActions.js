import { GET_PRODUCT_HOME, GET_PRODUCT_SECTION } from '../types';
import axios from 'axios';

import { loading } from './loadingActions';

export const getProductHome = (path = '', page = '') => (dispatch) => {
	let query;
	if (page === '') {
		query = '';
	} else {
		query = `?&page=${page}`;
	}

	dispatch(loading(true));
	const test = `/api/products${path}${query}`;

	axios
		.get(test)
		.then((res) => {
			dispatch(loading(false));
			dispatch({
				type: GET_PRODUCT_HOME,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch(loading(false));
			console.log(err);
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
		});
};

export const getProductSection = (path = '', page = '') => (dispatch) => {
	let query;
	if (page === '') {
		query = '';
	} else {
		query = `?&page=${page}`;
	}

	dispatch(loading(true));

	axios
		.get(`/api/products${path}${query}`)
		.then((res) => {
			dispatch(loading(false));
			dispatch({
				type: GET_PRODUCT_SECTION,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch(loading(false));
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
		});
};
