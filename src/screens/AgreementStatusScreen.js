import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'

const LOAD_AGREEMENT_ERROR = "Error al cargar el acuerdo"

export default function AgreementStatusScreen({ navigation }) {
    const [currentAgreement, setCurrentAgreement] = useState("")

    useEffect(() => {
        fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_acuerdo_actual.php")
        .then(response => {
            if(response.ok)
                return response.json();
            throw new Error(LOAD_AGREEMENT_ERROR);
        })
        .then(json => setCurrentAgreement(json['current_agreement']))
        .catch(error => {
            console.error(error);
            if(error === LOAD_AGREEMENT_ERROR)
                Alert.alert(error);
        });
    }, []);

    

  return (
    <View>
        {
        (currentAgreement === "")? 
            <Text>Cargando acuerdo</Text>
        :
            <Text>Acuerdo actual: {currentAgreement}</Text>
        }

        
    </View>
  )
}