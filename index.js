import { registerRootComponent } from 'expo';
import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

class Index extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}
registerRootComponent(Index);
