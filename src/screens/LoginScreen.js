import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Form from '../components/Form';

import bgSrc from './../../images/fondo_cucei.jpeg';
export default function LoginScreen({ navigation }) {

	const navigate = (isCounter = false) => {
		if(isCounter) {
			navigation.replace("Sala de espera del contador");
		}
		else {
			navigation.replace("Sala de espera del votante");
		}
	}

	return (
		<View style={styles.container}>
			<Image source={bgSrc} style={styles.backgroundImage}/>
			<Form style={styles.form} action={navigate}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#050593"
	},

	backgroundImage: {
		position: "absolute",
		flex: 1,
		alignSelf: "center",
		height: "100%",
		width: "150%",
		resizeMode: "stretch",
		opacity: 0.8
	},

	form: {
		alignSelf: "center",
		width: "100%",
		top: "65%"
	}
});