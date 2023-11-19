import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import AgreementVotationScreen from '../screens/AgreementVotationScreen';
import CounterWaitingRoomScreen from '../screens/CounterWaitingRoomScreen';
import AgreementStatusScreen from '../screens/AgreementStatusScreen';
import VoterWaitingRoomScreen from '../screens/VoterWaitingRoomScreen';
import WaitingRoomBwVotesScreen from '../screens/WaitingRoomBwVotesScreen';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Inicio" component={StartScreen} />
                <Stack.Screen name="Inicio de sesión" component={LoginScreen} />
                <Stack.Screen name="Sala de espera del votante" component={VoterWaitingRoomScreen} />
                <Stack.Screen name="Sala de espera del contador" component={CounterWaitingRoomScreen} />
                <Stack.Screen name="Acuerdo" component={AgreementVotationScreen} />
                <Stack.Screen name="Estatus del acuerdo" component={AgreementStatusScreen} />
                <Stack.Screen name="Espera entre acuerdos" component={WaitingRoomBwVotesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}