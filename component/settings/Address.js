import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

import { connect } from 'react-redux';
import { getAddress, deleteAddress } from '../../redux/actions/addressActions';

import ButtonComponent from '../my_components/ButtonComponent';
import BottomModal from '../my_components/BottomModal';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

let { width } = Dimensions.get('window');

const Address = (props) => {
	const { getAddress, deleteAddress, address, navigation } = props;

	const [ idToDelete, setIdToDelete ] = useState(null);
	const [ itemToEdit, setItemToEdit ] = useState({});
	const [ isModalVisible, setModalVisible ] = useState(false);

	const toggleModal = () => setModalVisible(!isModalVisible);

	useEffect(() => getAddress(), [ getAddress ]);

	const HandleDelete = () => {
		deleteAddress(idToDelete, () => toggleModal());
	};

	const HandleEdit = () => {
		toggleModal();
		navigation.navigate('AddAddress', { route: 'put', item: itemToEdit });
	};

	return (
		<View style={styles.container}>
			<ButtonComponent onPress={() => navigation.navigate('AddAddress', { route: 'post' })}>
				ADICIONAR ENDEREÇO
			</ButtonComponent>

			<BottomModal
				isModalVisible={isModalVisible}
				setModalVisible={setModalVisible}
				rightButtonText="EXCLUIR"
				leftButtonText="EDITAR"
				onRightPress={HandleDelete}
				onLeftPress={HandleEdit}
				title={`${itemToEdit.street}, ${itemToEdit.num}`}
			/>

			<FlatList
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				data={address}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>
						<View
							style={{
								flex: 1,
								paddingHorizontal: 15,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<MaterialIcons name="location-on" size={24} color="#3E3E3E" />
						</View>

						<View style={{ flex: 10, justifyContent: 'center' }}>
							<Text style={{ fontWeight: 'bold' }}>
								{item.street}, {item.num}
							</Text>
							<Text>{item.neightborhood}</Text>
							<Text>Rio de Janeiro/RJ</Text>
							<Text>{item.cep}</Text>
						</View>

						<View style={{ flex: 1, marginHorizontal: 15 }}>
							<TouchableOpacity
								onPress={() => {
									toggleModal();
									setIdToDelete(item.id);
									setItemToEdit(item);
								}}
							>
								<MaterialIcons name="more-vert" size={24} color="black" />
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</View>
	);
};

const mapStateToProps = (state) => ({
	address: state.address
});

export default connect(mapStateToProps, { getAddress, deleteAddress })(Address);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fafafa',
		paddingVertical: 10
	},
	contentContainer: {
		width: 0.9 * width,
		marginVertical: 10
	},
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		marginBottom: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		paddingVertical: 15
	},
	buttonStyle: {
		backgroundColor: '#fff',
		borderWidth: 0,
		margin: 1,
		padding: 10
	}
});
