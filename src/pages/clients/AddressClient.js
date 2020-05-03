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
  //   alert('registro')
  // }

  // Verification = (viewId) => {
  //   alert('Por favor introduce el codigo que te ha de llegar a tu número teléfonico')
  // }


  newAddress = (viewId) =>
  {


      alert('as')
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
                    <Text style={styles.Title}>Mis Direcciones</Text>
               </View>
                 <View style={styles.container1} >
                                <Text style={styles.container1Title} h3></Text>


                                <Text style={styles.container2Title} onPress={() =>   {
                                      this.newAddress()}
                                    }>
                                    Agregar dirección
                                </Text>
                                 <Icon
                                    name='plus'
                                    type='evilicon'
                                    color='#a9d046'
                                    onPress={() =>   {
                                        this.newAddress()}
                                      }
                                 />
                         </View>
                <View >

                    <ScrollView>
                            <View style={styles.addressContainer} >
                                    <Text style={styles.SubTitle} >Dirección:</Text>
                                     <Text style={styles.Text} >Descripción dirección</Text>
                            </View>

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
    backgroundColor: 'white',
    fontFamily: "QUICKSAND-LIGHT",
  },

  addressContainer:{
    flexDirection: 'column',
    borderBottomWidth:1,
    borderBottomColor:'#bdbfc1',

  },

  SubTitle: {
      fontSize: 15,
      marginLeft : 10,
      fontWeight: 'bold'
    },
    Text:{
      color: '#bdbfc1'
    },
    header: {
      flexDirection: 'row',

  },
   Title: {
      fontSize: 30,
      color : '#373535',
      marginLeft: 20,
      fontWeight: 'bold'
    },
    container1:{
    marginTop: 30,
    marginRight:45,
    flexDirection:'row',
    justifyContent: "flex-end",
  },
  container1Title:{
      fontSize: 15,
      fontWeight:'bold'
  },

});

