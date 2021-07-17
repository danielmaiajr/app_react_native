import { GET_ADDRESS, POST_ADDRESS, DELETE_ADDRESS, PUT_ADDRESS, SET_LOADING } from '../types';
import axios from 'axios';
import { loading } from './loadingActions';

export const getAddress = () => (dispatch) => {
	dispatch(loading(true));
	axios
		.get('/api/addresses')
		.then((res) => {
			dispatch(loading(false));
			dispatch({
				type: GET_ADDRESS,
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

export const postAddress = (obj, navigation) => (dispatch) => {
	dispatch(loading(true));
	axios
		.post('/api/addresses', obj)
		.then((res) => {
			dispatch(loading(false));
			dispatch({
				type: POST_ADDRESS,
				payload: res.data
			});
			navigation.goBack();
		})
		.catch((err) => {
			dispatch(loading(false));
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};

export const putAddress = (fields, navigation) => (dispatch) => {
	const { id } = fields;

	const test = {
		neightborhood: fields.neightborhood,
		street: fields.street,
		num: fields.num,
		cep: fields.cep
	};

	dispatch(loading(true));

	axios
		.put(`/api/addresses/${id}`, test)
		.then((res) => {
			dispatch(loading(false));
			dispatch({
				type: PUT_ADDRESS,
				payload: fields
			});
			navigation.goBack();
		})
		.catch((err) => {
			dispatch(loading(false));
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};

export const deleteAddress = (id, callback = () => {}) => (dispatch) => {
	dispatch(loading(true));
	axios
		.delete(`/api/addresses/${id}`)
		.then((res) => {
			dispatch(loading(false));
			dispatch({
				type: DELETE_ADDRESS,
				payload: res.data
			});
			callback();
		})
		.catch((err) => {
			dispatch(loading(false));
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};
