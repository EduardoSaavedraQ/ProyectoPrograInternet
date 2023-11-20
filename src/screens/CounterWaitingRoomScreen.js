import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import StartVotationButton from '../components/StartVotationButton';

import bgSRC from "./../../images/gray_background.jpeg";

const LOAD_REGISTERED_VOTERS_ERROR = "Error al obtener los votantes registrados";
const LOAD_ONLINE_VOTERS_ERROR = "Error al obtener los votantes conectados";
const START_VOTATION_ERROR = "Error al iniciar la votación intente de nuevo";

export default function CounterWaitingRoomScreen({ navigation }) {
    const [registeredVoters, setRegisteredVoters] = useState(0);
    const [onlineVoters, setOnlineVoters] = useState(0);

    const startVotation = async () => {
        try {
            const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/iniciar_votacion.php");

            if(!response.ok)
                throw new Error(START_VOTATION_ERROR);

            const json = await response.json();
            console.log(json);
            console.log("Cantidad de acuerdos:", json['agreementAmount']);

            navigation.replace('Estatus del acuerdo', {
                onlineVoters: onlineVoters,
                agreementAmount: parseInt(json['agreementAmount'])
            });

        } catch(error) {
            console.error(error);
            
            if(error === START_VOTATION_ERROR)
                Alert.alert(error);
        }
    }

    useEffect(() => {
        const getRegisteredVoters = async() => {
            try{
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_votantes_registrados.php");
    
                if(!response.ok)
                    throw new Error(LOAD_REGISTERED_VOTERS_ERROR);
    
                const json = await response.json();
    
                setRegisteredVoters(parseInt(json['registeredVoters']));

            } catch(error) {
                console.error(error);
            }
        };

        getRegisteredVoters();
        
    }, [])

    useEffect(() => {
        const intervalId = setInterval(async() => {
            try{
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_votantes_conectados.php");

                if(!response.ok)
                    throw new Error(LOAD_ONLINE_VOTERS_ERROR);

                const json = await response.json();

                setOnlineVoters(parseInt(json['onlineVoters']));

                console.log(onlineVoters);

            } catch(error) {
                console.error(error);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    })

    return (
    <View>
        <Image source={bgSRC} style={styles.background}/>
        <Text style={styles.votersStatus}>Votantes conectados: {onlineVoters}/{registeredVoters}</Text>
        <StartVotationButton
        style={styles.button}
        onPress={startVotation}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
		position: "absolute",		
	},

    votersStatus: {
        fontSize: 40,
        color: "white",
        top: "280%"
    },

    button: {
        position: "absolute",
        top: "400%",
        alignSelf: "center"
    }
});