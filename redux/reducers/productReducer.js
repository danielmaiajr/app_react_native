import { GET_PRODUCT_HOME, GET_PRODUCT_SECTION } from '../types';
const initialState = {
	home: [],
	section: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCT_HOME:
			return { ...state, home: action.payload };
		case GET_PRODUCT_SECTION:
			return { ...state, section: action.payload };

		default:
			return state;
	}
}
