import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import VoteSection from '../components/VoteSection';

//const LOAD_AGREEMENTS_ERROR = "Error al cargar los acuerdos";
const LOAD_AGREEMENT_ERROR = "Error al cargar el acuerdo";

//import bgSRC from "./../../images/metalgray_background.jpg";
import bgSRC from "./../../images/gray_background.jpeg";

export default function AgreementVotationScreen() {
	const [currentAgreement, setCurrentAgreement] = useState("");

	/*const updateAgreement = (newJson) => {
		setAgreementsVariables(previousState => {
			return { ...previousState, agreements: newJson, totalNumberAgreements: Object.keys(newJson).length }
		});
	}

	const updateAndLogAgreement = (json) => {
        updateAgreements(json);
        console.log("Acuerdos actualizados:", json);
        //console.log("Número total de acuerdos:", Object.keys(json).length);
    }*/

	const updateAndLogCurrentAgreement = (json) => {
		setCurrentAgreement(json['current_agreement']);
		console.log(currentAgreement);
		return 1;
	}

	setInterval(() => {
		fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_acuerdo_actual.php")
		.then(response => {
			if(response.ok)
				return response.json()
			else
				throw new Error(LOAD_AGREEMENT_ERROR)
		})
		.then(json => {
			updateAndLogCurrentAgreement(json);
		})
		.catch(error => console.error(error))
	}, 5000);

	/* useEffect(() => {
		fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/Acuerdos.json")
		.then(response => {
			if(response.ok) 
				return response.json();
			else
				throw new Error(LOAD_AGREEMENTS_ERROR);
		})
		.then(json => {
			console.log(json);
			updateAndLogAgreements(json);
		})
		.catch(error => {
			console.error(error);
			Alert.alert(error);
		})
	}); */

    return (
        <View>
			<Image source={bgSRC} style={styles.background}/>
            { currentAgreement !== ""? (
				<Text style={styles.agreement}>Acuerdo: {currentAgreement}</Text>
				
			) : (
				<Text style={styles.agreement}>Cargando acuerdo...</Text>
			) }

		<VoteSection style={styles.votes}/>

        </View>
    )
}

const styles = StyleSheet.create({
	background: {
		position: "absolute",
		//left: "30%",
		//flex: 1,
		//resizeMode: "stretch"
		
	},

	agreement: {
		color: "white",
		fontSize: 35
	},

	votes: {
		top: "25%",
		right: "7%"
	}

})