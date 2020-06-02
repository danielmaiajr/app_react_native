import styled from 'styled-components/native';

export const Wrapper = styled.View`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #4e3188;
`;

export const Content = styled.View`
	height: 500px;
	max-height: 85%;
	width: 400px;
	max-width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-color: #fff;
`;

export const FormContent = styled.View`
	width: 80%;
	height: 100%;
	padding: 15px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

export const TitleContent = styled.View`padding: 10px 20px;`;

export const Title = styled.Text`
	text-align: center;
	color: #111;
	font-size: 24px;
	padding: 5px;
`;

export const SubTitle = styled.Text`
	text-align: center;
	color: #222;
	font-size: 14px;
	padding: 5px;
`;

export const InputContent = styled.View`
	width: 100%;
	padding: 10px;
`;

export const Input = styled.View`padding: 10px 20px;`;

export const SmallLabel = styled.Text`
	display: flex;
	justify-content: flex-end;
	font-size: 12px;
	padding-right: 10px;
`;

export const ButtonContent = styled.View`
	width: 80%;
	display: flex;
	justify-content: space-between;
	margin: 20px 0;
`;

export const PoliceContent = styled.Text`
	font-size: 10px;
	text-align: center;
	padding: 10px 0;
`;
