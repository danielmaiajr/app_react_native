import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import Counter from './Counter';

export const ProductItemList = (props) => {
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
					<Text style={styles.cartProductPrice}>R$ {product.price},90</Text>
					<Counter style={styles.cartProductCounter} product={product} css="cart" />
				</View>
			</View>
		</View>
	);
};

export default ProductItemList;

const styles = StyleSheet.create({
	container: {},
	cartItem: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 15,
		paddingHorizontal: 20,
		marginVertical: 7,
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#ddd'
	},

	cartImage: {
		width: 50,
		height: 50
	},

	cartItemContainer: {
		paddingLeft: 20,
		marginVertical: 10,
		flex: 1
	},
	cartProductName: {
		height: 44,
		lineHeight: 22,
		color: '#555',
		fontSize: 16,
		marginBottom: 10
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
		color: '#8a8a8a',
		fontWeight: '500'
	},
	cartProductCounter: {
		flex: 1
	}
});
