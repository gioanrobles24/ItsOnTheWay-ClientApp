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
import {inputStyle, green} from '../../../colors';
import RNPickerSelect from 'react-native-picker-select';

export function MobilePayment({address, description, price, ...props}) {
  const banks = [
    {
      name: 'Bancaribe',
      phone: '04144537395',
      ci: '13115089',
    },
    {
      name: 'Provincial',
      phone: '04144537395',
      ci: '13115089',
    },
  ];
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [photo, setPhoto] = useState();
  const [ref, setRef] = useState();
  const [phone, setPhone] = useState();
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
    if (!ref || !phone || !selectedBank) {
      Alert.alert('Indique el numero de referencia, el banco y el telefono');
    } else if (!selectedPayment) {
      Alert.alert('Seleccione un banco');
    } else {
      const data = new FormData();
      const body = {
        ord_address: address.client_address_id,
        ord_description: description,
        bank_id: selectedBank,
        bank_name: `${selectedPayment} - ${phone}`,
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
      <RNPickerSelect
        Icon={() => (
          <Icon
            type="font-awesome"
            name="chevron-down"
            color={green}
            style={{textAlignVertical: 'center'}}
          />
        )}
        placeholder={{
          label: 'Seleciona una dirección existente`',
          color: 'black',
        }}
        items={props.banks.map(bank => ({
          label: bank.bank_name,
          value: bank.id,
        }))}
        onValueChange={value => {
          setSelectedBank(value);
        }}
        useNativeAndroidPickerStyle={false}
        style={{
          inputAndroid: inputStyle,
          iconContainer: {
            top: 20,
            right: 12,
          },
          // placeholder: {color: 'black'},
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          value={ref}
          onChangeText={setRef}
          placeholder="ingrese el numero referencia"
          keyboardType="phone-pad"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          value={phone}
          onChangeText={setPhone}
          placeholder="ingrese el numero de telefono"
          keyboardType="phone-pad"
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
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
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontSize: 18}}>
          Total <Text style={{color: green}}>Bs. {price.toLocaleString()}</Text>
        </Text>
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
                Telefono: {bank.phone}
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
        disabled={loading}
        style={[styles.buttonContainer, styles.loginButton]}
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
    paddingHorizontal: 30,
    marginTop: 20,
  },

  ConfirTitle: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
  },
  inputContainer: {
    width: '100%',
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
    alignSelf: 'center',
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
