import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Vote from './Vote'
import SendVoteButton from './SendVoteButton'

export default function VoteSection(props) {
  const [voteMark, setVoteMark] = useState({
    "a_favor": false,
    "en_contra": false,
    "abstencion": false
  });

  const setVote = (selectedKey) => {
    const newVoteState = { ...voteMark };


    Object.keys(newVoteState).forEach((key) => {
      newVoteState[key] = false;
    })

    newVoteState[selectedKey] = true;

    setVoteMark(newVoteState);

    console.log(voteMark);
  }

  const getVoteToSend = () => {
    for(let key in voteMark) {
      if(voteMark.hasOwnProperty(key) && voteMark[key])
        return key;
    }
  }

  return (
    <View style={props.style}>
      <Vote
        label="A favor"
        isSelected={voteMark['a_favor']}
        value='a_favor'
        to_do={setVote}/>
      <Vote
        label="En contra"
        isSelected={voteMark['en_contra']}
        value='en_contra'
        to_do={setVote}/>
      <Vote
        label="Abstenerce"
        isSelected={voteMark['abstencion']}
        value='abstencion'
        to_do={setVote}/>

      <SendVoteButton style={styles.button}
      valueToSend={getVoteToSend()}/>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-end"
    }
})