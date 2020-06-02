import { GET_CURRENT_USER } from '../types';
import isEmpty from '../../config/validation/is-empty';
const initialState = {
	isAuthenticated: false,
	user: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
}
