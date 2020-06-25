import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Switch,
  ToastAndroid,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Icon,
  Avatar,
  Badge,
  withBadge,
  Card,
  CheckBox,
} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';

export default class VerifyPaymentClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: [
        {
          name: 'Bancaribe o Provincial',
          phone: '04144537395',
          ci: '13115089',
        },
      ],
      banks: [
        {
          name: 'Bancaribe',
          cta: '01140205462050035290',
          type: 'Corriente',
          titular: 'Luis Emilio Hernandez',
          ci: '13115089',
        },
        {
          name: 'Mercantil',
          cta: '0105 0190 380190 133554',
          type: 'Ahorro',
          titular: 'Luisa Hernández',
          ci: '11.987.613',
        },
        {
          name: 'Provincial',
          cta: '01080157560100055621',
          type: 'Corriente',
          titular: 'Carlos Valero Morales',
          ci: '11.735.524',
        },
      ],
      selectedPayment: null,
    };
  }

  sendOrder = viewId => {
    fetch('http://dev.itsontheway.net/api/clients/neworder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ord_prod_id: '1',
        ord_address: '1',
        ord_description: 'ord_description',
        pay_ref: this.state.pay_ref,
        pay_platform_id: 1,
        ord_price_bs: '5100',
        pay_type: '2',
        ord_prod_name: 'Orden nueva 2',
        ord_status: '1',
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.error) {
          alert('Por favor intente nuevamente');
        } else {
          Actions.allmyOrders();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  register = viewId => {
    Alert.alert('Estas seguro de los datos?', 'Gracias por preferirnos', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.sendOrder()},
    ]);
  };

  renderMobile() {
    return this.state.mobile.map(m => (
      <>
        <Text style={styles.loginSubTitle} h1>
          Pago Movil
        </Text>
        <Text style={styles.loginSubTitle} h1>
          Banco: {m.name}
        </Text>
        <Text style={styles.loginSubTitle} h1>
          N° teléfono: {m.phone}
        </Text>
        <Text style={styles.loginSubTitle} h1>
          N° Cédula: {m.ci}
        </Text>
      </>
    ));
  }

  renderBanks() {
    return this.state.banks.map(bank => (
      <TouchableOpacity
        onPress={() => this.setState({selectedPayment: bank.name})}>
        <Card style={{alignItems: 'center', width: 200}}>
          <Text style={styles.loginSubTitle2} h1>
            Banco: {bank.name}
          </Text>
          <Text style={styles.loginSubTitle2} h1>
            N° Cta: {bank.cta}
          </Text>
          <Text style={styles.loginSubTitle2} h1>
            Tipo de cuenta: {bank.type}
          </Text>
          <Text style={styles.loginSubTitle2} h1>
            Titular: {bank.titular}
          </Text>
          <Text style={styles.loginSubTitle2} h1>
            N° Cédula: {bank.ci}
          </Text>
          <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            containerStyle={{alignItems: 'flex-end'}}
            checked={this.state.selectedPayment === bank.name}
          />
        </Card>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.ConfirTitle} h1>
            Verificación de pago
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="ingrese el codigo referencia"
            keyboardType="phone-pad"
            underlineColorAndroid="transparent"
            onChangeText={pay_ref => this.setState({pay_ref})}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.register();
          }}>
          <Text style={styles.loginText}>Confirmar</Text>
        </TouchableHighlight>
        <Text style={styles.loginSubTitle} h1>
          Bancos
        </Text>

        {this.props.opType == 'P1' ? (
          <View style={{flexDirection: 'column'}}>{this.renderMobile()}</View>
        ) : (
          <ScrollView style={{flexDirection: 'column'}}>
            {this.renderBanks()}
          </ScrollView>
        )}
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
    fontFamily: 'QUICKSAND-LIGHT',
  },

  ConfirTitle: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 350,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 50,
    marginLeft: 12,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 270,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
  },
  loginText: {
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },

  loginSubTitle: {
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#bdbfc1',
  },
  loginSubTitle2: {
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
