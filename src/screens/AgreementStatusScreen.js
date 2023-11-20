import { View, Text, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const LOAD_AGREEMENT_ERROR = "Error al cargar el acuerdo";
const LOAD_STATUS_AGREEMENT_ERROR = "Error al cargar el estatus del acuerdo";
const LOAD_NEXT_AGREEMENT_ERROR = "Error al cargar el siguiente acuerdo";

import bgSRC from "./../../images/gray_background.jpeg";

export default function AgreementStatusScreen({ route, navigation }) {
  const [currentAgreement, setCurrentAgreement] = useState("");
  const [currentAgreementIndex, setCurrentAgreementIndex] = useState(0);
  const [currentAgreementStatus, setCurrentAgreementStatus] = useState({
    inFavor: 0,
    against: 0,
    abstention: 0
  });

  const getTotalVotes = () => {
    return currentAgreementStatus.inFavor + currentAgreementStatus.against + currentAgreementStatus.abstention;
  }

  useEffect(() => {
    const fetchCurrentAgreement = async () => {
      try {
        const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_acuerdo_actual.php");

        if(!response.ok)
          throw new Error(LOAD_AGREEMENT_ERROR);

        const json = await response.json();

        setCurrentAgreement(json['current_agreement']);
        setCurrentAgreementIndex(parseInt(json['current_agreement_index']));

      } catch(error) {
        console.error(error);
        if(error === LOAD_AGREEMENT_ERROR)
          Alert.alert(error);
      }
    }

    fetchCurrentAgreement();
  }, []);

  useEffect(() => {
    console.log(currentAgreement, currentAgreementIndex);
    console.log(route.params);
  }, [currentAgreement, currentAgreementIndex]);

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

      } catch (error) {
        console.log(error);
        if(error === LOAD_STATUS_AGREEMENT_ERROR)
          Alert.alert(error);
      }

    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // Asegúrate de pasar un array de dependencias vacío para que se ejecute solo una vez

  useEffect(() => {
    console.log(currentAgreementStatus);
  }, [currentAgreementStatus]);


  const nextAgreement = async () => {
    console.log("Índice del acuerdo:", currentAgreementIndex);
    console.log("Cantidad de acuerdos:", route.params.agreementAmount);
    
    if(currentAgreementIndex === route.params.agreementAmount)
      navigation.replace('Resumen de votación');
    else
      try{
          const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/siguiente_acuerdo.php");
          
          if(!response.ok)
              throw new Error("Algo salió mal. Intente de nuevo");

          navigation.replace('Estatus del acuerdo', route.params);
          
      } catch(error) {
          console.error(error);
          if(error === LOAD_NEXT_AGREEMENT_ERROR)
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
            {
              currentAgreementIndex === route.params.agreementAmount? (
                <Text style={styles.textButton}>Finalizar</Text>
              ): (
                <Text style={styles.textButton}>Siguiente Acuerdo</Text>
              )
            }
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
      color: "white"
    },

    totalVotes: {
      fontSize: 30,
      top: "20%",
      paddingBottom: "10%",
      color: "white"
    },

    statusText: {
      fontSize: 30,
      top: "20%",
      color: "white"
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