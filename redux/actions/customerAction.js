import axios from 'axios';
import { GET_CUSTOMER, PUT_CUSTOMER } from '../types';

export const getCustomer = () => (dispatch) => {
	axios
		.get('/api/customers')
		.then((res) => {
			dispatch({
				type: GET_CUSTOMER,
				payload: res.data[0]
			});
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};

export const putCustomer = (fields) => (dispatch) => {
	axios
		.put('/api/customers', fields)
		.then((res) => {
			dispatch({
				type: PUT_CUSTOMER,
				payload: fields
			});
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERROR',
				payload: err.data
			});
		});
};
