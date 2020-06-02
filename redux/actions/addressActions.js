import { GET_ADDRESS, POST_ADDRESS, DELETE_ADDRESS, PUT_ADDRESS, SET_LOADING } from '../types';
import axios from 'axios';

export const getAddress = () => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true
	});
	axios
		.get('/api/addresses')
		.then((res) => {
			dispatch({
				type: SET_LOADING,
				payload: false
			});
			dispatch({
				type: GET_ADDRESS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_LOADING,
				payload: false
			});
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};

export const postAddress = (obj) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true
	});
	axios
		.post('/api/addresses', obj)
		.then((res) => {
			dispatch({
				type: SET_LOADING,
				payload: false
			});
			dispatch({
				type: POST_ADDRESS,
				payload: {
					address_id: res.data.id_inserted,
					neightborhood: obj.neightborhood,
					street: obj.street,
					num: obj.num,
					cep: obj.cep
				}
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_LOADING,
				payload: false
			});
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};

export const putAddress = (fields) => (dispatch) => {
	const { address_id } = fields;

	const test = {
		neightborhood: fields.neightborhood,
		street: fields.street,
		num: fields.num,
		cep: fields.cep
	};

	dispatch({
		type: SET_LOADING,
		payload: true
	});

	axios
		.put(`/api/addresses/${address_id}`, test)
		.then((res) => {
			dispatch({
				type: SET_LOADING,
				payload: false
			});
			dispatch({
				type: PUT_ADDRESS,
				payload: fields
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_LOADING,
				payload: false
			});
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};

export const deleteAddress = (id) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true
	});
	axios
		.delete(`/api/addresses/${id}`)
		.then((res) => {
			dispatch({
				type: SET_LOADING,
				payload: false
			});
			dispatch({
				type: DELETE_ADDRESS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_LOADING,
				payload: false
			});
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};
