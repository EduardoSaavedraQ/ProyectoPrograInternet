import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function SendVoteButton({ style, valueToSend, toDoAfterShipping }) {
  const sendData = () => {
    //console.log(valueToSend);

    fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/actualizar_votos.php", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vote: valueToSend
      })
    })
    .then(response => response.json())
    .then(message => console.log(message))
    .catch(error => console.error(error));
  }

  return (
    <View style={style}>
      <TouchableOpacity style={styles.buttonWreapper} onPress={() => {
        sendData();
        toDoAfterShipping();
      }}>
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