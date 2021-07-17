import { logoutUser } from '../redux/actions/authActions';

import { AsyncStorage } from 'react-native';
import setAuthToken from '../config/axios/setAuthToken';
import store from '../redux/store';
import jwt_decode from 'jwt-decode';

export const loginCheck = () => {
	AsyncStorage.getItem('jwtToken')
		.then((bearerToken) => {
			if (bearerToken) {
				const decoded = jwt_decode(bearerToken);

				setAuthToken(bearerToken);

				store.dispatch({
					type: 'GET_CURRENT_USER',
					payload: decoded
				});
			} else {
				setAuthToken(null);
			}
		})
		.catch((err) => {
			console.log('login Check error');
			setAuthToken(null);
		});
};
