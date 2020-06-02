import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
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
	ColorButton,
	WhiteButton,
	PoliceContent
} from './style';

import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

const Register = (props) => {
	const [ fields, setFields ] = useState({});
	const { history } = props;
	const { isAuthenticated } = props.auth;

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/home');
		}
	});

	const onChange = (e) => {
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			first_name: fields.name,
			email: fields.email,
			password: fields.password
		};
		console.log(newUser);
		props.registerUser(newUser, history);
	};

	const HandleLink = (e) => {
		e.preventDefault();
		history.push('/login');
	};

	return (
		<Wrapper>
			<Content>
				<FormContent>
					<TitleContent>
						<Title>Bem Vindo ao Market</Title>
						<SubTitle>Precisamos de algumas informações para começar</SubTitle>
					</TitleContent>
					<InputContent>
						<Input>
							<TextField
								fullWidth
								type="text"
								placeholder="Nome"
								name="name"
								value={fields.name}
								onChange={onChange}
							/>
						</Input>
						<Input>
							<TextField
								fullWidth
								type="email"
								placeholder="Email"
								name="email"
								value={fields.email}
								onChange={onChange}
							/>
						</Input>
						<Input>
							<TextField
								fullWidth
								type="password"
								placeholder="Senha"
								name="password"
								value={fields.password}
								onChange={onChange}
							/>
						</Input>
						<Input>
							<TextField
								fullWidth
								type="password"
								placeholder="Confirmar Senha"
								name="password"
								value={fields.password}
								onChange={onChange}
							/>
						</Input>
						<SmallLabel>Reenviar ativação?</SmallLabel>
					</InputContent>
					<ButtonContent>
						<ColorButton variant="contained" color="primary" disableElevation onClick={onSubmit}>
							Criar Conta
						</ColorButton>
						<WhiteButton variant="outlined" disableElevation onClick={HandleLink}>
							Login
						</WhiteButton>
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

export default connect(mapStateToProps, { registerUser })(Register);
