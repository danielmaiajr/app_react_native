import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import Counter from './Counter';

export const CartItem = (props) => {
	const { product } = props;

	return (
		<View style={styles.cartItem}>
			<Image
				source={{
					uri: product.image_url
				}}
				alt={product.product_name}
				style={styles.cartImage}
			/>
			<View style={styles.cartItemContainer}>
				<Text style={styles.cartProductName}>{product.product_name}</Text>
				<View style={styles.cartProductButton}>
					<Text style={styles.cartProductPrice}>R$ {product.price}</Text>
					<Counter style={styles.cartProductCounter} product={product} css="cart" />
				</View>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

const styles = StyleSheet.create({
	cartItem: {
		backgroundColor: 'white',
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 16,
		paddingHorizontal: 20,
		paddingVertical: 10
	},

	cartImage: {
		width: 60,
		height: 60
	},

	cartItemContainer: {
		paddingLeft: 20,
		flex: 1
	},
	cartProductName: {
		height: 30,
		lineHeight: 15
	},
	cartProductButton: {
		flex: 1,
		flexDirection: 'row'
	},

	cartProductPrice: {
		flex: 1,
		color: '#111',
		display: 'flex',
		alignSelf: 'center',
		justifyContent: 'center',
		fontWeight: 'bold'
	},
	cartProductCounter: {
		flex: 1
	}
});
