import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import { getCartItems } from '../redux/actions/cartActions';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import OrdersScreen from './OrdersScreen';
import SearchScreen from './SearchScreen';
import SettingScreen from './SettingScreen';
import CartScreen from './CartScreen';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { Badge } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const MyTabs = (props) => {
	const { getCartItems, auth } = props;
	const { cartItems } = props.cart;

	useEffect(
		() => {
			getCartItems();
		},
		[ getCartItems ]
	);

	let num = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((n) => {
			num += n.quantity;
		});
	}

	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = <FontAwesome name="home" size={size} color={color} />;
					} else if (route.name === 'Pedidos') {
						iconName = <Ionicons name="md-list-box" size={size} color={color} />;
					} else if (route.name === 'Pesquisar') {
						iconName = <FontAwesome name="search" size={size} color={color} />;
					} else if (route.name === 'Perfil') {
						iconName = <FontAwesome name="user" size={size} color={color} />;
					} else if (route.name === 'Carrinho') {
						iconName = <IconWithBadge color={color} size={size} badgeCount={num} />;
					}

					return iconName;
				}
			})}
			tabBarOptions={{
				activeTintColor: '#353535',
				inactiveTintColor: 'gray',
				keyboardHidesTabBar: true
			}}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Pedidos" component={OrdersScreen} />
			<Tab.Screen name="Pesquisar" component={SearchScreen} />
			<Tab.Screen name="Perfil" component={SettingScreen} />
			<Tab.Screen name="Carrinho" component={CartScreen} />
		</Tab.Navigator>
	);
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	cart: state.cart
});

export default connect(mapStateToProps, { getCartItems })(MyTabs);

function IconWithBadge({ badgeCount, color, size }) {
	return (
		<View style={{}}>
			<MaterialIcons name="shopping-cart" size={size} color={color} />
			{badgeCount > 0 && (
				<View
					style={{
						// On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
						position: 'absolute',
						flex: 1,
						right: -6,
						top: -3,
						backgroundColor: '#EA1D2C',
						borderRadius: 8,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Badge size={16}>{badgeCount}</Badge>
				</View>
			)}
		</View>
	);
}
