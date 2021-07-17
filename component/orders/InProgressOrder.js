import React from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';

import { Linking } from 'react-native';

import { connect } from 'react-redux';
import { getOrders } from '../../redux/actions/orderActions';
import { StyleSheet, FlatList } from 'react-native';

import ButtonComponent from '../my_components/ButtonComponent';

let { width } = Dimensions.get('window');

const InProgressOrder = (props) => {
	const { navigation, orders } = props;
	const { isLoading } = props.loading;

	const HandleTest = (id) => {
		Linking.canOpenURL(
			`whatsapp://send?text=Preciso%20de%20Ajuda%20com%20meu%20Pedido%20${id}`
		).then((supported) => {
			if (supported) {
				return Linking.openURL(
					`whatsapp://send?phone=5521981510266&text=Preciso%20de%20Ajuda%20com%20meu%20Pedido%20${id}`
				);
			} else {
				return Linking.openURL(
					`https://api.whatsapp.com/send?phone=5521981510266&text=Preciso%20de%20Ajuda%20com%20meu%20Pedido%20${id}`
				);
			}
		});
	};

	return (
		<View style={styles.container}>
			{!isLoading ? (
				<FlatList
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
					data={orders}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => (
						<View>
							{item.status_name === 'Pedido Recebido' ? (
								<View style={styles.itemContainer}>
									<View style={styles.containerItems} key={item.order_id}>
										<View style={{ padding: 10 }}>
											<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
												PEDIDO #310{item.order_id}
											</Text>
											<Text>{item.status_name}</Text>
											<Text>CEP: {item.cep}</Text>
											<Text>Pagamento: {item.payment_name}</Text>
										</View>
										<View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#ccc' }}>
											<ButtonComponent
												onPress={() => HandleTest(item.order_id)}
												buttonStyle={styles.buttonStyle}
												textStyle={[ styles.textStyle, { color: 'red' } ]}
											>
												AJUDA
											</ButtonComponent>
											<ButtonComponent
												onPress={() =>
													navigation.navigate('Detalhes', {
														item,
														inProgress: true,
														id: item.order_id
													})}
												buttonStyle={styles.buttonStyle}
												textStyle={styles.textStyle}
											>
												DETALHES
											</ButtonComponent>
										</View>
									</View>
								</View>
							) : null}
						</View>
					)}
				/>
			) : (
				<ActivityIndicator style={{ paddingVertical: 13 }} size="large" color="#3E3E3E" />
			)}
		</View>
	);
};

const mapStateToProps = (state) => ({
	orders: state.order.orders,
	loading: state.loading
});

const mapDispatchToProps = { getOrders };

export default connect(mapStateToProps, mapDispatchToProps)(InProgressOrder);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fafafa'
	},
	contentContainer: {
		width: 0.9 * width,
		paddingVertical: 10
	},
	itemContainer: {
		backgroundColor: '#fff',
		marginBottom: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5
	},
	buttonStyle: {
		backgroundColor: '#fff',
		borderWidth: 0,
		width: '49%',
		margin: 1,
		padding: 10
	},
	textStyle: {
		color: '#3E3E3E',
		fontSize: 12,
		fontWeight: 'bold'
	}
});
