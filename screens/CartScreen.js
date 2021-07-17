import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Button, Platform, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { changeShowCart, deleteItemsCart, getCartItems } from '../redux/actions/cartActions';

import CartItem from '../component/ProductItemList';
import BottomModal from '../component/my_components/BottomModal';

const CartScreen = (props) => {
	const { deleteItemsCart, getCartItems, navigation } = props;
	const { cartItems } = props.cart;

	const [ refreshing, setRefreshing ] = useState(false);
	const [ isModalVisible, setModalVisible ] = useState(false);

	const toggleModal = () => setModalVisible(!isModalVisible);

	let num = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((n) => (num += n.quantity * n.price));
	}

	const onDelete = () => {
		deleteItemsCart(() => toggleModal());
	};

	const handleOnContinue = () => {
		navigation.navigate('Checkout');
	};

	const HandleRefresh = () => {
		setRefreshing(true);
		getCartItems();
		setRefreshing(false);
	};

	return (
		<View style={styles.cart}>
			<View style={{ flex: 1, width: '100%' }}>
				<BottomModal
					isModalVisible={isModalVisible}
					setModalVisible={setModalVisible}
					onRightPress={onDelete}
					title="Remover todos os items do carrinho?"
				/>
				{cartItems.length > 0 && (
					<View style={styles.cartDelete}>
						<TouchableOpacity style={styles.cartDeleteIcon} onPress={toggleModal}>
							<MaterialCommunityIcons name="delete-forever" size={18} color="#c52b2b" />
							<Text style={styles.cartDeleteText}> Limpar</Text>
						</TouchableOpacity>
					</View>
				)}
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingVertical: 5 }}
					data={cartItems}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <CartItem product={item} />}
					refreshing={refreshing}
					onRefresh={HandleRefresh}
				/>

				<View style={styles.cartCheckout}>
					<Text style={styles.cartCheckoutTotal}>Total: R$ {num},68</Text>
					<TouchableOpacity onPress={handleOnContinue} style={styles.cartCheckoutButton}>
						<Text style={styles.cartCheckoutText}>Continuar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart,
	loading: state.loading
});

export default connect(mapStateToProps, { changeShowCart, deleteItemsCart, getCartItems })(CartScreen);

const styles = StyleSheet.create({
	cart: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#eee'
	},

	cartDelete: {
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderColor: '#eee'
	},

	cartDeleteIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		marginHorizontal: 20,
		justifyContent: 'flex-end'
	},
	cartDeleteText: {
		color: '#c52b2b',
		fontWeight: 'bold'
	},
	cartCheckout: {
		backgroundColor: '#fff',
		paddingVertical: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 30,
		borderTopWidth: 1,
		borderColor: '#f2f2f2'
	},
	cartCheckoutTotal: {
		fontWeight: 'bold'
	},
	cartCheckoutButton: {
		backgroundColor: '#EA1D2C',
		paddingHorizontal: 40,
		paddingVertical: 10,
		borderRadius: 3
	},
	cartCheckoutText: {
		color: 'white'
	}
});
