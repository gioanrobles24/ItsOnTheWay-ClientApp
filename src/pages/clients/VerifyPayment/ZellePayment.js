import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card, CheckBox} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {green, inputStyle} from '../../../colors';
import {config} from '../../../config';
import Spinner from 'react-native-loading-spinner-overlay';

export function ZellePayment({address, description, price, deliveryPrice}) {
  const banks = [
    {
      name: 'Zelle',
      description: 'Its for delivery corp.',
      email: 'pagos@itsontheway.net',
    },
  ];
  const [selectedPayment, setSelectedPayment] = useState('Zelle');
  const [photo, setPhoto] = useState();
  const [ref, setRef] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
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
    if (!ref || !email || !name) {
      Alert.alert(
        'Indique el numero, telefono y nombre de la persona que realiza la transferencia',
      );
    } else if (!selectedPayment) {
      Alert.alert('Seleccione un banco');
    } else {
      const data = new FormData();
      const body = {
        ord_address: address.client_address_id,
        ord_description: description,
        pay_by_zelle: '1',
        zelle_email: email,
        zelle_name: name,
        order_dm_val: deliveryPrice,
        // bank_name: `${selectedPayment}`,
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

      console.log(data);

      setLoading(true);
      fetch(`${config.apiUrl}/clients/neworder`, {
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
      <Spinner visible={loading} textContent={'Cargando...'} />
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
          value={email}
          onChangeText={setEmail}
          placeholder="Correo que envia el pago"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          value={name}
          onChangeText={setName}
          placeholder="Nombre de la persona que envia el pago"
        />
      </View>

      <View style={{flexDirection: 'row', marginTop: 20, alignSelf: 'center'}}>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton, {flex: 0.7}]}
          onPress={() => {
            selectRef();
          }}>
          <Text style={styles.loginText}>Agregar Captura</Text>
        </TouchableOpacity>
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
          <Text style={{color: green, fontWeight: 'bold'}}>Total </Text>$
          {price.toLocaleString()}
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
                {bank.name}
              </Text>
              <Text style={styles.loginSubTitle2} h1>
                Nombre: {bank.description}
              </Text>
              <Text style={styles.loginSubTitle2} h1>
                Correo: {bank.email}
              </Text>
              <CheckBox
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
    // borderBottomColor: '#bdbfc1',
    // backgroundColor: '#FFFFFF',
    // borderRadius: 30,
    // borderBottomWidth: 1,
    // width: 350,
    // height: 55,
    // marginBottom: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  inputs: {
    marginTop: 5,
    borderRadius: 15,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    borderColor: green,
    borderWidth: 2,
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
