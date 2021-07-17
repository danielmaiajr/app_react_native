import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import axios from 'axios';

//import { Linking } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import TextInputComponent from '../my_components/TextInputComponent';
import ButtonComponent from '../my_components/ButtonComponent';

const validationSchema = yup.object().shape({
	cep: yup.string().required('*Obrigatório')
});

const VerifyCep = () => {
	const [ cepResponse, setCepResponse ] = useState(null);

	/* const HandleTest = () => {
		Linking.canOpenURL('whatsapp://send?text=oi').then((supported) => {
			if (supported) {
				return Linking.openURL('whatsapp://send?phone=5521981510266&text=Oi');
			} else {
				return Linking.openURL('https://api.whatsapp.com/send?phone=5521981510266&text=Oi');
			}
		});
	}; */

	const HandleCheck = ({ cep }) => {
		console.log(cep);
		axios
			.get(`/api/checkcep/${cep}`)
			.then((res) => {
				setCepResponse(res.data.cep);
			})
			.catch((err) => {
				setCepResponse(err.response.data.cep);
			});
	};

	return (
		<Formik
			initialValues={{ cep: '' }}
			validationSchema={validationSchema}
			onSubmit={(values) => HandleCheck(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View style={styles.container}>
					<TextInputComponent
						placeholder="Consulte seu CEP ..."
						name="cep"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
					/>

					<ButtonComponent onPress={handleSubmit}>CONSULTAR</ButtonComponent>
					{cepResponse && <Text>{cepResponse}</Text>}
				</View>
			)}
		</Formik>
	);
};
export default VerifyCep;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});
