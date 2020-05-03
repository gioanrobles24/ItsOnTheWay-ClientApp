import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,ScrollView,
  TouchableHighlight,
  Image,
  Alert,Switch, ToastAndroid,BackHandler,Picker,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon,Avatar,Badge,withBadge   } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import RNPickerSelect from 'react-native-picker-select'
import { Card } from 'react-native-shadow-cards'
  const image = { uri: "http://dev.itsontheway.net/api/imgBlanca" }

export default class AllmyOrdersClientView extends Component
{

  constructor(props) {
    super(props);
    //  this.toggleSwitch = this.toggleSwitch.bind(this);
    //   this.state = {
    //      showPassword: true,
    //       icon: 'visibility-off',
    //        favColor: undefined,
    //         items: [
    //             {
    //                 label: 'Aragua',
    //                 value: 'red',
    //             },
    //             {
    //                 label: 'Distrito Capital',
    //                 value: 'orange',
    //             },
    //             {
    //                 label: 'Miranda',
    //                 value: 'blue',
    //             },
    //         ],
    //   }
    // state = {
    //   email   : '',
    //   password: '',
    // }

  }

  // toggleSwitch() {
  //   this.setState(prevState => ({
  //     icon: prevState.icon === 'visibility-off' ? 'visibility' : 'visibility-off',
  //     showPassword: !this.state.showPassword

  //     }));
  // }

  // register = (viewId) => {
  // 	alert('registro')
  // }

  // Verification = (viewId) => {
  // 	alert('Por favor introduce el codigo que te ha de llegar a tu número teléfonico')
  // }


  orderClient = (viewId) =>
  {


      Actions.orderClient()

      //     fetch('http://dev.itsontheway.net/api/partner/login', {
      //       method: 'POST',
      //       headers: {
      //           'Accept': 'application/json',
      //           'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({
      //           p_email: this.state.email,
      //           password: this.state.password,
      //       })
      //   }).then((response) => response.json())
      //        .then((responseData) => {
      //          console.log(responseData)
      //            if (responseData.error){
      //                alert('Usuario o contraseña incorrectos, por favor intenta nuevamente')
      //              }
      //            else{
      //                 Actions.homeparter({responseData})
      //            }
      // }).catch((error) =>{
      //   console.error(error);
      // })

  }

  render() {

    return (
      <View style={styles.container}>
               <View style={styles.header}>
                    <Text style={styles.Title}>Mis Pedidos</Text>
               </View>

                <View style={styles.cardOrdercontainer}>
                    <ScrollView>
                            <Card style={styles.cardOrder} >
                                <Avatar
                                      rounded
                                      size="medium"
                                      source={image}
                                  />
                                    <Text style={styles.cardOrderSubTitle} >nombre pedido</Text>
                                    <Badge containerStyle={styles.cardBadge} value="entregada"  status="primary" />
                            </Card>

                    </ScrollView>
                </View>
         </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: "QUICKSAND-LIGHT",
  },

  loginTitle: {
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
      width:400,
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
  },
  cardOrdercontainer: {
        flexDirection: 'row',
     },

    cardOrder:{
      marginTop: 30,
      padding: 20,
      margin: 20,
      flexDirection: 'row',
      elevation: 8
    },
    cardOrderSubTitle: {
      fontSize: 20,
      marginLeft : 10,
      alignSelf: 'center'
    },

    cardBadge:{
      alignSelf: 'center'
   },
    header: {
      flexDirection: 'row',

  },
   Title: {
      fontSize: 30,
      color : '#373535',
      // marginTop: 5
      // alignItems: 'flex-start'
    },

});

