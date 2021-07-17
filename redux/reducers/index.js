import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import addressReducer from './addressReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import searchReducer from './searchReducer';
import customerReducer from './customerReducer';
import loadingReducer from './loadingReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
	loading: loadingReducer,
	errors: errorsReducer,
	auth: authReducer,
	customer: customerReducer,
	cart: cartReducer,
	address: addressReducer,
	order: orderReducer,
	product: productReducer,
	search: searchReducer
});
