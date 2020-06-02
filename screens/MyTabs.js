import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import OrderScreen from './OrderScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';
import CartScreen from './CartScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
					} else if (route.name === 'Pedidos') {
						iconName = focused ? 'ios-list-box' : 'ios-list';
					} else if (route.name === 'Settings') {
						iconName = focused ? 'ios-list-box' : 'ios-list';
					} else if (route.name === 'Search') {
						iconName = focused ? 'ios-list-box' : 'ios-list';
					} else if (route.name === 'Cart') {
						iconName = focused ? 'ios-list-box' : 'ios-list';
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />;
				}
			})}
			tabBarOptions={{
				activeTintColor: '#4e3188',
				inactiveTintColor: 'gray'
			}}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Pedidos" component={OrderScreen} />
			<Tab.Screen name="Search" component={SearchScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
			<Tab.Screen name="Cart" component={CartScreen} />
		</Tab.Navigator>
	);
};

export default MyTabs;
