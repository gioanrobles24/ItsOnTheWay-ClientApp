import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,ImageBackground
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { AirbnbRating,Rating } from 'react-native-ratings'
import { Badge,Avatar } from 'react-native-elements';
const image = { uri: "http://dev.itsontheway.net/api/parnetBanner" }
import { Card } from 'react-native-shadow-cards';
export default class OrderDeliveryShowViewPartner extends Component {
    constructor(props) {
       super(props);
       this.state = {

      }



    }

    ratingCompleted( rating ) {
        console.log('${rating}');
    }
    goTypePayment(){
     Actions.paymentType()
    }

  render() {

    return (
      <View style={styles.container}>
          <Image
            style={styles.partnerimage}
            source={{
              uri: 'http://dev.itsontheway.net/api/parnetBanner1',
            }}
          />
          <Card style={styles.containertitle}>
              <Avatar
                       size="medium"
                       overlayContainerStyle={{backgroundColor: '#bdbfc1',}}
                       containerStyle={{alignSelf: "center", flexDirection:'column',
                       marginTop: 20,}}
                       source={image}
                      />
              <Text style={styles.Title}  h1>Nombre de tienda</Text>
           </Card>

            <View style={{flex: 0.4, flexDirection: 'column',justifyContent: 'space-around',alignItems: 'flex-start',
                marginLeft: 10
              }}>
                    <View style={{width: 200}}>
                         <Text style={styles.SubTitle}  h1>Listado de productos: </Text>
                         <Text   h1> Producto 1, Poducto 2</Text>
                     </View>
                  <View style={{width: 200}}>
                         <Text style={styles.SubTitle}  h1>Dirección a a enviar: </Text>
                         <Text   h1> Mirada, Chacao,Casa 1, Color rosado</Text>
                     </View>
                   <View style={{width: 200, flexDirection: 'row'}}>
                   </View>

            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                onPress={() =>  {
                  this.goTypePayment()}
                }
               >

              <Text style={styles.loginText}>Pagar</Text>
          </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",

  },
  containertitle:{
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    elevation:1,
    height:80
  },

   menuText: {
    fontSize : 25,
    alignSelf: 'flex-end',
    color: '#373535',
  },
  cardBadge:{
      alignSelf: 'center'
   },

   partnerimage: {
      flex:0.5,
     },
   Title: {
    fontSize: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: "center",
    color : '#373535',
    marginTop: 20,
    marginLeft:20
  },
   SubTitle: {
    fontSize: 16,
    fontWeight:'bold'
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
    alignSelf:'center',
  },
  loginText: {
    fontFamily: "QUICKSAND-LIGHT",
    color: 'white',
  },

});
