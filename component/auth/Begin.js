import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import BackGroundCarousel from './BackGroundCarousel';
import ButtonComponent from '../my_components/ButtonComponent';

const Begin = (props) => {
	const { navigation } = props;
	return (
		<SafeAreaView style={styles.container}>
			<BackGroundCarousel />
			<View style={styles.buttonContainer}>
				<ButtonComponent onPress={() => navigation.navigate('Login')}>LOGIN</ButtonComponent>

				<ButtonComponent onPress={() => navigation.navigate('Registrar-se')} type="secondary">
					REGISTRAR
				</ButtonComponent>

				<TouchableOpacity onPress={() => navigation.navigate('Consultar CEP')}>
					<Text style={styles.linkText}>Consultar área de entrega</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Begin;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		paddingVertical: 50
	},
	buttonContainer: {
		width: '90%',
		alignItems: 'center',
		padding: 10
	},
	linkText: {
		textAlign: 'center',
		fontSize: 12,
		textDecorationLine: 'underline',
		color: '#3E3E3E'
	}
});
