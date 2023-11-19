import { View, Text, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const LOAD_AGREEMENT_ERROR = "Error al cargar el acuerdo";
const LOAD_STATUS_AGREEMENT_ERROR = "Error al cargar el estatus del acuerdo";

import bgSRC from "./../../images/gray_background.jpeg";

export default function AgreementStatusScreen({ route, navigation }) {
  const [currentAgreement, setCurrentAgreement] = useState("");
  const [currentAgreementStatus, setCurrentAgreementStatus] = useState({
    inFavor: 0,
    against: 0,
    abstention: 0
  });

  const getTotalVotes = () => {
    return currentAgreementStatus.inFavor + currentAgreementStatus.against + currentAgreementStatus.abstention;
  }

  useEffect(() => {
    fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_acuerdo_actual.php")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(LOAD_AGREEMENT_ERROR);
      })
      .then(json => setCurrentAgreement(json['current_agreement']))
      .catch(error => {
        console.error(error);
        if (error === LOAD_AGREEMENT_ERROR) Alert.alert(error);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_estatus_acuerdo_actual.php");

        if (!response.ok) throw new Error(LOAD_STATUS_AGREEMENT_ERROR);

        const json = await response.json();
        

        setCurrentAgreementStatus({
          inFavor: parseInt(json['a_favor']), 
          against: parseInt(json['en_contra']),
          abstention: parseInt(json['abstencion'])
        });

        console.log(currentAgreementStatus);

      } catch (error) {
        console.log(error);
        Alert.alert(error);
      }

    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // Asegúrate de pasar un array de dependencias vacío para que se ejecute solo una vez

  const nextAgreement = async () => {
    try{
        const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/siguiente_acuerdo.php");
        
        if(!response.ok)
            throw new Error("Algo salió mal. Intente de nuevo");

        navigation.replace("Estatus del acuerdo", route.params);
    } catch(error) {
        console.error(error);
        Alert.alert(error);
    }
  }

  return (
    <View>
      <Image source={bgSRC} style={styles.background}/>
      {(currentAgreement === "") ?
        <Text style={styles.agreement}>Cargando acuerdo</Text>
        :
        <Text style={styles.agreement}>Acuerdo actual: {currentAgreement}</Text>
      }
      
      <Text style={styles.totalVotes}>Votos totales: {getTotalVotes()}/{route.params.onlineVoters}</Text>
      <Text style={styles.statusText}>A favor: {currentAgreementStatus.inFavor}</Text>
      <Text style={styles.statusText}>En contra: {currentAgreementStatus.against}</Text>
      <Text style={styles.statusText}>Abstenerce: {currentAgreementStatus.abstention}</Text>
      
      {
        getTotalVotes() === route.params.onlineVoters ? (
          <TouchableOpacity style={styles.nextButton} onPress={nextAgreement}>
            <Text style={styles.textButton}>Siguiente Acuerdo</Text>
          </TouchableOpacity>
        ): (
          <View/>
        )
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
      position: "absolute",
      
    }, 

    agreement: {
      fontSize: 30,
    },

    totalVotes: {
      fontSize: 30,
      top: "20%",
      paddingBottom: "10%"
    },

    statusText: {
      fontSize: 30,
      top: "20%"
    },
    
    nextButton: {
      backgroundColor: "red",
      top: "40%"

  },

    textButton: {
        fontSize: 40,
        color: "white"
    },
});