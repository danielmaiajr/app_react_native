import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import axios from 'axios';

import { getAddress } from '../../redux/actions/addressActions';
import { postOrder } from '../../redux/actions/orderActions';
import { deleteItemsCart } from '../../redux/actions/cartActions';
import { connect } from 'react-redux';

import ButtonComponent from '../my_components/ButtonComponent';
import { RadioButton } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';

let { width } = Dimensions.get('window');

const Checkout = (props) => {
	const { address, deleteItemsCart, getAddress, postOrder, navigation } = props;
	const { isLoading } = props.loading;
	const { cartItems } = props.cart;

	const [ checkedAdr, setCheckedAdr ] = useState(null);
	const [ checkedPay, setCheckedPay ] = useState(null);
	const [ checkedDate, setCheckedDate ] = useState(null);
	const [ checkedOBS, setCheckedOBS ] = useState(null);
	const [ showItems, setShowItems ] = useState(false);
	const [ delivery, setDelivery ] = useState([]);

	useEffect(
		() => {
			getAddress();
			axios
				.get('/api/scheduling')
				.then((res) => {
					setDelivery(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[ getAddress ]
	);

	let q = 0;
	let num = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((n) => {
			q += n.quantity;
			num += n.quantity * n.price;
		});
	}

	const HandleSubmit = () => {
		postOrder(checkedAdr, checkedDate.day, navigation, deleteItemsCart);
	};

	return (
		<ScrollView
			contentContainerStyle={{
				backgroundColor: '#fff',
				paddingHorizontal: 15,
				paddingBottom: 20,
				alignItems: 'center'
			}}
		>
			<View style={{ paddingHorizontal: 30, paddingVertical: 15 }}>
				<Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold' }}>Endereço de Entrega</Text>
				<View style={{ paddingHorizontal: 20 }}>
					{address.length > 0 ? (
						address.map((adr) => (
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center'
								}}
								key={adr.id}
							>
								<RadioButton
									value="first"
									status={checkedAdr === adr ? 'checked' : 'unchecked'}
									onPress={() => {
										setCheckedAdr(adr);
									}}
								/>
								<Text>
									{adr.street} {adr.num}
								</Text>
							</View>
						))
					) : (
						<View
							style={{
								alignItems: 'center'
							}}
						>
							<Text>Não encontramos um endereço cadastrado</Text>
							<ButtonComponent
								type="primary"
								buttonStyle={{ width: '80%', padding: 10 }}
								onPress={() => navigation.navigate('AddAddress', { route: 'post' })}
							>
								Adicionar Endereço
							</ButtonComponent>
						</View>
					)}
				</View>

				<Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold' }}>Data de Entrega</Text>
				{delivery.map((data, index) => (
					<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }} key={index}>
						<RadioButton
							value="first"
							status={data === checkedDate ? 'checked' : 'unchecked'}
							onPress={() => {
								setCheckedDate(data);
							}}
						/>
						<Text>
							Dia: {data.day} Período: {data.period}
						</Text>
					</View>
				))}

				<Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold' }}>Forma de Pagamento</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 20
					}}
				>
					<RadioButton
						value="first"
						status={checkedPay === 1 ? 'checked' : 'unchecked'}
						onPress={() => {
							setCheckedPay(1);
						}}
					/>
					<Text>Pagamento na Entrega</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 20
					}}
				>
					<RadioButton
						value="first"
						disabled
						status={checkedPay === 2 ? 'checked' : 'unchecked'}
						onPress={() => {
							setCheckedPay(2);
						}}
					/>
					<Text>Pagamento online (Em Breve)</Text>
				</View>

				<Text style={{ fontSize: 16, padding: 10, fontWeight: 'bold' }}>Observação</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 20
					}}
				>
					<Checkbox
						status={checkedOBS ? 'checked' : 'unchecked'}
						onPress={() => {
							setCheckedOBS(!checkedOBS);
						}}
					/>
					<Text>Entregar na Portaria</Text>
				</View>
			</View>
			<View style={{ width: '90%', borderWidth: 1, borderColor: '#ccc', alignItems: 'center' }}>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						paddingVertical: 20,
						paddingHorizontal: 20,
						justifyContent: 'space-between',
						borderBottomWidth: 1,
						borderColor: '#ccc'
					}}
				>
					<Text style={{ textAlign: 'center' }}>Produtos</Text>
					<Text style={{ textAlign: 'center' }}>{q} Item(s)</Text>
				</View>

				{!showItems ? (
					<ButtonComponent
						type="secondary"
						onPress={() => setShowItems(true)}
						buttonStyle={{ borderWidth: 0 }}
					>
						Ver Items
					</ButtonComponent>
				) : (
					<View style={{ width: '100%', alignItems: 'center', paddingTop: 10 }}>
						{cartItems.map((prod) => (
							<View style={styles.itemContainer} key={prod.id}>
								<View
									style={{
										flex: 0.5,
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									<Image source={{ uri: prod.image_url }} style={{ width: 30, height: 30 }} />
								</View>
								<View style={{ flex: 3, justifyContent: 'space-between', paddingHorizontal: 10 }}>
									<Text style={{ fontSize: 14, color: '#555' }}>
										<Text style={{ fontWeight: 'bold' }}>{prod.quantity}x </Text>
										<Text>{prod.product_name}</Text>
									</Text>
									<Text style={{ fontWeight: 'bold', color: '#555' }}>R$ {prod.price},90</Text>
								</View>
								<View
									style={{
										paddingHorizontal: 10,
										paddingVertical: 10,
										alignItems: 'center'
									}}
								>
									<Text style={{ fontWeight: 'bold', color: '#555' }}>Total</Text>
									<Text style={{ color: '#555' }}>R$ {prod.quantity * prod.price},00</Text>
								</View>
							</View>
						))}

						<ButtonComponent
							type="secondary"
							onPress={() => setShowItems(false)}
							buttonStyle={{ borderWidth: 0 }}
						>
							Ocultar Items
						</ButtonComponent>
					</View>
				)}
			</View>

			<View
				style={{
					width: '90%',
					borderWidth: 1,
					borderColor: '#ccc',
					paddingVertical: 5,
					paddingHorizontal: 15,
					marginVertical: 10,
					flexDirection: 'row'
				}}
			>
				<View style={{ flex: 3 }}>
					<Text style={{ paddingVertical: 10 }}>Produtos</Text>
					<Text style={{ paddingVertical: 10 }}>Entrega</Text>
					<Text style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: '#ccc', fontWeight: 'bold' }}>
						Total
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<Text style={{ paddingVertical: 10 }}>R$ {num},65</Text>
					<Text style={{ paddingVertical: 10 }}>R$ 15,00</Text>
					<Text style={{ paddingVertical: 10, borderTopWidth: 1, borderColor: '#ccc', fontWeight: 'bold' }}>
						R$ {num + 15},65
					</Text>
				</View>
			</View>

			<ButtonComponent onPress={HandleSubmit}>FINALIZAR</ButtonComponent>
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	address: state.address,
	cart: state.cart
});

export default connect(mapStateToProps, { getAddress, postOrder, deleteItemsCart })(Checkout);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	contentContainer: {
		flex: 1,
		width: width,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderColor: '#aaa'
	},
	itemContainer: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderBottomWidth: 1,
		borderColor: '#aaa'
	},
	cancelButton: {
		width: '50%',
		paddingVertical: 10,
		marginBottom: 20,
		backgroundColor: '#c52b2b',
		borderRadius: 3
	},
	cancelText: {
		textAlign: 'center',
		color: '#fff'
	}
});
