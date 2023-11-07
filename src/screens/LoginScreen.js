import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

import bgSrc from './../../images/fondo_cucei.jpeg';
export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Image source={bgSrc} style={styles.backgroundImage}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#050593"
	},

	backgroundImage: {
		flex: 1,
		width: "159%",
		right: "29%",
		resizeMode: "stretch",
		opacity: 0.8
	}
});