import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { logoutUser } from '../redux/actions/authActions';
import { getCustomer } from '../redux/actions/customerAction';
import { connect } from 'react-redux';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import BottomModal from '../component/my_components/BottomModal';

const SettingScreen = (props) => {
	const { getCustomer, navigation, logoutUser } = props;

	const [ isModalVisible, setModalVisible ] = useState(false);

	const toggleModal = () => setModalVisible(!isModalVisible);

	useEffect(() => getCustomer(), [ getCustomer ]);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate('Profile')}
				style={[ styles.button, { borderTopWidth: 1 } ]}
			>
				<View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
					<FontAwesome name="user" size={24} color="#3E3E3E" />
				</View>
				<View style={{ flex: 10 }}>
					<Text>Cadastro</Text>
					<Text style={{ fontSize: 12, color: '#aaa' }}>Editar Perfil</Text>
				</View>
				<View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
					<Ionicons name="ios-arrow-forward" size={20} color="#3E3E3E" />
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate('Address')} style={styles.button}>
				<View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
					<MaterialIcons name="location-on" size={24} color="#3E3E3E" />
				</View>
				<View style={{ flex: 10 }}>
					<Text>Endereços</Text>
					<Text style={{ fontSize: 12, color: '#aaa' }}>Meus Endereços</Text>
				</View>
				<View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
					<Ionicons name="ios-arrow-forward" size={20} color="#3E3E3E" />
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => {}} style={styles.button}>
				<View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
					<FontAwesome name="credit-card-alt" size={18} color="#3E3E3E" />
				</View>
				<View style={{ flex: 10 }}>
					<Text>Formas de Pagamento</Text>
					<Text style={{ fontSize: 12, color: '#aaa' }}>Minhas Formas de Pagamento</Text>
				</View>
				<View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }}>
					<Ionicons name="ios-arrow-forward" size={20} color="#3E3E3E" />
				</View>
			</TouchableOpacity>

			<View style={{ flex: 1 }} />

			<BottomModal
				isModalVisible={isModalVisible}
				setModalVisible={setModalVisible}
				onRightPress={() => {
					toggleModal();
					logoutUser();
				}}
				title="Deseja realmente sair?"
			/>

			<TouchableOpacity onPress={toggleModal} style={[ styles.button, { borderBottomWidth: 0 } ]}>
				<View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
					<MaterialCommunityIcons name="logout" size={24} color="#3E3E3E" />
				</View>
				<Text style={{ flex: 10 }}>Sair</Text>
				<View style={{ flex: 1, alignItems: 'flex-end', paddingHorizontal: 10 }} />
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, getCustomer })(SettingScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 15,
		backgroundColor: '#fff'
	},
	button: {
		backgroundColor: '#fff',
		paddingHorizontal: 5,
		paddingVertical: 15,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#eee'
	}
});
