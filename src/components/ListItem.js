import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ListItem({ agreement }) {
  return (
    <View style={styles.item}>
      <Text style={[styles.info, {color: "yellow"}]}>Acuerdo No. {agreement['Acuerdo No']}</Text>
      <Text style={styles.info}>Acuerdo: {agreement['Acuerdo']}</Text>
      <Text style={styles.info}>Votos a favor: {agreement['A favor']}</Text>
      <Text style={styles.info}>Votos en contra: {agreement['En contra']}</Text>
      <Text style={styles.info}>Abstenciones: {agreement['Abstencion']}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    item: {
      borderTopWidth: 4
    },

    info: {
      fontSize: 20,
      color: "white"
    }
});