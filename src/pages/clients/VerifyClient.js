import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,Switch, ToastAndroid,BackHandler
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon,Avatar,Badge,withBadge   } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';


export default class VerifyClientView extends Component
 {


 	 constructor(props) {
    		super(props);
		      this.state = {}
			    state = {
            code:''
          }

  		}

  		register = (viewId) => {

          fetch('http://dev.itsontheway.net/api/clients/register/verify/'+this.state.code, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((response) => response.json())
                 .then((responseData) => {
                   console.log(responseData)
                     if (responseData.error){
                         alert('Codigo incorrecto, Intente nuevamente')
                       }
                     else{
                       Alert.alert(
                'Has sido verficado con exito',
                'Gracias por registrarte, ya puedes distrutar de nuestros servicios',
                  [
                      {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                      },
                      {text: 'OK', onPress: () => Actions.homeClient({responseData})},
                  ]
            );

                     }
          }).catch((error) =>{
            console.error(error);
          })





  		}



  		render() {

    return (
      <View style={styles.container}>
	        <View>
	          <Text style={styles.ConfirTitle}  h1>Confirmación</Text>
	        </View>
	        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Inserta el codigo enviado a tu Email"
              keyboardType="default"
              underlineColorAndroid='transparent'
              onChangeText={(code) => this.setState({code})}
              />
        </View>
	        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
            onPress={() =>  {
              this.register()}
            }
           >

          <Text style={styles.loginText}>Confirmar</Text>
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
	    flex: 0.5,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: 'white',
	    fontFamily: "QUICKSAND-LIGHT",
  },

  ConfirTitle: {
	    fontSize: 34,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
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
	      flexDirection: 'row',
	      alignItems:'center'
    },
  inputs:{
      height:50,
      marginLeft:12,
      borderBottomColor: '#FFFFFF',
      flex:1,

  },
  inputIcon:
  {
	    width:30,
	    height:30,
	    marginLeft:15,
	    justifyContent: 'center'
  },

  buttonContainer:
  {
	    height:45,
	    flexDirection: 'row',
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

  loginSubTitle:{
	    fontSize: 16,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginTop: 20,
	    marginBottom: 20,
	    color : '#bdbfc1'
  }

});