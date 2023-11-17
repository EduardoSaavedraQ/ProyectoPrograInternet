import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Vote({value, to_do, label, isSelected}) {

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.checboxFrame}>
				<TouchableOpacity onPress={() => to_do(value)}>
					{ isSelected?
							<View style={[styles.checkboxSelectedPadding, {backgroundColor: "yellow"}]}/>
						:
							<View style={[styles.checkboxSelectedPadding, {backgroundColor: "rgba(255, 255, 255, 0.0)"}]}/>
					}
				</TouchableOpacity>

				{/* <TouchableOpacity onPress={logIsSelected}>
					<Text>Prueba</Text>
				</TouchableOpacity> */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		//backgroundColor: "red",
		//position: "absolute",
		//alignItems: "center",
		width: "100%",
		//height: 30
	},

	label: {
		//position: "absolute",
		fontSize: 50,
		left: 65,
		color: "white"
	},

	checboxFrame: {
		//position: "absolute",
		borderWidth: 4,
		borderColor: "red",
		width: 50,
		height: 50,
		top: -58,
		left: "85%"
	},

	checkboxSelectedPadding: {
		//position: "absolute",
		//flex: 1,
		//backgroundColor: "yellow",
		width: 35,
		height: 35,
		left: 2.9,
		top: 2,
	}
})