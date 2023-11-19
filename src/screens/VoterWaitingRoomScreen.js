import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

const LOG_IN_ERROR = "ERROR AL INICIAR SESIÓN";
const ERROR_GET_VOTATION_STARTED_VARIABLE = "No se ha podido conectar a la base de datos";

export default function VoterWaitingRoomScreen({navigation}) {

    useEffect(() => {
        const logIn = async () => {
            try{
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/incrementar_votantes_conectados.php");;
    
                if(!response.ok)
                    throw new Error(LOG_IN_ERROR);
    
            } catch(error) {
                console.error(error);
            }
        }

        logIn();

    }, []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try{
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_variable_votacion_iniciada.php");

                if(!response.ok)
                    throw new Error(ERROR_GET_VOTATION_STARTED_VARIABLE);

                const json = await response.json();

                console.log(json);

                if(json['votacion_iniciada'] === "1")
                    navigation.replace('Acuerdo');
            } catch(error) {
                console.error(error);
            }
        }, 5000);

        return () => clearInterval(intervalId);

    }, [])

    return (
        <View style={styles.background}>
            <Text style={styles.text}>Esperando a que el contador inicie la votación</Text>
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