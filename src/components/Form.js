import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import UserInput from './UserInput'
import SubmitButton from './SubmitButton'

import usernameImage from './../../images/username.png'
import passwordImg from './../../images/password.png'
import hidePassLogo from './../../images/hidePassLogo.png'
import eye_black from './../../images/eye_black.png'

export default function Form(props) {
	const [usernameInput, setUsernameInput] = useState("");
	const [passwdInput, setPasswdInput] = useState("");
	const [hidePass, setHidePass] = useState(true);

	



	const changePasswdDisplay = () => {
		setHidePass(!hidePass);
	}

	const sendData = () => {
		if(usernameInput != "" && passwdInput != "") {
			//console.log(usernameInput, passwdInput);
			const xhttp = new XMLHttpRequest();

			xhttp.open("POST", "https://lalosuperwebsite.000webhostapp.com/pruebaConexionProyectoPI.php");
			xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhttp.onload = () => {
				if(xhttp.status == 200) {
					console.log(xhttp.responseText);
				}
				else {
					console.log("algo falló");
				}
			}
			xhttp.send("codigo="+usernameInput+"&nip="+passwdInput);
		} else {
			console.log("Contesta lo que se te pide, bruto!");
		}
	}

	return (
		<View style={[styles.formWrapper, props.style]}>
			<UserInput source={usernameImage}
				setInput = {setUsernameInput}
				maxLength={9}
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