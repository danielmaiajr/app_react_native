import { GET_SEARCHNAV_RESULTS, GET_SEARCHPAGE_RESULTS, SET_LOADING } from '../types';
import axios from 'axios';

export const getSearchNavResults = (search) => (dispatch) => {
	if (search.length < 4) {
		dispatch({
			type: GET_SEARCHNAV_RESULTS,
			payload: []
		});
	} else {
		axios
			.get(`/api/products/search?value=${search}`)
			.then((res) => {
				dispatch({
					type: GET_SEARCHNAV_RESULTS,
					payload: res.data
				});
			})
			.catch((err) => {
				dispatch({
					type: 'GET_ERRORS',
					payload: err.data
				});
			});
	}
};

export const getSearchPageResults = (search, page) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true
	});
	axios
		.get(`/api/products/search?value=${search}&page=${page}`)
		.then((res) => {
			dispatch({
				type: GET_SEARCHPAGE_RESULTS,
				payload: res.data
			});
			dispatch({
				type: SET_LOADING,
				payload: false
			});
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
		});
};
