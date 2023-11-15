import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Vote from './Vote'
import SendVoteButton from './SendVoteButton'

export default function VoteSection(props) {
  return (
    <View style={props.style}>
      <Vote
        label="A favor"
        isSelected={false}/>
      <Vote
        label="En contra"
        isSelected={false}/>
      <Vote
        label="Abstenerce"
        isSelected={false}/>

      <SendVoteButton style={styles.button}/>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-end"
    }
})