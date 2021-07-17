import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { getOrders } from '../redux/actions/orderActions';

import OldOrder from '../component/orders/OldOrder';
import InProgressOrder from '../component/orders/InProgressOrder';

const Orders = (props) => {
	const { navigation, getOrders, orders } = props;
	const [ page, setPage ] = useState(1);

	useEffect(
		() => {
			const unsubscribe = navigation.addListener('focus', () => {
				getOrders();
			});

			return unsubscribe;
		},
		[ navigation ]
	);

	useEffect(
		() => {
			setPage(1);
		},
		[ getOrders ]
	);

	return (
		<View style={styles.container}>
			<View style={styles.nav}>
				<TouchableOpacity style={styles.titles} onPress={() => setPage(1)}>
					<Text style={page === 1 ? styles.activeTitleText : styles.titleText}>EM ANDAMENTO</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.titles} onPress={() => setPage(2)}>
					<Text style={page === 2 ? styles.activeTitleText : styles.titleText}>ANTERIORES</Text>
				</TouchableOpacity>
			</View>
			{page === 1 ? (
				<InProgressOrder navigation={navigation} orders={orders} />
			) : (
				<OldOrder navigation={navigation} orders={orders} />
			)}
		</View>
	);
};

const mapStateToProps = (state) => ({
	orders: state.order.orders,
	loading: state.loading
});

const mapDispatchToProps = { getOrders };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1
	},
	nav: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		height: 60,
		borderBottomWidth: 1,
		borderColor: '#ccc'
	},
	titles: {
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleText: {
		fontSize: 14,
		fontWeight: 'normal',
		color: '#ccc'
	},
	activeTitleText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#3E3E3E'
	}
});
