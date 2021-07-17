import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import ButtonComponent from '../my_components/ButtonComponent';

const BottomModal = ({
	isModalVisible,
	setModalVisible,
	title,
	onRightPress,
	rightButtonText = 'CONTINUAR',
	onLeftPress = () => setModalVisible(false),
	leftButtonText = 'CANCELAR'
}) => (
	<Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} style={styles.view}>
		<View style={styles.content}>
			<Text style={styles.contentTitle}>{title}</Text>

			<View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
				<ButtonComponent type="secondary" buttonStyle={{ width: '45%' }} onPress={onLeftPress}>
					{leftButtonText}
				</ButtonComponent>
				<ButtonComponent type="secondary" buttonStyle={{ width: '45%' }} onPress={onRightPress}>
					{rightButtonText}
				</ButtonComponent>
			</View>
		</View>
	</Modal>
);
export default BottomModal;

const styles = StyleSheet.create({
	view: {
		justifyContent: 'flex-end',
		margin: 0
	},
	content: {
		backgroundColor: 'white',
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	contentTitle: {
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20
	}
});
