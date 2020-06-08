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
import NumericInput from 'react-native-numeric-input'
  const image = { uri: "http://dev.itsontheway.net/api/imgBlanca" }
import {Provider} from 'react-redux'
import store from '../../store'
import {connect} from 'react-redux'
import Products from '../components/Products'
class ProductClientView extends Component
{

  constructor(props) {
    super(props);
     console.log('iasdasdasdasder '+JSON.stringify(this.props.product))
      this.state = {
         product: this.props.product
      }
     state = {
      cantidad   : '',
    }
  }
     addcart(){



      Alert.alert(
      "Producto Agregado",
      "Que deseas hacer?",
      [
        {
          text: "Seguir comprando",
          onPress: () =>  Actions.pop() ,
          style: "cancel"
        },
        { text: "Ir a tu pedido", onPress: () => Actions.orderClient() }
      ],
      { cancelable: false }
    );
    }

  render() {

    return (
      <View style={styles.container}>
                <Products products={this.state.product} onPress={this.props.addItemToCart}/>

         </View>

    );
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}
export default  connect(null,mapDispatchToProps)(ProductClientView);
const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: 'white',
    fontFamily: "QUICKSAND-LIGHT",
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
      marginTop:20
  },
  extras:{
    flexDirection: 'column',
     marginTop:20
  },
   Title: {
      fontSize: 25,
      color : '#373535',
      marginLeft: 20,
      fontWeight: 'bold'
    },
    inputContainer: {
     borderBottomColor: '#bdbfc1',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:400,
      flexDirection: 'row',

    },
  inputs:{
      marginLeft:12,
      borderBottomColor: '#FFFFFF',

  },
   buttonContainer:
    {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:270,
        borderRadius:5,
        marginTop:80,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},

    },
  loginButton: {
    backgroundColor: "#a9d046",
    alignSelf:'center'
  },
  loginText: {
    fontFamily: "QUICKSAND-LIGHT",
    color: 'white',
  },
});