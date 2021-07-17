import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

import { getOrder, cancelOrder } from '../../redux/actions/orderActions';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

let { width } = Dimensions.get('window');

import ButtonComponent from '../my_components/ButtonComponent';
import BottomModal from '../my_components/BottomModal';

const Details = (props) => {
	const { item, inProgress, id } = props.route.params;
	const { orderItems, getOrder, cancelOrder, navigation } = props;
	const { isLoading } = props.loading;

	const [ isModalVisible, setModalVisible ] = useState(false);

	const toggleModal = () => setModalVisible(!isModalVisible);

	useEffect(() => getOrder(item.order_id), [ getOrder ]);

	const handleOnCancel = () => {
		toggleModal();
		cancelOrder(id, navigation);
	};

	let num = 0;
	if (orderItems.length > 0) {
		orderItems.forEach((n) => (num += n.quantity * n.price));
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			{!isLoading ? (
				<View style={styles.container}>
					<View style={{ width: '100%' }}>
						<Text
							style={{
								textAlign: 'right',
								paddingVertical: 10,
								paddingHorizontal: 20,
								fontWeight: 'bold',
								color: '#555'
							}}
						>
							Total: R$ {num},00
						</Text>
					</View>
					<FlatList
						contentContainerStyle={styles.contentContainer}
						showsVerticalScrollIndicator={false}
						data={orderItems}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item, index }) => (
							<View>
								{orderItems.length > 0 && (
									<View style={styles.itemContainer}>
										<View
											style={{
												flex: 0.5,
												justifyContent: 'center',
												alignItems: 'center'
											}}
										>
											<Image source={{ uri: item.image_url }} style={{ width: 30, height: 30 }} />
										</View>
										<View
											style={{ flex: 3, justifyContent: 'space-between', paddingHorizontal: 10 }}
										>
											<Text style={{ fontSize: 14, color: '#555' }}>
												<Text style={{ fontWeight: 'bold' }}>{item.quantity}x </Text>
												<Text>{item.product_name}</Text>
											</Text>
											<Text style={{ fontWeight: 'bold', color: '#555' }}>
												R$ {item.price},90
											</Text>
										</View>
										<View
											style={{
												paddingHorizontal: 10,
												paddingVertical: 10,
												alignItems: 'center'
											}}
										>
											<Text style={{ fontWeight: 'bold', color: '#555' }}>Total</Text>
											<Text style={{ color: '#555' }}>R$ {item.total},00</Text>
										</View>
									</View>
								)}
							</View>
						)}
					/>
					{inProgress && (
						<View>
							<BottomModal
								isModalVisible={isModalVisible}
								setModalVisible={setModalVisible}
								onRightPress={handleOnCancel}
								title="Essa ação irá cancelar o pedido. Deseja continuar?"
							/>
							<ButtonComponent
								buttonStyle={{ paddingVertical: 10, marginBottom: 25 }}
								onPress={toggleModal}
								type="secondary"
							>
								Cancelar Pedido
							</ButtonComponent>
						</View>
					)}
				</View>
			) : (
				<ActivityIndicator style={{ paddingVertical: 13 }} size="large" color="#3E3E3E" />
			)}
		</View>
	);
};

const mapStateToProps = (state) => ({
	orderItems: state.order.orderItems,
	loading: state.loading
});

const mapDispatchToProps = { getOrder, cancelOrder };

export default connect(mapStateToProps, mapDispatchToProps)(Details);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	contentContainer: {
		width: width,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderColor: '#ddd'
	},
	itemContainer: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderBottomWidth: 1,
		borderColor: '#ddd'
	}
});
