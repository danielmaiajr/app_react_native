import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { getOrder, getOrders, cancelOrder } from '../redux/actions/orderActions';
import { ScrollView, StyleSheet } from 'react-native';

const OldOrder = (props) => {
	const { navigation, getOrders, orders } = props;

	useEffect(
		() => {
			getOrders();
		},
		[ getOrders ]
	);

	return (
		<ScrollView>
			<View style={styles.container}>
				{orders.map((item) => (
					<View style={styles.containerItems}>
						<Text>{item.status_name}</Text>
						<Text>{item.cep}</Text>
						<Text>Pagamento: {item.payment_name}</Text>
						<Text>{item.num}</Text>
						<View style={styles.itemButton}>
							<TouchableOpacity style={styles.button}>
								<Text style={styles.buttonText}>Ajuda</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.button}>
								<Text style={styles.buttonText}>Detalhes</Text>
							</TouchableOpacity>
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({
	orders: state.order.orders,
	orderItems: state.order.orderItems,
	loading: state.loading
});

const mapDispatchToProps = { getOrder, getOrders, cancelOrder };

export default connect(mapStateToProps, mapDispatchToProps)(OldOrder);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	containerItems: {
		backgroundColor: '#fff',
		flex: 1,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 3
	},
	itemButton: {
		flex: 1,
		flexDirection: 'row'
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10
	},
	buttonText: {
		color: '#4e3188',
		fontWeight: 'bold'
	}
});
