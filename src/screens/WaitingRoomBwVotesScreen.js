import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

const LOAD_NEXT_AGREEMENT_ERROR = "No se ha podido obtener el siguiente acuerdo";

export default function WaitingRoomBwVotesScreen({route, navigation}) {
    useEffect(() => {
        const intervalId = setInterval(async() => {
            try{
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_acuerdo_actual.php");

                if(!response.ok)
                    throw new Error(LOAD_NEXT_AGREEMENT_ERROR);

                const json = await response.json();

                console.log("Acuerdo actual:", route.params.currentAgreement);
                console.log("Acuerdo obtenido:", json['current_agreement']);

                if(json['current_agreement'] !== route.params.currentAgreement)
                    navigation.replace('Acuerdo');

            } catch(error) {
                console.error(error);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    })

  return (
    <View style={styles.background}>
      <Text style={styles.text}>Espere hasta que el contador termine de revisar los votos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "black",
        flex: 1
    },

    text: {
        alignSelf: "center",
        top: "20%",
        color: "white",
        fontSize: 30
    }
});