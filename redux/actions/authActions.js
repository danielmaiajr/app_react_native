import jwt_decode from 'jwt-decode';
import axios from 'axios';

import { GET_CURRENT_USER, SET_ERRORS } from '../types';
import { loading } from './loadingActions';

import { AsyncStorage } from 'react-native';
import setAuthToken from '../../config/axios/setAuthToken';

const _storeData = async (key, item) => {
	try {
		await AsyncStorage.setItem(key, item);
	} catch (error) {
		// Error saving data
	}
};

const _removeData = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		// Error saving data
	}
};

export const registerUser = (userData, navigation) => (dispatch) => {
	dispatch(loading(true));
	axios
		.post('/api/customers', userData)
		.then((res) => {
			dispatch(loading(false));

			dispatch({
				type: SET_ERRORS,
				payload: {}
			});

			console.log(res.data);
			navigation.goBack();
			navigation.navigate('Login');
		})
		.catch((err) => {
			dispatch(loading(false));

			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
			console.log(err.response.data);
		});
};

export const loginUser = (userData) => (dispatch) => {
	dispatch(loading(true));
	axios
		.post('/api/customers/login', userData)
		.then((res) => {
			//Salvar no localstorage
			const { token } = res.data;
			_storeData('jwtToken', token);

			//Colocar token no header
			setAuthToken(token);

			//Decodificar token para conseguir os dados do usuario
			const decoded = jwt_decode(token);
			console.log(token);

			//Colocar o usuario na store(Redux)
			dispatch(loading(false));
			dispatch({
				type: GET_CURRENT_USER,
				payload: decoded
			});
			dispatch({
				type: SET_ERRORS,
				payload: {}
			});
		})
		.catch((err) => {
			console.log(err.response.data);
			dispatch(loading(false));
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const logoutUser = (history) => (dispatch) => {
	_removeData('jwtToken');
	setAuthToken(false);
	dispatch(loading(false));
	dispatch({
		type: GET_CURRENT_USER,
		payload: {}
	});
};
