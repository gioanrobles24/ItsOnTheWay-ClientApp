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
import {useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';

export function UserDetail() {
  const [user, setUser] = useState(
    useSelector(state => state.session.user.response.client_info),
  );

  function confirmUpdate() {
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
              value={user.cl_email}
              keyboardType="email-address"
              onChangeText={value => setUser({...user, cl_email: value})}
            />
          </View>
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
