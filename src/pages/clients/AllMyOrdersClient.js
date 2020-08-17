import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import {Card} from 'react-native-shadow-cards';
import {useSelector} from 'react-redux';
import {config} from '../../config';
const image = {uri: `${config.apiUrl}/imgBlanca`};

export default function AllMyOrdersClientView(props) {
  const userId = useSelector(
    state => state.session.user.response.client_info.id,
  );
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/clients/orders_client/${userId}`)
      .then(resp => resp.json())
      .then(obj => {
        if (obj.response.error) {
          Alert.alert('Error');
        } else {
          setOrders(obj.response.orders);
        }
      })
      .catch(e => {
        Alert.alert('Error');
      });
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Title}>Mis Pedidos</Text>
      </View>

      <View style={styles.cardOrdercontainer}>
        <ScrollView>
          {orders.map(order => (
            <TouchableOpacity
              onPress={() => {
                Actions.orderDetail({orderId: order.ord_id});
                // Alert.alert('Click');
              }}>
              <Card style={styles.cardOrder}>
                <View style={{flexDirection: 'row', flex: 0.8}}>
                  <Avatar rounded size="medium" source={image} />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.cardOrderSubTitle}>{order.ord_id}</Text>
                    <Badge
                      value={getStatusText(order.ord_status)}
                      badgeStyle={{paddingVertical: 10, paddingHorizontal: 10}}
                      containerStyle={{marginVertical: 10, marginLeft: 10}}
                      textStyle={{fontSize: 14}}
                    />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export function getStatusText(id) {
  switch (id) {
    case '0':
      return 'Repartidor Asignado';
    case '1':
      return 'Sin Aprobar';
    case '2':
      return 'Aprobada por Admin';
    case '3':
      return 'Aprobada por Socio';
    case '4':
      return 'Entregada Cliente';
    case '5':
      return `It's on the way`;
    case '6':
      return 'Espera de Repartidor';
    default:
      return 'Desconocido';
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },

  loginTitle: {
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
    width: 400,
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
  cardOrdercontainer: {
    flexDirection: 'row',
  },

  cardOrder: {
    marginTop: 30,
    padding: 20,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 8,
  },
  cardOrderSubTitle: {
    fontSize: 20,
    marginLeft: 10,
  },

  header: {
    marginVertical: 15,
  },
  Title: {
    fontSize: 30,
    textAlign: 'center',
    color: '#373535',
    // marginTop: 5
    // alignItems: 'flex-start'
  },
});
