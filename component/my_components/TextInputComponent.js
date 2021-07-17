import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export const TextInputComponent = ({
	label,
	placeholder,
	name,
	values,
	handleBlur,
	handleChange,
	touched,
	errors,
	style,
	...props
}) => {
	return (
		<Fragment>
			{label && (
				<View style={{ width: '90%', marginTop: 0 }}>
					<Text style={styles.labelText}>{placeholder}</Text>
				</View>
			)}
			<TextInput
				placeholder={placeholder}
				style={[ styles.inputContainer, errors[name] ? { borderColor: 'red' } : style ]}
				value={values[name]}
				onBlur={handleBlur(name)}
				onChangeText={handleChange(name)}
				{...props}
			/>
			{touched[name] &&
			errors[name] && (
				<View style={{ width: '90%' }}>
					<Text style={styles.errorsText}>{errors[name]}</Text>
				</View>
			)}
		</Fragment>
	);
};
export default TextInputComponent;

const styles = StyleSheet.create({
	inputContainer: {
		width: '90%',
		borderWidth: 1,
		padding: 15,
		borderColor: '#3E3E3E',
		borderRadius: 5,
		marginVertical: 5
	},
	labelText: {
		fontSize: 12,
		textAlign: 'left'
	},
	errorsText: {
		fontSize: 10,
		color: 'red',
		textAlign: 'left'
	}
});
