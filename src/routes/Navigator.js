import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import AgreementVotationScreen from '../screens/AgreementVotationScreen';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Inicio" component={StartScreen} />
                <Stack.Screen name="Inicio de sesión" component={LoginScreen} />
                <Stack.Screen name="Acuerdo" component={AgreementVotationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}