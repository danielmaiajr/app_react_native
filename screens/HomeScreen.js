import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from '../component/Home';

const HomeScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Home />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
