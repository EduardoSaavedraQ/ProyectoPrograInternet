import React from 'react'
import { Text, View } from 'react-native'
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen'
import UserInput from './src/components/UserInput'
import Form from './src/components/Form'
import SubmitButton from './src/components/SubmitButton'
import AgreementVotationScreen from './src/screens/AgreementVotationScreen'
import Vote from './src/components/Vote'
import VoteSection from './src/components/VoteSection'
import SendVoteButton from './src/components/SendVoteButton'
import Navigator from './src/routes/Navigator'

const App = () => {
  return (
    <Navigator/>
  )
}

export default App;