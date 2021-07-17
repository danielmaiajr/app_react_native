import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

const inicialValues = {
	color: '#fff',
	backgroundColor: '#EA1D2C',
	secondaryColor: '#555',
	secondaryBackgroundColor: '#fff',
	loadingColor: '4e3188'
};

export const ButtonComponent = ({
	children,
	isLoading = false,
	onPress,
	type = 'primary',
	activityColor = inicialValues.loadingColor,
	buttonStyle,
	textStyle
}) => {
	const textType = `${type}Text`;

	return (
		<Fragment>
			{isLoading ? (
				<ActivityIndicator style={{ paddingVertical: 13 }} size="large" color={activityColor} />
			) : (
				<TouchableOpacity style={[ styles[type], buttonStyle ]} onPress={onPress}>
					<Text style={[ styles[textType], textStyle ]}>{children}</Text>
				</TouchableOpacity>
			)}
		</Fragment>
	);
};

export default ButtonComponent;

const styles = StyleSheet.create({
	primary: {
		width: '90%',
		padding: 15,
		margin: 5,
		backgroundColor: inicialValues.backgroundColor,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: inicialValues.backgroundColor
	},

	primaryText: {
		textAlign: 'center',
		color: inicialValues.color
	},

	secondary: {
		width: '90%',
		padding: 15,
		margin: 5,
		backgroundColor: inicialValues.secondaryBackgroundColor,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#aaa'
	},
	secondaryText: {
		textAlign: 'center',
		color: inicialValues.secondaryColor
	}
});
