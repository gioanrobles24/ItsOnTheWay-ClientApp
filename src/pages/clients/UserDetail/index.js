import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Avatar, AirbnbRating, Icon, Input} from 'react-native-elements';
import {green} from '../../../colors';
import {config} from '../../../config';
import request from '../../../utils/request';
import {useSelector, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {setUser as setStoreUser} from '../../../reducers/session';

export function UserDetail() {
  const storeSession = useSelector(state => state.session.user);
  const storeUser = storeSession.response.client_info;
  console.log(storeUser);
  const [user, setUser] = useState({
    // ...storeUser,
    cl_id: storeUser.id,
    cl_name: storeUser.cl_name,
    cl_email: storeUser.cl_email,
    cl_phone_1: storeUser.cl_phone_1,
    password: storeUser.password,
    cl_last_name: storeUser.cl_last_name,
    new_cl_email: storeUser.cl_email,
  });

  const dispatch = useDispatch();

  function confirmUpdate() {
    console.log(JSON.stringify(user, undefined, 2));
    console.log(Object.keys(user));
    if (Object.keys(user).some(k => !user[k])) {
      Alert.alert('Error', 'No puede haber campos vacios');
      return;
    }
    Alert.alert(
      'Actualizar',
      `¿Seguro quieres actualizar tu informacion personal?`,
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Si',
          onPress: () => {
            request(`${config.apiUrl}/clients/edit`, {
              method: 'POST',
              body: JSON.stringify(user),
            })
              .then(resp => {
                if (resp.response.error) {
                  throw new Error(resp.response.error);
                }
                const newSession = JSON.parse(JSON.stringify(storeSession));
                newSession.response.client_info = user;
                newSession.response.client_info.cl_email = user.new_cl_email;
                newSession.response.client_info.id = user.cl_id;
                dispatch(setStoreUser({...newSession}));
                Alert.alert('Actualización Exitosa');
                Actions.pop();
              })
              .catch(e => Alert.alert('Error', e.message));
          },
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1, padding: 20}}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre:</Text>
            <Input
              containerStyle={styles.inputText}
              inputStyle={{padding: 0}}
              value={user.cl_name}
              onChangeText={value => setUser({...user, cl_name: value})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Apellido:</Text>
            <Input
              containerStyle={styles.inputText}
              inputStyle={{padding: 0}}
              value={user.cl_last_name}
              onChangeText={value => setUser({...user, cl_last_name: value})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Telefono:</Text>
            <Input
              containerStyle={styles.inputText}
              inputStyle={{padding: 0}}
              value={user.cl_phone_1}
              keyboardType="phone-pad"
              onChangeText={value => setUser({...user, cl_phone_1: value})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Correo:</Text>
            <Input
              containerStyle={styles.inputText}
              inputStyle={{padding: 0}}
              value={user.new_cl_email}
              keyboardType="email-address"
              onChangeText={value => setUser({...user, new_cl_email: value})}
            />
          </View>
          <TouchableOpacity
            onPress={() => confirmUpdate()}
            style={{
              alignSelf: 'center',
              backgroundColor: green,
              height: 45,
              borderRadius: 5,
              width: 270,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Actualizar</Text>
          </TouchableOpacity>

          <View style={{marginTop: 100}}>
            <Text style={{color: green, fontWeight: 'bold', fontSize: 18}}>
              Contacta a It's on the way.
            </Text>
            <Text>soporte@itsontheway.net</Text>
            <Text>+58 0412 4249061</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    // marginVertical:,
    alignItems: 'flex-start',
    // alignItems: 'center',
  },
  inputLabel: {fontSize: 22, color: green, fontWeight: 'bold', width: 100},
  inputText: {flex: 1},
});
