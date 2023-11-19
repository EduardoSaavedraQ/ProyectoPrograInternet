import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import StartVotationButton from '../components/StartVotationButton';

import bgSRC from "./../../images/gray_background.jpeg";

const LOAD_REGISTERED_VOTERS_ERROR = "Error al obtener los votantes registrados";
const LOAD_ONLINE_VOTERS_ERROR = "Error al obtener los votantes conectados";

export default function CounterWaitingRoomScreen({ navigation }) {
    const [registeredVoters, setRegisteredVoters] = useState(0);
    const [onlineVoters, setOnlineVoters] = useState(0);

    const startVotation = async () => {
        await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/cargar_acuerdos_en_bd.php");

        navigation.navigate('')
    }

    useEffect(() => {
        const getRegisteredVoters = async() => {
            try{
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_votantes_registrados.php");
    
                if(!response.ok)
                    throw new Error(LOAD_REGISTERED_VOTERS_ERROR);
    
                const json = await response.json();
    
                setRegisteredVoters(json['registeredVoters']);
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