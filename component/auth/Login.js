import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

import TextInputComponent from '../my_components/TextInputComponent';
import ButtonComponent from '../my_components/ButtonComponent';

const validationSchema = yup.object().shape({
	email: yup.string().email('*Email Inválido').required('*Email Obrigatório'),
	password: yup.string().required('*Senha Obrigatória').min(3, '*Entre 3 e 20 caracteres')
});

const Login = (props) => {
	const { loginUser } = props;
	const { isLoading } = props.loading;

	const loginErrors = props.errors;

	const HandleOnSubmit = ({ email, password }) => {
		loginUser({
			email,
			password
		});
	};

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={(values) => HandleOnSubmit(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View style={styles.container}>
					{loginErrors.login && (
						<View style={{ width: '90%' }}>
							<Text style={styles.errorsText}>{loginErrors.login}</Text>
						</View>
					)}

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
						autoCompleteType="password"
						secureTextEntry={true}
					/>

					<ButtonComponent onPress={handleSubmit} isLoading={isLoading}>
						ENTRAR
					</ButtonComponent>

					<Text>ou</Text>

					<ButtonComponent onPress={() => {}} type="secondary">
						ENTRAR COM CELULAR
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

export default connect(mapStateToProps, { loginUser })(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});
