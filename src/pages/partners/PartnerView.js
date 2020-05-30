import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
  Image,
  Alert,ImageBackground
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { AirbnbRating,Rating } from 'react-native-ratings'
import { Badge,Avatar } from 'react-native-elements';
const image = { uri: "http://dev.itsontheway.net/api/parnetBanner" }
import { Card } from 'react-native-shadow-cards';
import Products from '../components/Products'
export default class PartnerView extends Component {
    constructor(props) {
       super(props);
        console.log('id de Partner '+JSON.stringify(this.props.p_id))
       this.state = {
         partner_products: [],
         partner_banner: '',
         partner: []
      }


          fetch('http://dev.itsontheway.net/api/clients/showPartner/'+this.props.p_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
             .then((responseData) => {
               console.log(responseData)
                 if (responseData.error){
                     alert(' por favor intenta nuevamente')
                   }
                 else{

                     this.setState({
                                partner_products: responseData.response.partner_products,
                                partner_banner: responseData.response.partner_banner,
                                partner: responseData.response.partner,
                            },() => {
                                console.log('PRUEBAAAA'+JSON.stringify(this.state.partner));
                              });
                 }
      }).catch((error) =>{
        console.error(error);
      })




    }

    ratingCompleted( rating ) {
        console.log('${rating}');
    }
    productView(){
     Actions.productView()
    }

     render() {
         let partner_profile_pic ={ uri: this.state.partner_banner}
         console.log(partner_profile_pic,'imagen Socio comercial')
    return (
      <View style={styles.container}>
          <Image
            style={styles.partnerimage}
            source={partner_profile_pic}
          />
          <Card style={styles.containertitle}>
              <Avatar
                       size="medium"
                       overlayContainerStyle={{backgroundColor: '#bdbfc1',}}
                       containerStyle={{alignSelf: "center", flexDirection:'column',
                       marginTop: 20,}}
                       source={image}
                      />
              <Text style={styles.Title}  h1>{this.state.partner.p_user}</Text>
           </Card>



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

  },
  containertitle:{
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    elevation:1,
    height:80
  },
   cardOrder:{
      marginTop: 30,
      padding: 20,
      margin: 20,
      flexDirection: 'row',
      elevation: 8,
      alignItems: 'center'
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
      flex:0.3,
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
