import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import OldOrder from '../component/OldOrder';
import Details from '../component/Details';
import InProgressOrder from '../component/InProgressOrder';

const OrderScreen = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Pedidos" component={Orders} />
			<Stack.Screen name="Detalhes" component={Details} />
		</Stack.Navigator>
	);
};

export default OrderScreen;

const Orders = (props) => {
	const { navigation } = props;
	const [ page, setPage ] = useState(1);
	return (
		<View style={styles.container}>
			<View style={styles.nav}>
				<TouchableOpacity style={styles.titles} onPress={() => setPage(1)}>
					<Text>Anteriores</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.titles} onPress={() => setPage(2)}>
					<Text>Em Andamento</Text>
				</TouchableOpacity>
			</View>
			{page === 1 ? <OldOrder navigation={navigation} /> : <InProgressOrder />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	topTitle: {
		backgroundColor: '#fff',
		textAlign: 'center',
		paddingVertical: 10
	},
	nav: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		height: 60
	},
	titles: {
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
