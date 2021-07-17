import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Searchbar } from 'react-native-paper';

import { getSearchPageResults } from '../redux/actions/searchActions';

import CartItem from '../component/ProductItemList';

const SearchScreen = (props) => {
	const { search, getSearchPageResults, navigation, isLoading } = props;
	const [ value, onChangeText ] = useState(null);
	const [ results, setResults ] = useState([]);

	useEffect(
		() => {
			const unsubscribe = navigation.addListener('blur', () => {
				setResults([]);
			});

			return unsubscribe;
		},
		[ navigation ]
	);

	useEffect(
		() => {
			setResults(search);
		},
		[ search ]
	);

	const handleSubmit = () => {
		getSearchPageResults(value, 1);
	};

	return (
		<View style={styles.container}>
			<View style={{ borderBottomWidth: 1, borderColor: '#fafafa' }}>
				<Searchbar
					placeholder="Pesquisar ..."
					onChangeText={(text) => onChangeText(text)}
					value={value}
					inputStyle={{ padding: 15 }}
					onSubmitEditing={handleSubmit}
				/>
				{/* <TextInput
					placeholder="Pesquisar..."
					style={styles.input}
					onChangeText={(text) => onChangeText(text)}
					value={value}
					onSubmitEditing={handleSubmit}
				/> */}
			</View>
			<View style={styles.resultsContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" style={{ flex: 1 }} color="#3E3E3E" />
				) : (
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 5 }}>
						{results.length > 0 ? results.map((prod, i) => <CartItem product={prod} key={i} />) : null}
					</ScrollView>
				)}
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	search: state.search.searchPage,
	isLoading: state.loading.isLoading
});

const mapDispatchToProps = {
	getSearchPageResults
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

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
