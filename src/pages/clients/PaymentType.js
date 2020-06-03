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
import { Icon,Avatar,Badge,withBadge,CheckBox    } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';


export default class PaymentTypeClientView extends Component
{

  constructor(props) {
    super(props);
    console.log('esto llego a aqui'+JSON.stringify(this.props.pedido))
     this.state = {
       transfchecked : '',
       pagomchecked : '',
       zellechecked : '',
       tddchecked : '',
       total_price: this.props.pedido.prod_price_bs
      }
      state = {
        email   : '',
      }

  }


  VerifyPaymentClient = (viewId) => {
    console.log(viewId,'AAAAAAA')
    console.log('asdasdasdsad'+JSON.stringify(this.props.pedido))
   let pedido = this.props.pedido
   let opType = viewId

     console.log('epa'+this.props.pedido[0].prod_price_usd)
  	Actions.verifyPaymentClient({pedido, opType});


  }


  render() {

    return (
      <View style={styles.container}>
           <View style={styles.header}>
                    <Text style={styles.Title}>Método de pago</Text>
            </View>
            <View style={styles.platformsContainer}>
                    <View style={styles.platformName}>
                         <Text>
                               1.  Transferencia
                           </Text>
                           <Text  style={styles.platformNamePrice2} >
                                {this.props.pedido[0].prod_price_bs} Bs.
                           </Text>
                           <CheckBox
                              checkedIcon='dot-circle-o'
                               uncheckedIcon='circle-o'
                              checked={this.state.transfchecked}
                              onPress={() => this.VerifyPaymentClient('P2')}
                          />
                    </View>
                     <View style={styles.platformName}>
                         <Text>
                               2.  Pago móvil
                           </Text>
                           <Text  style={styles.platformNamePrice3} >
                                {this.props.pedido[0].prod_price_bs} Bs.
                           </Text>
                           <CheckBox
                              checkedIcon='dot-circle-o'
                               uncheckedIcon='circle-o'
                              checked={this.state.pagomchecked}
                              onPress={() => this.VerifyPaymentClient('P1')}
                          />
                    </View>
                    <View style={styles.platformName}>
                         <Text>
                               3.   Zelle
                           </Text>
                           <Text style={styles.platformNamePrice4} >
                                ----
                           </Text>
                           <CheckBox
                              checkedIcon='dot-circle-o'
                               uncheckedIcon='circle-o'
                              checked={this.state.zellechecked}
                              onPress={() => this.setState({zellechecked: !this.state.zellechecked})}
                          />
                    </View>
                     <View style={styles.platformName}>
                         <Text style= {styles.platformNameTD}>
                               4.    Crédito - Débito internacional
                           </Text>
                           <Text style={styles.platformNamePrice5}  >
                               ---
                           </Text>
                           <CheckBox
                              checkedIcon='dot-circle-o'
                               uncheckedIcon='circle-o'
                              checked={this.state.tddchecked}
                              onPress={() => this.setState({tddchecked: !this.state.tddchecked})}
                          />
                    </View>
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "QUICKSAND-LIGHT",
  },
   header: {
      flexDirection: 'row',
      marginTop:30
  },
   Title: {
      fontSize: 25,
      color : '#373535',
      marginLeft: 20,
      fontWeight: 'bold'
    },

  platformsContainer:{
    flexDirection:'column',
  },
  platformName:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
     width:400,
  },
  platformNameTD:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width: 100
  },
  platformNamePrice2: {
  marginLeft: 30,
  },
  platformNamePrice3: {
  marginLeft: 44,
  },
  platformNamePrice4: {
    marginLeft: 80,
  },
  platformNamePrice5: {
    marginLeft: 30,
  }


});

