import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { changeShowCart, deleteItemsCart, getCartItems } from '../redux/actions/cartActions';

import CartItem from './CartItem';

const Cart = (props) => {
	const { deleteItemsCart, getCartItems, navigation } = props;
	const { cartItems } = props.cart;

	useEffect(
		() => {
			console.log('Renderizando o carrinho');
			getCartItems();
		},
		[ getCartItems ]
	);

	let num = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((n) => {
			num += n.quantity * n.price;
		});
	}

	const onDelete = () => {
		deleteItemsCart();
	};

	const handleOnContinue = () => {
		navigation.navigate('Checkout');
	};

	return (
		<View style={styles.cart}>
			<View style={styles.cartDelete}>
				{cartItems.length > 0 ? (
					<TouchableOpacity style={styles.cartDeleteIcon} onPress={onDelete}>
						<FontAwesome5 name="trash" size={14} color="#c52b2b" />
						<Text style={styles.cartDeleteText}> Limpar</Text>
					</TouchableOpacity>
				) : null}
			</View>
			<ScrollView style={styles.cartScroll}>
				{cartItems.map((item, i) => <CartItem key={i} product={item} />)}
			</ScrollView>
			<View style={styles.cartCheckout}>
				<Text style={styles.cartCheckoutTotal}>Total: R$ {num}</Text>
				<TouchableOpacity onPress={handleOnContinue} style={styles.cartCheckoutButton}>
					<Text style={styles.cartCheckoutText}>Continuar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart
});

export default connect(mapStateToProps, { changeShowCart, deleteItemsCart, getCartItems })(Cart);

const styles = StyleSheet.create({
	cart: {
		flex: 1,
		color: '#95989a',
		backgroundColor: '#fff'
	},
	cartDeleteIcon: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},

	cartDelete: {
		backgroundColor: '#FAFAFA',
		color: '#c52b2b',
		height: 36,
		width: '100%',
		alignItems: 'flex-end',
		paddingHorizontal: 30,
		justifyContent: 'center'
	},
	cartDeleteText: {
		color: '#c52b2b',
		fontWeight: 'bold'
	},
	cartScroll: {
		backgroundColor: '#fff',
		color: '#c52b2b',
		width: '100%'
	},
	cartCheckout: {
		backgroundColor: '#FAFAFA',
		height: 50,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 30
	},
	cartCheckoutTotal: {
		fontWeight: 'bold'
	},
	cartCheckoutButton: {
		backgroundColor: '#4e3188',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5
	},
	cartCheckoutText: {
		color: 'white'
	}
});
