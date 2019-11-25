import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'

import * as firebase from 'firebase'
import {firebaseConfig} from './firebase'

firebase.initializeApp(firebaseConfig)

class App extends Component {
  state = {
    email:'xxx@gmail.com',
    password:'xxx-1234',
    logIn:'Falso',
    pontuacao:'0'
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
        .then(
          response => this.setState({logIn:'Verdadeiro'})
        ).catch(
          error => this.setState({logIn:"Senha Incorreta"})
        )
      
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
      name: 'xxx xxx',
      role: 'admin'
    });
  }

  salvarDados() {
    // var database = firebase.database()
    // database.ref("pontuacao").set("100")
    var funcionarios = firebase.database().ref("funcionarios")
    funcionarios.child("002").child("nome").set("xxx")
    funcionarios.child("002").child("sobrenome").set("xxx")
    funcionarios.child("002").child("email").set("xxx@gmail.com")
  }

  removerDados() {
    var database = firebase.database()
    database.ref("aluno").remove()
  }

  listarDados() {
    var pontuacao = firebase.database().ref("pontuacao")
    pontuacao.on('value', (snapshot) => {
      // alert(snapshot.val())
      this.setState({pontuacao:snapshot.val()})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.quadrado}></View>
        <Text>Email: {this.state.email}</Text>
        <Text>Senha: {this.state.password}</Text>
        <Text>Login: {this.state.logIn}</Text>
        <Text>Pontuação: {this.state.pontuacao}</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.signUpUser(this.state.email, this.state.password)}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.signInUser(this.state.email, this.state.password)}>
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.dataBase()}>
          <Text>Input Value</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.salvarDados()}>
          <Text>Salvar Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.removerDados()}>
          <Text>Remover Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.listarDados()}>
          <Text>Listar Dados</Text>
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
  },
  quadrado:{
    height:50,
    width:50,
    backgroundColor: 'blue',
    margin:20,
    borderRadius:25
  },
  button: {
    borderWidth:2,
    borderColor:'gray',
    height:35,
    width: Dimensions.get('window').width*1/2,
    margin:15,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  }
})

export default App
