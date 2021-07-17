import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import { connect } from 'react-redux';
import { postAddress, putAddress } from '../../redux/actions/addressActions';

import TextInputComponent from '../my_components/TextInputComponent';
import ButtonComponent from '../my_components/ButtonComponent';

const validationSchema = yup.object().shape({
	cep: yup.string().required('*CEP Obrigatório'),
	neightborhood: yup.string().required('*Bairro Obrigatório'),
	street: yup.string().required('*Rua Obrigatório'),
	num: yup.string().required('*Número Obrigatório')
});

const AddAddress = (props) => {
	const { postAddress, putAddress, navigation } = props;
	const { isLoading } = props.loading;
	const { params } = props.route;

	let initialValues;
	if (params.item) {
		initialValues = params.item;
		initialValues.cep = initialValues.cep.toString();
		initialValues.num = initialValues.num.toString();
	} else {
		initialValues = {
			cep: '',
			neightborhood: '',
			street: '',
			num: ''
		};
	}

	const HandleOnSubmit = (values) => {
		if (params.route === 'post') postAddress(values, navigation);
		if (params.route === 'put') putAddress(values, navigation);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => HandleOnSubmit(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
				return (
					<ScrollView contentContainerStyle={styles.container}>
						<TextInputComponent
							label
							placeholder="CEP"
							name="cep"
							values={values}
							handleBlur={handleBlur}
							handleChange={handleChange}
							touched={touched}
							errors={errors}
							keyboardType="numeric"
						/>

						<TextInputComponent
							label
							placeholder="Bairro"
							name="neightborhood"
							values={values}
							handleBlur={handleBlur}
							handleChange={handleChange}
							touched={touched}
							errors={errors}
						/>

						<TextInputComponent
							label
							placeholder="Rua"
							name="street"
							values={values}
							handleBlur={handleBlur}
							handleChange={handleChange}
							touched={touched}
							errors={errors}
						/>

						<TextInputComponent
							label
							placeholder="Número"
							name="num"
							values={values}
							handleBlur={handleBlur}
							handleChange={handleChange}
							touched={touched}
							errors={errors}
							keyboardType="numeric"
						/>

						{params.route === 'post' ? (
							<ButtonComponent onPress={handleSubmit} isLoading={isLoading}>
								ADICIONAR
							</ButtonComponent>
						) : (
							<ButtonComponent onPress={handleSubmit} isLoading={isLoading}>
								SALVAR
							</ButtonComponent>
						)}
					</ScrollView>
				);
			}}
		</Formik>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	errors: state.errors
});

export default connect(mapStateToProps, { postAddress, putAddress })(AddAddress);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});
