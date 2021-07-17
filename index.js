import { registerRootComponent } from 'expo';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

class Index extends React.Component {
	render() {
		return (
			<NavigationContainer>
				<Provider store={store}>
					<App />
				</Provider>
			</NavigationContainer>
		);
	}
}
registerRootComponent(Index);
