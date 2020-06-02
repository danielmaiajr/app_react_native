import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navRoutes } from '../routes/navRoutes';

import Product from './Product';

import { getProduct } from '../redux/actions/productActions';
import styled from 'styled-components/native';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class Home extends Component {
	componentDidMount() {
		this.props.getProduct('');
	}

	render() {
		const { products } = this.props;
		return (
			<SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
				<Text>asdasd</Text>
				<MainContent>
					<ScrollView showsVerticalScrollIndicator={false} style={{}}>
						{navRoutes.map((route, i) => (
							<View key={i}>
								<MainTitle>{route.name}</MainTitle>
								<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
									{products.map(
										(product) =>
											route.route === product.section ? (
												<Product key={product.product_id} product={product} />
											) : null
									)}
								</ScrollView>
							</View>
						))}
					</ScrollView>
				</MainContent>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.product
});

export default connect(mapStateToProps, { getProduct })(Home);

const MainContent = styled.View`
	background-color: #fafafa;
	color: #555;
	flex: 1;
`;

const MainTitle = styled.Text`
	padding: 10px 30px;
	font-weight: bold;
	font-size: 20px;
`;
