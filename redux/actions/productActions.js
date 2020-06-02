import { GET_PRODUCT } from '../types';
import axios from 'axios';

export const getProduct = (path, page = '') => (dispatch) => {
	let query;
	if (page === '') {
		query = '';
	} else {
		query = `?&page=${page}`;
	}

	axios
		.get(`http://teststoreapp-com.umbler.net/api/products/${path}${query}`)
		.then((res) => {
			dispatch({
				type: GET_PRODUCT,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
		});
};
