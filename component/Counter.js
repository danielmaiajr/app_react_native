import React from 'react';

import { Entypo } from '@expo/vector-icons';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { addItemsCart, subItemsCart } from '../redux/actions/cartActions';

const Counter = (props) => {
	const { product, addItemsCart, subItemsCart } = props;
	const { cartItems } = props.cart;

	const exist = cartItems.find((item) => item.id === product.id);

	const HandleSubItemsCart = () => {
		subItemsCart(product);
	};
	const HandleAddItemsCart = () => {
		addItemsCart(product);
	};

	return (
		<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
			{!exist ? (
				<View style={[ styles.containerButton, { backgroundColor: '#EA1D2C', borderColor: '#EA1D2C' } ]}>
					<TouchableOpacity onPress={HandleAddItemsCart} style={[ styles.button, { padding: 7 } ]}>
						<Text style={{ color: '#eee', fontSize: 16 }}>Adicionar</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.containerButton}>
					<TouchableOpacity onPress={HandleSubItemsCart} style={styles.button}>
						{exist.quantity === 1 ? (
							<MaterialCommunityIcons name="delete" size={16} color="#c52b2b" />
						) : (
							<Entypo name="minus" size={18} color="red" />
						)}
					</TouchableOpacity>

					<View style={[ styles.button, { paddingVertical: 7, paddingHorizontal: 3 } ]}>
						<Text style={{ flex: 1, fontWeight: 'bold', color: '#8a8a8a' }}>
							{exist ? exist.quantity : 0}
						</Text>
					</View>

					<TouchableOpacity onPress={HandleAddItemsCart} style={styles.button}>
						<Entypo name="plus" size={18} color="#3E3E3E" />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart
});

const mapDispatchToProps = {
	addItemsCart,
	subItemsCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

const styles = StyleSheet.create({
	containerButton: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 5,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5
	},
	button: {
		flex: 1,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
