import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { connect } from 'react-redux';

import Login from './component/auth/Login';
import TabNavigation from './screens/MyTabs';

const App = (props) => {
	const { isAuthenticated } = props.auth;

	return (
		<SafeAreaProvider>
			<NavigationContainer>{isAuthenticated == false ? <Login /> : <TabNavigation />}</NavigationContainer>
		</SafeAreaProvider>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
