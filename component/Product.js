import React from 'react';
import { Text, Image, View } from 'react-native';

import Counter from './Counter';
import styled from 'styled-components/native';

const Product = (props) => {
	const { product } = props;

	return (
		<ProductContent>
			<View>
				<Image
					source={{
						uri: product.image_url
					}}
					style={{ height: 100, width: 100 }}
				/>
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
				<Text
					style={{
						fontWeight: 'bold',
						color: '#58595b'
					}}
				>
					R${' '}
				</Text>
				<Text
					style={{
						color: '#58595b',
						fontWeight: 'bold',
						fontSize: 24,
						letterSpacing: 1
					}}
				>
					{product.price}
				</Text>
				<Text
					style={{
						letterSpacing: 1,
						fontWeight: 'bold',
						color: '#58595b'
					}}
				>
					,98
				</Text>
			</View>
			<View style={{ justifyContent: 'center', height: 60, margin: 10 }}>
				<Text
					style={{
						textAlign: 'center',
						color: '#58595b',
						letterSpacing: 0.5
					}}
				>
					{product.product_name}
				</Text>
			</View>
			<Counter product={product} />
		</ProductContent>
	);
};

export default Product;

const ProductContent = styled.View`
	background-color: white;
	border: solid 1px #ddd;
	color: #818385;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	justify-content: flex-end;
	width: 170px;
	margin: 0 5px;
	font-size: 16px;
	border-radius: 4px;
`;
