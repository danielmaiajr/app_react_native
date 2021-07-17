import { GET_ADDRESS, POST_ADDRESS, PUT_ADDRESS, DELETE_ADDRESS } from '../types';

const initialState = [];

export default function(state = initialState, action) {
	const { payload } = action;
	let exist;

	switch (action.type) {
		case GET_ADDRESS:
			return payload;

		case POST_ADDRESS:
			return [ ...state, payload ];

		case PUT_ADDRESS:
			exist = state.map((i) => {
				if (i.id === payload.id) {
					return {
						id: payload.id,
						neightborhood: payload.neightborhood,
						street: payload.street,
						num: payload.num,
						cep: payload.cep
					};
				} else {
					return i;
				}
			});

			return exist;

		case DELETE_ADDRESS:
			exist = state.filter((a) => a.id.toString() !== payload.id_removed);
			return exist;

		default:
			return state;
	}
}

/* console.log(payload);
exist = state.filter((i) => payload.id !== i.id);
exist.push(payload);
console.log(exist); */
