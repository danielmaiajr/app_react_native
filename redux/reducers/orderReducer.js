import { GET_ORDER, GET_ORDERS, POST_ORDER, PUT_CANCEL_ORDER } from '../types';

const initialState = {
	orders: [],
	orderItems: []
};

export default function(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case GET_ORDERS:
			return {
				...state,
				orders: payload
			};

		case GET_ORDER:
			return {
				...state,
				orderItems: payload
			};

		case POST_ORDER:
			return state;

		case PUT_CANCEL_ORDER:
			const new_order = state.orders.map((ord) => {
				if (ord.order_id === payload.order_id) {
					return {
						...ord,
						status_name: payload.status_name
					};
				} else {
					return ord;
				}
			});
			return {
				...state,
				orders: new_order
			};

		default:
			return state;
	}
}
