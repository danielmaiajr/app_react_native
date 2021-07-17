import React from 'react';
//import LottieView from 'lottie-react-native';

import { Image, View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { connect } from 'react-redux';

import TabNavigation from './screens/MyTabs';

import Login from './component/auth/Login';
import Begin from './component/auth/Begin';
import VerifyCep from './component/auth/VerifyCep';
import Register from './component/auth/Register';

import Profile from './component/settings/Profile';
import Address from './component/settings/Address';
import AddAddress from './component/settings/AddAddress';

import Section from './component/home/Section';

import Details from './component/orders/Details';

import Checkout from './component/cart/Checkout';

import { loginCheck } from './config/loginCheck';
loginCheck();

const App = (props) => {
	const { isAuthenticated } = props.auth;

	return (
		<SafeAreaProvider>
			{isAuthenticated === false ? (
				<Stack.Navigator initialRouteName="Begin" screenOptions={navStyle}>
					<Stack.Screen name="Início" component={Begin} options={{ headerShown: false }} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Registrar-se" component={Register} />
					<Stack.Screen name="Consultar CEP" component={VerifyCep} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator screenOptions={navStyle}>
					<Stack.Screen
						name="Home"
						component={TabNavigation}
						options={({ route }) => ({
							headerTitle: (props) => <Title title={getHeaderTitle(route)} {...props} />
						})}
					/>
					<Stack.Screen name="Checkout" component={Checkout} />
					<Stack.Screen name="Detalhes" component={Details} />
					<Stack.Screen name="Profile" component={Profile} options={{ title: 'Meu Cadastro' }} />
					<Stack.Screen name="Address" component={Address} options={{ title: 'Endereços' }} />
					<Stack.Screen name="AddAddress" component={AddAddress} options={{ title: 'Endereço' }} />
					<Stack.Screen name="Section" component={Section} options={{ title: 'Categoria' }} />
				</Stack.Navigator>
			)}
		</SafeAreaProvider>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

const navStyle = {
	headerStyle: {
		backgroundColor: '#fff'
	},
	headerTitleStyle: {
		fontSize: 18
	},
	headerTintColor: '#3E3E3E'
};

// -----------------------------------------------------------------------------------------------------------

const Title = (props) => {
	const { title } = props;

	return (
		<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ color: '#3E3E3E', fontSize: 16, textTransform: 'uppercase' }}>{title}</Text>
			{/* 	{title === 'Home' ? (
				<Image
					style={{ width: 50, height: 50, backgroundColor: '#fff' }}
					source={require('./assets/test.png')}
				/>
			) : (
				<Text style={{ color: '#3E3E3E', fontSize: 16, textTransform: 'uppercase' }}>{title}</Text>
			)} */}
		</View>
	);
};

// -----------------------------------------------------------------------------------------------------------

const getHeaderTitle = (route) => {
	// Access the tab navigator's state using `route.state`
	const routeName = route.state
		? // Get the currently active route name in the tab navigator
			route.state.routes[route.state.index].name
		: // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
			// In our case, it's "Feed" as that's the first screen inside the navigator
			(route.params && route.screen) || 'Home';

	switch (routeName) {
		case 'Home':
			return 'Home';
		case 'Pedidos':
			return 'Pedidos';
		case 'Pesquisar':
			return 'Pesquisar';
		case 'Perfil':
			return 'Perfil';
		case 'Carrinho':
			return 'Carrinho';
		default:
			return 'Home';
	}
};
