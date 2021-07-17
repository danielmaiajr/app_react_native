import { GET_CUSTOMER, PUT_CUSTOMER } from '../types';

const initialState = {
	email: '',
	first_name: '',
	last_name: '',
	cpf: null,
	phone: null
};

export default function(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case GET_CUSTOMER:
			return {
				...state,
				email: payload.email,
				first_name: payload.first_name,
				last_name: payload.last_name,
				cpf: payload.cpf,
				phone: payload.phone
			};

		case PUT_CUSTOMER:
			return {
				...state,
				first_name: payload.first_name,
				last_name: payload.last_name,
				cpf: payload.cpf,
				phone: payload.phone
			};
		case 'GET_STATE':
			return state;
		default:
			return state;
	}
}
