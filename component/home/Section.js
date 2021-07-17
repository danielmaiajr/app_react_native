import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { getProductSection } from '../../redux/actions/productActions';

import CartItem from '../ProductItemList';

const Section = (props) => {
	const { name, path } = props.route.params;
	const { products, getProductSection, isLoading } = props;
	console.log(products);

	const [ page, setPage ] = useState(1);

	useEffect(
		() => {
			getProductSection(path, page);
		},
		[ getProductSection ]
	);

	return (
		<View style={styles.container}>
			<View
				style={{
					borderBottomWidth: 1,
					alignItems: 'center',
					borderColor: '#eee',
					padding: 10
				}}
			>
				<Text style={{ textTransform: 'uppercase' }}>{name}</Text>
			</View>
			<View style={styles.resultsContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" style={{ flex: 1 }} color="#3E3E3E" />
				) : (
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 5 }}>
						{products.length > 0 ? products.map((prod, i) => <CartItem product={prod} key={i} />) : null}
					</ScrollView>
				)}
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	products: state.product.section,
	isLoading: state.loading.isLoading
});

export default connect(mapStateToProps, { getProductSection })(Section);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	resultsContainer: {
		backgroundColor: '#fafafa',
		flex: 1
	},
	input: {
		color: '#aaa',
		padding: 15,
		margin: 15,
		borderWidth: 1,
		borderColor: '#aaa',
		borderRadius: 5,
		fontSize: 16
	}
});
