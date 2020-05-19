import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,ImageBackground,ScrollView
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { AirbnbRating,Rating } from 'react-native-ratings'
import { Badge,Avatar } from 'react-native-elements';
const image = { uri: "http://dev.itsontheway.net/api/parnetBanner" }
import { Card } from 'react-native-shadow-cards';

import store from '../../store'
import {connect} from 'react-redux'
import Products from '../components/Products'

 class OrderViewClient extends Component {
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
                {this.props.cartItems.length > 0 ?
                    <Products
                        onPress={this.props.removeItem}
                        products={this.props.cartItems} />
                    : <Text>No items in your cart</Text>
                }
            </View>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderViewClient);


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
