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
			<Text style={{ textAlign: 'center', height: 47, padding: 5 }}>{product.product_name}</Text>
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
	padding: 20px;
	justify-content: flex-end;
	width: 170px;
	margin: 0 5px;
	font-size: 16px;
	border-radius: 4px;
`;
