import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import UserInput from './UserInput';
import SubmitButton from './SubmitButton';

import usernameImage from './../../images/username.png';
import passwordImg from './../../images/password.png';
import hidePassLogo from './../../images/hidePassLogo.png';
import eye_black from './../../images/eye_black.png';

const ACCESS_DENIED = "Código y/o nip incorrectos";
const ACCESS_GRANTED = "Acceso concedido";

export default function Form(props) {
	const [usercodeInput, setUsercodeInput] = useState("");
	const [passwdInput, setPasswdInput] = useState("");
	const [hidePass, setHidePass] = useState(true);

	const changePasswdDisplay = () => {
		setHidePass(!hidePass);
	}

	const sendData = () => {
		if(usercodeInput !== "" && passwdInput !== "")
			fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/conexion_bd_inicio_de_sesion.php", {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					codigo: usercodeInput,
					nip: passwdInput
				})
			})
			.then(response => response.json())
			.then(json => {
				if(json == null) {
					throw (ACCESS_DENIED);
				}
				console.log(json);
				Alert.alert(ACCESS_GRANTED);
			})
			.catch((error) => {
				console.log(error);
				if(error == ACCESS_DENIED) {
					Alert.alert(ACCESS_DENIED);
				}
			});
	}

	return (
		<View style={[styles.formWrapper, props.style]}>
			<UserInput source={usernameImage}
				setInput = {setUsercodeInput}
				maxLength={9}
				keyboardType="numeric"
				placeholder='Ingrese su código'
				autoCapitalize={'none'}
				returnKeyType={'done'}
				autoCorrect={false} />

			<TouchableOpacity onPress={changePasswdDisplay}  style={styles.showPassButton}>
				<Image  style={styles.showPassIcon} source={hidePass? eye_black: hidePassLogo}/>
			</TouchableOpacity>
			<UserInput style={styles.passwdField} source={passwordImg}
				setInput = {setPasswdInput}
				maxLength={15}
				secureTextEntry={hidePass}
				placeholder='Ingrese su NIP'
				returnKeyType={'done'}
				autoCapitalize={'none'}
				autoCorrect={false} />
			
			<SubmitButton style={styles.submitButton} onPress={sendData}/>
		</View>
	)
}

const styles = StyleSheet.create({
	passwdField: {
		top: 20,
		zIndex: 0
	},

	showPassButton: {
		position: "absolute",
		top: 70,
		right: 40,
		zIndex: 1
	},

	showPassIcon: {
		width: 22,
		height: 22
	},

	submitButton: {
		top: 40
	}

})