import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import VoteSection from '../components/VoteSection';

const LOAD_AGREEMENT_ERROR = "Error al cargar el acuerdo";

//import bgSRC from "./../../images/metalgray_background.jpg";
import bgSRC from "./../../images/gray_background.jpeg";

export default function AgreementVotationScreen({ navigation }) {
	const [currentAgreement, setCurrentAgreement] = useState("");

	useEffect(() => {
		const fetchCurrentAgreement = async () => {
			try{
				const response = await fetch("https://lalosuperwebsite.000webhostapp.com/Proyecto%20Progra%20Internet/obtener_acuerdo_actual.php");

				if(!response.ok)
					throw new Error(LOAD_AGREEMENT_ERROR);

				const json = await response.json();

				setCurrentAgreement(json['current_agreement']);
			} catch(error) {
				console.error(error);
			}
		};

		fetchCurrentAgreement();
		
	}, []);

	const goToWaitingRoomBwVotes = () => {
		navigation.replace('Espera entre acuerdos', {
			currentAgreement: currentAgreement
		});
	}

    return (
        <View>
			<Image source={bgSRC} style={styles.background}/>
            { currentAgreement !== ""? (
				<Text style={styles.agreement}>Acuerdo: {currentAgreement}</Text>
				
			) : (
				<Text style={styles.agreement}>Cargando acuerdo...</Text>
			) }

		<VoteSection style={styles.votes} toDoAfterShipping={goToWaitingRoomBwVotes}/>

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