import { SET_ERRORS } from '../types';

const initialState = {};

export default function(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case SET_ERRORS:
			return payload;

		default:
			return state;
	}
}
