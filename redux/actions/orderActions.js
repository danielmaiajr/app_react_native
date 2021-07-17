import { GET_ORDER, GET_ORDERS, POST_ORDER, PUT_CANCEL_ORDER, GET_ERRORS, SET_LOADING } from '../types';
import axios from 'axios';

export const getOrders = () => (dispatch) => {
	axios
		.get('/api/orders')
		.then((res) => {
			dispatch({
				type: GET_ORDERS,
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
export const getOrder = (id) => (dispatch) => {
	axios
		.get(`/api/orders/${id}`)
		.then((res) => {
			dispatch({
				type: GET_ORDER,
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
export const postOrder = (address, date, navigation, deleteItemsCart) => (dispatch) => {
	const body = {
		address,
		ship_date: date
	};

	axios
		.post('/api/orders', body)
		.then((res) => {
			dispatch({
				type: POST_ORDER,
				payload: res.data
			});
			deleteItemsCart();
			navigation.navigate('Pedidos');
		})
		.catch((err) => {
			console.log(err.response);
		});
};

export const cancelOrder = (id, navigation) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true
	});
	console.log(id);
	axios
		.put(`/api/orders/${id}`)
		.then((res) => {
			if (res.data.order === 'success') {
				dispatch({
					type: SET_LOADING,
					payload: false
				});
				navigation.navigate('Pedidos');
				dispatch({
					type: PUT_CANCEL_ORDER,
					payload: {
						order_id: id,
						status_name: 'CANCELADA'
					}
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data.order
				});
			}
		})
		.catch((err) => {
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};
