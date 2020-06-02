import { GET_SEARCHNAV_RESULTS, GET_SEARCHPAGE_RESULTS } from '../types';
const initialState = {
	searchNav: [],
	searchPage: []
};

export default function(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case GET_SEARCHNAV_RESULTS:
			return {
				...state,
				searchNav: payload
			};
		case GET_SEARCHPAGE_RESULTS:
			return {
				...state,
				searchPage: payload
			};
		default:
			return state;
	}
}
