import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'

import * as firebase from 'firebase'
import {firebaseConfig} from './firebase'

firebase.initializeApp(firebaseConfig)

class App extends Component {
  state = {
    email:'',
    password:'',
    logIn:'Falso'
  }

  signUpUser(email,password){
    try{
      if(this.state.password.length < 6) {
        alert("A senha deve conter no minimo 6 caracteres!")
        return
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error.toString())
    }
  }

  signInUser(email, password){
    try{
      if(this.state.password.length < 6){
        alert("A senha deve conter no minimo 6 caracteres!")
        return
      }
      firebase.auth().signInWithEmailAndPassword(email, password)
      this.setState({logIn:'Verdadeiro'})
    } catch (error) {
      console.log(error.toString())
    }
  }

  dataBase() {
    const uid = firebase.auth().currentUser.uid;
 
    // Create a reference
    const ref = firebase.database().ref(`/users/${uid}`);
  
    ref.set({
      uid,
      name: 'Gustavo Queiroz',
      role: 'admin'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login: {this.state.logIn}</Text>
        <TouchableOpacity onPress={() => this.signUpUser(this.state.email, this.state.password)}>
          <Text>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.signInUser(this.state.email, this.state.password)}>
          <Text>SignIn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.dataBase()}>
          <Text>Input Value</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})

export default App
