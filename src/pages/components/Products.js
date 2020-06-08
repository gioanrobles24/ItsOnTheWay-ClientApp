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
import {Provider} from 'react-redux'
import store from '../../store'
import {connect} from 'react-redux'
  const image = { uri: "http://dev.itsontheway.net/api/parnetBanner1" }

  import { AirbnbRating } from 'react-native-ratings'

class Products extends Component {

    renderProducts = (products,props) => {
        console.log(products,'aaaaa')
            return (

                     <View style={styles.container}>
                           <View style={styles.header}>
                                <Text style={styles.Title}>{products.prod_name}</Text>
                           </View>
                           <View style={styles.inputContainer}>
                             <NumericInput onChange={cantidad => this.setState({cantidad})} />
                          </View>
                            <View style={styles.extras}>
                                <Text style={styles.SubTitle}>Descripcción: {products.prod_description}</Text>
                           </View>

                         <View style={styles.inputContainer}>
                             <TextInput  style={styles.inputs}
                              placeholderTextColor="gray"
                              placeholder="Nota para agregar a  este producto"
                          />
                        </View>
                          <View style={{width: 200}}>
                              <Text style={styles.SubTitle}  h1>Precio: Bs. {products.prod_price_bs}</Text>
                          </View>

                 </View>
            )
    }



    render() {
        return (
            <View style={styles.container}>
            <ScrollView>

                 {this.renderProducts(this.props.products)}

               </ScrollView>

            </View>
        );
    }
}
export default Products;

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