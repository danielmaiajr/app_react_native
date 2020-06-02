import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../component/Profile';
import Address from '../component/Address';
import Setting from '../component/Setting';

import { connect } from 'react-redux';

const Stack = createStackNavigator();

const SettingScreen = (props) => {
	const { user } = props.auth;
	return (
		<Stack.Navigator initialRouteName="Setting">
			<Stack.Screen name="Setting" name={`Olá, ${user.name}`} component={Setting} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="Address" component={Address} />
		</Stack.Navigator>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

const styles = StyleSheet.create({});
