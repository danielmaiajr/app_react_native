import { SET_LOADING } from '../types';

export const loading = (bool) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: bool
	});
};
