import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import { getProductHome } from '../redux/actions/productActions';

import { navRoutes } from '../routes/navRoutes';

import Product from '../component/Product';

const HomeScreen = (props) => {
	const { products, navigation } = props;
	const { isLoading } = props.loading;

	const [ refreshing, setRefreshing ] = useState(false);

	useEffect(
		() => {
			props.getProductHome('');
		},
		[ props.getProductHome ]
	);

	const HandleRefresh = () => {
		setRefreshing(true);
		props.getProductHome('');
		setRefreshing(false);
	};
	return (
		<View style={styles.mainContent}>
			{!isLoading ? (
				<FlatList
					ListHeaderComponent={() => (
						<View>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 5 }}
							>
								{navRoutes.map((item, i) => (
									<TouchableOpacity
										style={{ flex: 1, marginHorizontal: 5 }}
										key={i}
										onPress={() =>
											navigation.navigate('Section', { name: item.name, path: item.path })}
									>
										<View
											style={{
												paddingHorizontal: 60,
												paddingVertical: 45,
												borderRadius: 5,
												backgroundColor: '#EA1D2C'
											}}
										/>
										<View style={{ padding: 4 }}>
											<Text style={{ textAlign: 'center', fontSize: 12 }}>{item.name}</Text>
										</View>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
					)}
					renderItem={({ item }) => (
						<View>
							<Text style={styles.mainTitle}>{item.name}</Text>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{ padding: 5 }}
							>
								{products.map(
									(product) =>
										item.route === product.section && <Product key={product.id} product={product} />
								)}
							</ScrollView>
						</View>
					)}
					showsVerticalScrollIndicator={false}
					data={navRoutes}
					keyExtractor={(item) => item.route}
					refreshing={refreshing}
					onRefresh={HandleRefresh}
				/>
			) : (
				<ActivityIndicator style={{ paddingVertical: 13 }} size="large" color="#3E3E3E" />
			)}
		</View>
	);
};

const mapStateToProps = (state) => ({
	products: state.product.home,
	loading: state.loading
});

export default connect(mapStateToProps, { getProductHome })(HomeScreen);

const styles = StyleSheet.create({
	mainContent: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	mainTitle: {
		paddingVertical: 5,
		paddingHorizontal: 20,
		fontWeight: 'bold',
		fontSize: 18
	}
});
