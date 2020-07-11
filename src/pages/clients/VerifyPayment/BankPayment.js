import React, {Component, useState} from 'react';
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
  Platform,
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
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';

export function BankPayment({address, description}) {
  const banks = [
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
  ];
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [photo, setPhoto] = useState();
  const [ref, setRef] = useState();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector(state => state.cart);

  function selectRef() {
    ImagePicker.showImagePicker({}, res => {
      if (res.error) {
        Alert.alert(res.error);
      } else if (!res.didCancel) {
        setPhoto(res);
      }
    });
  }

  function confirmOrder() {
    if (!ref) {
      Alert.alert('Indique el numero de referencia');
    } else if (!selectedPayment) {
      Alert.alert('Seleccione un banco');
    } else {
      const data = new FormData();
      const body = {
        ord_address: address.client_address_id,
        ord_description: description,
        bank_name: selectedPayment,
        ref_pay: ref,
        products: JSON.stringify(
          cartItems.map(item => ({
            prod_id: item.id,
            quantity: item.quantity,
            extras: item.extras.map(e => e.extra_id),
          })),
        ),
      };
      if (photo) {
        data.append('ref_pay_image', {
          name: photo.fileName,
          type: photo.type,
          uri:
            Platform.OS === 'android'
              ? photo.uri
              : photo.uri.replace('file://', ''),
        });
      }
      Object.keys(body).forEach(key => {
        if (body[key] !== undefined) {
          data.append(key, body[key]);
        }
      });

      setLoading(true);
      fetch('http://test.itsontheway.com.ve/api/clients/neworder', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        body: data,
      })
        .then(resp => {
          return resp.json();
        })
        .then(resp => {
          console.log(resp);
          if (resp.error) {
            Alert.alert(resp.error);
          } else {
            Actions.popTo('homeClient');
            Actions.push('allmyOrders');
          }
        })
        .catch(e => {
          console.log(e);
          Alert.alert('Error');
        })
        .finally(() => setLoading(false));
    }
  }

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
          value={ref}
          onChangeText={setRef}
          placeholder="ingrese el numero referencia"
          keyboardType="phone-pad"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton, {flex: 0.7}]}
          onPress={() => {
            selectRef();
          }}>
          <Text style={styles.loginText}>Agregar Captura</Text>
        </TouchableHighlight>
        {photo && (
          <View style={{flex: 0.2}}>
            <Image
              source={photo}
              style={{
                flex: 1,
                height: undefined,
                width: undefined,
                marginLeft: 20,
              }}
            />
          </View>
        )}
      </View>
      <Text style={styles.loginSubTitle} h1>
        Bancos
      </Text>
      <ScrollView style={{flexDirection: 'column'}}>
        {banks.map(bank => (
          <TouchableOpacity onPress={() => setSelectedPayment(bank.name)}>
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
                onPress={() => setSelectedPayment(bank.name)}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={{alignItems: 'flex-end'}}
                checked={selectedPayment === bank.name}
              />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableHighlight
        style={[styles.buttonContainer, styles.loginButton]}
        disabled={loading}
        onPress={() => {
          confirmOrder();
        }}>
        <Text style={styles.loginText}>Confirmar</Text>
      </TouchableHighlight>
    </View>
  );
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
