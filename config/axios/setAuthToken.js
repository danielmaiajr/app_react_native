import axios from 'axios';

//const url = 'https://agile-shelf-47857.herokuapp.com';
const url = 'http://192.168.0.177:5000';

const setAuthToken = (token) => {
	axios.defaults.baseURL = url;
	if (token) {
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
