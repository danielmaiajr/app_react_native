import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, Button } from 'react-native';

import { connect } from 'react-redux';
import { addItemsCart, subItemsCart } from '../redux/actions/cartActions';

const Counter = (props) => {
	const { product, addItemsCart, subItemsCart } = props;
	const { cartItems } = props.cart;

	const exist = cartItems.find((item) => item.product_id === product.product_id);

	const HandleSubItemsCart = () => {
		subItemsCart(product);
	};
	const HandleAddItemsCart = () => {
		addItemsCart(product);
	};

	return (
		<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
			{!exist ? (
				<TouchableOpacity
					onPress={HandleAddItemsCart}
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 15,
						height: 35,
						backgroundColor: '#4e3188',
						borderRadius: 3
					}}
				>
					<Text style={{ color: 'white' }}>Adicionar</Text>
				</TouchableOpacity>
			) : (
				<ContainerButton>
					<TouchableOpacity
						onPress={HandleSubItemsCart}
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					>
						<AntDesign name="minus" size={18} color="black" />
					</TouchableOpacity>
					<ContainerButtonQuantity>
						<Text>{exist ? exist.quantity : 0}</Text>
					</ContainerButtonQuantity>
					<TouchableOpacity
						onPress={HandleAddItemsCart}
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					>
						<AntDesign name="plus" size={18} color="black" />
					</TouchableOpacity>
				</ContainerButton>
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

const ContainerButton = styled.View`
	border-radius: 3px;
	border: solid 1px #ccc;
	flex: 1;
	height: 35px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 15px;
`;

const ContainerButtonQuantity = styled.Text`
	color: #555;
	flex: 1;
	font-size: 16px;
	font-weight: 500;
	text-align: center;
`;
