import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import addressReducer from './addressReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import searchReducer from './searchReducer';
import customerReducer from './customerReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
	loading: loadingReducer,
	auth: authReducer,
	customer: customerReducer,
	cart: cartReducer,
	address: addressReducer,
	order: orderReducer,
	product: productReducer,
	search: searchReducer
});
