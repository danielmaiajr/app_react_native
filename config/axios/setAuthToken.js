import axios from 'axios';

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
