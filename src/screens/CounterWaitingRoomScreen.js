import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import bgSRC from "./../../images/gray_background.jpeg";

export default function CounterWaitingRoomScreen() {
    const [registeredVoters, setRegisteredVoters] = useState(0);
    const [onlineVoters, setOnlineVoters] = useState(0);

    const getRegisteredVoters = async () => {
        const totalVoters = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_votantes_registrados.php")
                        .then(response => response.json())
                        .catch(error => console.error(error));
        
        setRegisteredVoters(parseInt(totalVoters['registeredVoters']));
        console.log(registeredVoters);
    }

    getRegisteredVoters();

    return (
    <View>
        <Image source={bgSRC} style={styles.background}/>
        <Text style={styles.votersStatus}>Votantes conectados: {onlineVoters}/{registeredVoters}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
		position: "absolute",		
	},

    votersStatus: {
        fontSize: 40,
        color: "white"
    }
});