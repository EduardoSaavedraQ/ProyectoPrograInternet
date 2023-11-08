import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState }  from 'react'

export default function SubmitButton(props) {
	const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={props.style}>
			<TouchableOpacity style={styles.submitWrapper} onPress={props.onPress}>
				<Text style={styles.submitText}>Ingresar</Text>
			</TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  submitWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
		alignSelf: "center",
		width: "85%",
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#ffffff',
    },

  submitText: {
		position: "absolute",
		alignSelf: "center",
		color: "white",
		top: 10
	}
})