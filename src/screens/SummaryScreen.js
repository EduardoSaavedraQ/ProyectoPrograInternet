import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';

import bgSRC from "./../../images/gray_background.jpeg";

const LOAD_AGREEMENTS_SUMMARY_ERROR = "Error al obtener el resumen de los acuerdos";
const CLOSE_VOTATION_ERROR = "Error al cerrar la votación";

export default function SummaryScreen() {
    const [agreementsSummary, setAgreementsSummary] = useState([])

    useEffect(() => {
        const closeVotation = async () => {
            try {
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/cerrar_votacion.php");

                if(!response.ok)
                    throw new Error(CLOSE_VOTATION_ERROR);

            }catch(error) {
                console.error(error);

                if(error === CLOSE_VOTATION_ERROR)
                    Alert.alert(error);
            }
        }

        closeVotation();
    }, []);

    useEffect(() => {
        const fetchAgreementsSummary = async () => {
            const currentLocalDateTime = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

            try{
                const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_resumen_de_acuerdos.php", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
					    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        currentLocalDateTime: currentLocalDateTime,
                    }),
                });

                if(!response.ok)
                    throw new Error(LOAD_AGREEMENTS_SUMMARY_ERROR);

                const json = await response.json();

                setAgreementsSummary(json);

            } catch(error) {
                console.error(error);
            }
        }

        fetchAgreementsSummary();
    }, []);

    useEffect(() => {
        console.log(agreementsSummary);
    }, [agreementsSummary]);

    return (
    <View style={{}}>
        <Image source={bgSRC} style={styles.background}/>
        {
        agreementsSummary.length === 0?
            <Text style={styles.waitingText}>Cargando resumen de acuerdos...</Text>
        :
            <FlatList
                data={agreementsSummary}
                renderItem={({item}) => <ListItem agreement={item}/>}
                keyExtractor={item => item['Acuerdo No']}
            />
        }
    </View>
    )
}

const styles = StyleSheet.create({
    background: {
        position: "absolute"
    },

    title: {
        fontSize: 40,
        color: "gray"
    },

    waitingText: {
        top: "15%",
        fontSize: 30,
        color: "white"
    },

})