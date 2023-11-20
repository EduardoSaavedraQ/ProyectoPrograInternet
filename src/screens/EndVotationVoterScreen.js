import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

import bgSRC from "./../../images/gray_background.jpeg";

const LOG_OUT_ERROR = "No se ha podido cerrar la sesión. Intente de nuevo";

export default function EndVotationVoterScreen({ navigation }) {

    useEffect(() => {
      const logOut = async () => {
        try{
            const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/decrementar_votantes_conectados.php");

            if(!response.ok)
                throw new Error(LOG_OUT_ERROR);

        } catch(error) {
            console.error(error);
            if(error === LOG_OUT_ERROR)
                Alert.alert(error);
        }
      }

      logOut();

    }, []);

    const goBackToStart = async () => {
        navigation.popToTop();
    }

  return (
    <View>
      <Image source={bgSRC} style={styles.background}/>

      <Text style={styles.text}>Votación terminada</Text>

      <TouchableOpacity onPress={goBackToStart} style={styles.buttonWreapper}>
        <Text style={styles.textButton}>Volver a pantalla de inicio</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
  },

  text: {
    top: "330%",
    alignSelf: "center",
    fontSize: 40,
    color: "gray"
  },

  buttonWreapper: {
    top: "360%",
    alignSelf: "center",
    backgroundColor: "gray",
    borderRadius: 15
  },

  textButton: {
    fontSize: 35,
    alignSelf: "center",
    color: "white"
  }
})