import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

const LOG_IN_ERROR = "ERROR AL INICIAR SESIÓN";
const ERROR_GET_VOTATION_STARTED_VARIABLE = "No se ha podido conectar a la base de datos";
const ERROR_GET_AGREEMENT_AMOUNT = "Error al obtener la cantidad total de acuerdos";

export default function VoterWaitingRoomScreen({navigation}) {
    const [agreementAmount, setAgreementAmount] = useState(0);

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
        const fetchAgreementAmount = async () => {
            try {
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_cantidad_de_acuerdos.php");

                if(!response.ok)
                    throw new Error(ERROR_GET_AGREEMENT_AMOUNT);

                const json = await response.json();

                setAgreementAmount(parseInt(json['agreement_amount']));
            } catch(error) {
                console.log(error);
            }
        }

        fetchAgreementAmount();
    }, [])

    useEffect(() => {
        console.log("Cantidad de acuerdos:",agreementAmount);
    }, [agreementAmount]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try{
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_variable_votacion_iniciada.php");

                if(!response.ok)
                    throw new Error(ERROR_GET_VOTATION_STARTED_VARIABLE);

                const json = await response.json();

                console.log(json);

                if(json['votacion_iniciada'] === "1" && agreementAmount !== 0)
                    navigation.replace('Acuerdo', {
                        agreementAmount: agreementAmount
                    });
                    
            } catch(error) {
                console.error(error);
            }
        }, 5000);

        return () => clearInterval(intervalId);

    }, [agreementAmount]);

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