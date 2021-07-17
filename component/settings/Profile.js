import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { putCustomer } from '../../redux/actions/customerAction';

import { Formik } from 'formik';
import * as yup from 'yup';

import TextInputComponent from '../my_components/TextInputComponent';
import ButtonComponent from '../my_components/ButtonComponent';

const validationSchema = yup.object().shape({
	first_name: yup.string().required('*Nome Obrigatório'),
	last_name: yup.string(),
	cpf: yup.string(),
	phone: yup.string().required('*Telefone Obrigatório')
});

const Profile = (props) => {
	const { putCustomer, customer, navigation } = props;
	const { isLoading } = props.loading;

	const initialValues = {
		email: customer.email ? customer.email.toString() : '',
		first_name: customer.first_name ? customer.first_name.toString() : '',
		last_name: customer.last_name ? customer.last_name.toString() : '',
		cpf: customer.cpf ? customer.cpf.toString() : '',
		phone: customer.phone ? customer.phone.toString() : ''
	};

	const HandleOnSubmit = ({ first_name, last_name, cpf, phone }) => {
		putCustomer(
			{
				first_name,
				last_name,
				cpf,
				phone
			},
			navigation
		);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => HandleOnSubmit(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<ScrollView contentContainerStyle={styles.container}>
					<TextInputComponent
						label
						placeholder="Email"
						name="email"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						editable={false}
						style={{ color: '#ccc' }}
					/>

					<TextInputComponent
						label
						placeholder="Nome"
						name="first_name"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
					/>

					<TextInputComponent
						label
						placeholder="Sobrenome"
						name="last_name"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
					/>

					<TextInputComponent
						label
						placeholder="CPF"
						name="cpf"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						keyboardType="numeric"
					/>

					<TextInputComponent
						label
						placeholder="Telefone"
						name="phone"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						keyboardType="numeric"
					/>

					<ButtonComponent onPress={handleSubmit} isLoading={isLoading}>
						SALVAR
					</ButtonComponent>
				</ScrollView>
			)}
		</Formik>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	customer: state.customer
});

const mapDispatchToProps = { putCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	title: {
		textAlign: 'center',
		paddingBottom: 10,
		fontSize: 20,
		fontWeight: 'bold'
	},
	formContainer: {
		backgroundColor: '#fff',
		padding: 20,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5
	},
	input: {
		color: '#aaa',
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#aaa',
		borderRadius: 5,
		fontSize: 16,
		marginBottom: 30
	},
	button: {
		backgroundColor: '#3E3E3E',
		padding: 20
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 16
	}
});
