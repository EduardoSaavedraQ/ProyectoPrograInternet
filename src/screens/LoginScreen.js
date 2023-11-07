import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import UserInput from '../components/UserInput';
import Form from '../components/Form';

import bgSrc from './../../images/fondo_cucei.jpeg';
export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Image source={bgSrc} style={styles.backgroundImage}/>
			<Form style={styles.form}/>
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