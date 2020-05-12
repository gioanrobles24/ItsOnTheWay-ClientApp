import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,Switch, ToastAndroid,BackHandler,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon,Avatar,Badge,withBadge   } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';


export default class RegisterClientView extends Component
{

  constructor(props) {
    super(props);
    state = {
      email   : '',
    }

  }


  sendResetPasswd = (viewId) => {

  	alert('correo Enviado'+ 'correo:' +this.state.email)
  }
  // onClickListener = (viewId) =>
  // {


  //      alert( "Button pressed "+ 'correo:' +this.state.email+ 'password'+ this.state.password)

  //     //     fetch('http://dev.itsontheway.net/api/partner/login', {
  //     //       method: 'POST',
  //     //       headers: {
  //     //           'Accept': 'application/json',
  //     //           'Content-Type': 'application/json'
  //     //       },
  //     //       body: JSON.stringify({
  //     //           p_email: this.state.email,
  //     //           password: this.state.password,
  //     //       })
  //     //   }).then((response) => response.json())
  //     //        .then((responseData) => {
  //     //          console.log(responseData)
  //     //            if (responseData.error){
  //     //                alert('Usuario o contraseña incorrectos, por favor intenta nuevamente')
  //     //              }
  //     //            else{
  //     //                 Actions.homeparter({responseData})
  //     //            }
  //     // }).catch((error) =>{
  //     //   console.error(error);
  //     // })

  // }

  render() {

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.loginTitle}  h1>Re establece tu clave</Text>
        </View>

          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Correo"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}
              />
        </View>


        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
        onPress={() =>  {
              this.sendResetPasswd()}
            }
           >

          <Text style={styles.loginText}>Enviar</Text>
        </TouchableHighlight>
            <Avatar
         rounded size="xlarge"
         overlayContainerStyle={{backgroundColor: 'transparent',}}
         containerStyle={{alignSelf: "center", flexDirection:'column',
         marginTop: 20,}}
         source={{ uri: 'http://dev.itsontheway.net/api/imgVerde',}}
                  />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: "QUICKSAND-LIGHT",
  },

  loginTitle: {
    fontSize: 25,
    flexDirection: 'row',
    color : '#373535'
  },
    inputContainer: {
      borderBottomColor: '#bdbfc1',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:350,
      height:55,
      marginBottom:20,
      flexDirection: 'column',
      alignItems:'flex-start',
      justifyContent: 'center'
    },
  inputs:{
      height:50,
      marginLeft:12,
      borderBottomColor: '#FFFFFF',

  },
  buttonContainer:
  {
	    height:45,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginBottom:20,
	    width:270,
	    borderRadius:5,
	    shadowColor: 'rgba(0, 0, 0, 0.1)',
	    shadowOpacity: 0.8,
	    elevation: 6,
	    shadowRadius: 15 ,
	    shadowOffset : { width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: "#a9d046",
  },
  loginText: {
    fontFamily: "QUICKSAND-LIGHT",
    color: 'white',
  },

});

