import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { logoutUser } from '../redux/actions/authActions';
import { connect } from 'react-redux';

const Setting = (props) => {
	const { navigation, logoutUser } = props;
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
				<Text>Cadastro</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Address')} style={styles.button}>
				<Text>Endereços</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => logoutUser()} style={styles.button}>
				<Text>Sair</Text>
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logoutUser })(Setting);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 10
	},
	button: {
		backgroundColor: '#fff',
		padding: 20
	}
});
