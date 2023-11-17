import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import EscudoCuceiSrc from './../../images/EscudoCucei.png'

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.pantalla}>
      <Text  style={{fontSize: 45, textAlign: "center"}}>Sistema de votación</Text>
      <Image
        style={styles.EscudoCucei}
        source={EscudoCuceiSrc}
      />
      <TouchableOpacity style={styles.BotonIniciar} onPress={() => navigation.navigate('Inicio de sesión')}>
        <View>
          <Text style={{fontSize: 45}}>Iniciar</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  BotonIniciar: {
    backgroundColor: "orange",
    alignSelf: "center",
    borderRadius: 20,
    //top: 25
    top: "3.5%"
  },

  EscudoCucei: {
    alignSelf: "center",
    height: "70%",
    width: "87%",
  },

  pantalla: {
    backgroundColor: "blue",
    height: "100%"
  }

});