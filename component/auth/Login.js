import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { TextInput } from 'react-native';

import {
	Wrapper,
	Content,
	FormContent,
	TitleContent,
	Title,
	SubTitle,
	InputContent,
	SmallLabel,
	Input,
	ButtonContent,
	PoliceContent
} from './style';

import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

const Login = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { history } = props;

	const HandleOnSubmit = () => {
		props.loginUser({
			email,
			password
		});
	};

	const HandleLink = (e) => {
		e.preventDefault();
		history.push('/register');
	};

	return (
		<Wrapper>
			<Content>
				<FormContent>
					<TitleContent>
						<Title>Bem Vindo ao Market</Title>
						<SubTitle>Faça Login para começar</SubTitle>
					</TitleContent>
					<InputContent>
						<Input>
							<TextInput placeholder="Email" value={email || ''} onChangeText={(val) => setEmail(val)} />
						</Input>
						<Input>
							<TextInput
								placeholder="Senha"
								name="password"
								value={password}
								onChangeText={(val) => setPassword(val)}
							/>
						</Input>
						<SmallLabel>Esqueceu a senha?</SmallLabel>
					</InputContent>
					<ButtonContent>
						<Button
							onPress={HandleOnSubmit}
							title="Login"
							color="#841584"
							accessibilityLabel="Learn more about this purple button"
						/>
					</ButtonContent>
					<PoliceContent>
						*Ao continuar, você concorda com os Termos de Serviço e com a Política de Privacidade do Market
					</PoliceContent>
				</FormContent>
			</Content>
		</Wrapper>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
