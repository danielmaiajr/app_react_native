import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

import TextInputComponent from '../my_components/TextInputComponent';
import ButtonComponent from '../my_components/ButtonComponent';

const validationSchema = yup.object().shape({
	first_name: yup.string().required('*Nome Obrigatório'),
	email: yup.string().email('*Email Inválido').required('*Email Obrigatório'),
	password: yup.string().required('*Senha Obrigatória').min(3, '*Entre 3 e 20 caracteres'),
	confirm: yup
		.string()
		.required('*Senha Obrigatória')
		.min(3, '*Entre 3 e 20 caracteres')
		.test('confirm', '*Senhas não coincidem. Tente novamente!', function(value) {
			return this.parent.password === value;
		})
});

const Register = (props) => {
	const { registerUser, navigation } = props;
	const { isLoading } = props.loading;

	const registerErrors = props.errors;

	const HandleOnSubmit = ({ first_name, email, password }) => {
		registerUser(
			{
				first_name,
				email,
				password
			},
			navigation
		);
	};

	const HandleClickLogin = () => {
		navigation.goBack();
		navigation.navigate('Login');
	};

	return (
		<Formik
			initialValues={{ first_name: '', email: '', password: '', confirm: '' }}
			validationSchema={validationSchema}
			onSubmit={(values) => HandleOnSubmit(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View style={styles.container}>
					{registerErrors.register && (
						<View style={{ width: '90%' }}>
							<Text style={styles.errorsText}>{registerErrors.register}</Text>
						</View>
					)}

					<TextInputComponent
						placeholder="Nome"
						name="first_name"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
					/>

					<TextInputComponent
						placeholder="Email"
						name="email"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						autoCompleteType="email"
					/>

					<TextInputComponent
						placeholder="Senha"
						name="password"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						secureTextEntry={true}
					/>

					<TextInputComponent
						placeholder="Confirmar Senha"
						name="confirm"
						values={values}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						secureTextEntry={true}
					/>
					<ButtonComponent isLoading={isLoading} onPress={handleSubmit}>
						REGISTER
					</ButtonComponent>

					<Text>ou</Text>

					<ButtonComponent onPress={HandleClickLogin} type="secondary">
						LOGIN
					</ButtonComponent>
				</View>
			)}
		</Formik>
	);
};

const mapStateToProps = (state) => ({
	loading: state.loading,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});
