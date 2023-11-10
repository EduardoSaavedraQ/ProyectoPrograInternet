import { View, Text, Alert, CheckBox } from 'react-native'
import React, { useEffect, useState } from 'react'

const LOAD_AGREEMENTS_ERROR = "Error al cargar los acuerdos"

export default function AgreementVotationScreen() {

	let jsonAgreements = [];

	fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/Acuerdos.json")
	.then(response => {
		if(response.ok)
			return response.json();
		else
		throw new Error(LOAD_AGREEMENTS_ERROR);
	})
	.then(json_agreements => {
		jsonAgreements = json_agreements;
		console.log(jsonAgreements);
		console.log(Object.keys(jsonAgreements).length);
	})
	.catch(error => {
		console.error(error);
		Alert.alert(error);
	});



    return (
        <View>
            <Text>AgreementVotationScreen</Text>
        </View>
    )
}