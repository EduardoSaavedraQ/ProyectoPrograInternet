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
import SummaryScreen from '../screens/SummaryScreen';
import EndVotationVoterScreen from '../screens/EndVotationVoterScreen';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Inicio"
                    component={StartScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Inicio de sesión"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Sala de espera del votante"
                    component={VoterWaitingRoomScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Sala de espera del contador"
                    component={CounterWaitingRoomScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Acuerdo"
                    component={AgreementVotationScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Estatus del acuerdo"
                    component={AgreementStatusScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Espera entre acuerdos"
                    component={WaitingRoomBwVotesScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Fin de votación para votante"
                    component={EndVotationVoterScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Resumen de votación"
                    component={SummaryScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: "gray"
                        },
                        
                        headerTitleStyle: {
                            fontSize: 30
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}