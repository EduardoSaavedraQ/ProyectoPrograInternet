import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function SendVoteButton(props) {
  return (
    <View style={props.style}>
      <TouchableOpacity style={styles.buttonWreapper}>
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    buttonWreapper: {
        alignSelf: "center",
        backgroundColor: "gray",
        borderRadius: 10,
    },

    text: {
        fontSize: 40
    }
})