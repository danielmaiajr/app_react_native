import { GET_CURRENT_USER } from '../types';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../../config/axios/setAuthToken';
import jwt_decode from 'jwt-decode';

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
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/customers', userData)
		.then((res) => {
			history.push('/login');
			console.log(res);
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
			console.log(err.response);
		});
};

export const loginUser = (userData) => (dispatch) => {
	axios
		.post('http://teststoreapp-com.umbler.net/api/customers/login', userData)
		.then((res) => {
			//Salvar no localstorage
			const { token } = res.data;
			_storeData('jwtToken', token);

			//Colocar token no header
			setAuthToken(token);

			//Decodificar token para conseguir os dados do usuario
			const decoded = jwt_decode(token);
			console.log(token);
			//Colocar o usuario na store
			dispatch({
				type: GET_CURRENT_USER,
				payload: decoded
			});
		})
		.catch((err) => {
			console.log(err.response.data);
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
		});
};

export const logoutUser = (history) => (dispatch) => {
	_removeData('jwtToken');
	setAuthToken(false);
	dispatch({
		type: GET_CURRENT_USER,
		payload: {}
	});
};
