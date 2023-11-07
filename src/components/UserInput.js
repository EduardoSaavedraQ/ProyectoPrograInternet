import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import React, {useState} from 'react'
import PropTypes from 'prop-types'

export default function UserInput(props) {
  return (
	<View style={props.style}>
		<Image source={props.source}
				style={styles.inlineImg} />
		<TextInput onChangeText={(input) => props.setInput(input)} style={styles.input}
				placeholder={props.placeholder}
				maxLength={props.maxLength}
				secureTextEntry={props.secureTextEntry}
				autoCorrect={props.autoCorrect}
				autoCapitalize={props.autoCapitalize}
				returnKeyType={props.returnKeyType}
				placeholderTextColor='white'
				underlineColorAndroid='transparent' />
	</View>
  )
}

UserInput.propTypes = {
	source: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	maxLength: PropTypes.number.isRequired,
	secureTextEntry: PropTypes.bool,
	autoCorrect: PropTypes.bool,
	autoCapitalize: PropTypes.string,
	returnKeyType: PropTypes.string,
}

const styles = StyleSheet.create({
	inputWrapper: {
		backgroundColor: "red",
	},

	inlineImg: {
		position: "absolute",
		zIndex: 99,
		width: 22,
		height: 22,
		left: 43,
		top: 10,
	},

	input: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		alignSelf: "center",
		width: "85%",
		height: 40,
		marginHorizontal: 20,
		//marginBottom: 30,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#ffffff',
	},
})