import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const LOAD_AGREEMENT_ERROR = "Error al cargar el acuerdo";
const LOAD_STATUS_AGREEMENT_ERROR = "Error al cargar el estatus del acuerdo";

export default function AgreementStatusScreen({ navigation }) {
  const [currentAgreement, setCurrentAgreement] = useState("");
  const [currentAgreementStatus, setCurrentAgreementStatus] = useState({
    inFavor: '0',
    against: '0',
    abstention: '0'
  });

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

  /* useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_estatus_acuerdo_actual.php");

        if (!response.ok) throw new Error(LOAD_STATUS_AGREEMENT_ERROR);

        const json = await response.json();

        setCurrentAgreementStatus({
          inFavor: json['a_favor'],
          against: json['en_contra'],
          abstention: json['abstencion']
        });

        console.log(currentAgreementStatus);

      } catch (error) {
        console.log(error);
        Alert.alert(error);
      }

    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // Asegúrate de pasar un array de dependencias vacío para que se ejecute solo una vez */

  return (
    <View>
      {(currentAgreement === "") ?
        <Text>Cargando acuerdo</Text>
        :
        <Text>Acuerdo actual: {currentAgreement}</Text>
      }

      <Text>A favor: {currentAgreementStatus.inFavor}</Text>
      <Text>En contra: {currentAgreementStatus.against}</Text>
      <Text>Abstenerce: {currentAgreementStatus.abstention}</Text>
    </View>
  );
}
