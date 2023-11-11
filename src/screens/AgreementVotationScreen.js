import { View, Text, Alert, CheckBox } from 'react-native'
import React, { useEffect, useState } from 'react'

const LOAD_AGREEMENTS_ERROR = "Error al cargar los acuerdos"

export default function AgreementVotationScreen() {
	const [agreementsVariables, setAgreementsVariables] = useState({
		agreements: {},
		indexAgreements: 0,
		totalNumberAgreements: 0,
		vote: 0
	});

	const updateAgreements = (newJson) => {
		setAgreementsVariables(previousState => {
			return { ...previousState, agreements: newJson, totalNumberAgreements: Object.keys(newJson).length }
		});
	}

	const updateAndLogAgreements = (json) => {
        updateAgreements(json);
        console.log("Acuerdos actualizados:", json);
        console.log("Número total de acuerdos:", Object.keys(json).length);
    }

	useEffect(() => {
		fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/Acuerdos.json")
		.then(response => {
			if(response.ok) 
				return response.json();
			else
				throw new Error(LOAD_AGREEMENTS_ERROR);
		})
		.then(json => {
			updateAndLogAgreements(json);
		})
		.catch(error => {
			console.error(error);
			Alert.alert(error);
		})
	}, []);

    return (
        <View>
            { Object.keys(agreementsVariables.agreements).length > 0? (
				<Text>Acuerdo: {agreementsVariables.agreements[agreementsVariables.indexAgreements].Acuerdo}</Text>
			) : (
				<Text>Cargando acuerdo...</Text>
			) }

        </View>
    )
}