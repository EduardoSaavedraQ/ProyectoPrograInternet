import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function StartVotationButton({ style, onPress }) {
  return (
    <View style={style}>
        <TouchableOpacity style={styles.buttonWreapper} onPress={onPress}>
            <Text style={styles.textButton}>Comenzar la votación</Text>
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

    textButton: {
        fontSize: 40
    }
});