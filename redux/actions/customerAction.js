import axios from 'axios';
import { GET_CUSTOMER, PUT_CUSTOMER } from '../types';
import { loading } from './loadingActions';

export const getCustomer = () => (dispatch) => {
	axios
		.get('/api/customers')
		.then((res) => {
			dispatch({
				type: GET_CUSTOMER,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.data
			});
		});
};

export const putCustomer = (fields, navigation) => (dispatch) => {
	dispatch(loading(true));
	axios
		.put('/api/customers', fields)
		.then((res) => {
			dispatch(loading(false));
			dispatch({
				type: PUT_CUSTOMER,
				payload: fields
			});
			navigation.goBack();
		})
		.catch((err) => {
			dispatch(loading(false));
			dispatch({
				type: 'GET_ERROR',
				payload: err.data
			});
		});
};
