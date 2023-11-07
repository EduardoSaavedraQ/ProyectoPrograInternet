import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, Animated, TouchableOpacity, TextInput } from 'react-native';


import bgSrc from './../../images/fondo_cucei.jpeg'

const ImageBackgroundAnimated = Animated.createAnimatedComponent(ImageBackground);

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    id: "",
    passwd: ""
  })
  
  return (
    <View style={{flex: 1, backgroundColor: "#050593"}}>
      <Image style={styles.cucei} source={bgSrc}></Image>
      <View style={styles.formArea}>
          <Text style={styles.label}>Ingrese su código</Text>
          <TextInput style={styles.input}></TextInput>
          <Text style={styles.label}>Ingrese su NIP</Text>
          <TextInput style={styles.input}></TextInput>
          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.txtSubmit}>Ingresar</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cucei: {
      //flex: 1,
      width: null,
      //height: null,
      //resizeMode: "cover",
      height: "50%",
      opacity: 0.8
  },

  formArea: {
    position: "absolute",
    top: "60%",
    height: "28%",
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#FB6304",
    borderRadius: 20,
    borderWidth: 2,
    padding: 10
  },

  label: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: "1%"
  },

  input: {
    alignSelf: "center",
    backgroundColor: "white",
    height: 40,
    width: "100%",
    borderRadius: 20,
  },

  btnSubmit: {
    top: "10%",
    alignSelf: "center",
    backgroundColor: "#050593",
    borderRadius: 15,
    width: "70%"
  },

  txtSubmit: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
  }
})