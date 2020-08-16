import React, {useState} from 'react';
import {Text, View, ScrollView, Alert} from 'react-native';
import {Avatar, AirbnbRating} from 'react-native-elements';
import {green} from '../../../colors';
import {config} from '../../../config';
import request from '../../../utils/request';

export function DeliverymanDetail({deliveryman}) {
  const [rating, setRating] = useState();

  async function sendRating(rating) {
    try {
      const result = await request(`${config.apiUrl}/clients/rate_dm`, {
        method: 'POST',
        body: JSON.stringify({ord_id: deliveryman.ord_id, ord_rate: rating}),
      });
      if (result.status !== '200') {
        throw result;
      }
    } catch (e) {
      console.log(e);
      setRating(null);
      Alert.alert('Error');
    }
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Avatar
            rounded
            size="xlarge"
            overlayContainerStyle={{backgroundColor: green}}
            containerStyle={{
              alignSelf: 'center',
              flexDirection: 'column',
              marginTop: 20,
              backgroundColor: 'white',
            }}
            // source={image}
          />
          <View>
            <Text style={{fontSize: 18, marginTop: 20}}>
              <Text style={{color: green}}>Nombre:</Text> {deliveryman.dm_name}
            </Text>
            <Text style={{fontSize: 18, marginTop: 5}}>
              <Text style={{color: green}}>Cédula:</Text> {deliveryman.dm_dni}
            </Text>
            <Text style={{fontSize: 18, marginTop: 5}}>
              <Text style={{color: green}}>Teléfono:</Text>{' '}
              {deliveryman.dm_phone_1}
            </Text>
            <Text style={{fontSize: 18, marginTop: 5}}>
              <Text style={{color: green}}>Correo:</Text> {deliveryman.dm_email}
            </Text>
            <Text style={{fontSize: 18, marginTop: 5}}>
              <Text style={{color: green}}>Nombre:</Text> {deliveryman.dm_name}
            </Text>
            <View
              style={{
                marginTop: 100,
                alignItems: 'center',
              }}>
              <Text>Calificar</Text>
              <AirbnbRating
                showRating={false}
                defaultRating={0}
                isDisabled={rating != null}
                size={25}
                onFinishRating={rating => {
                  Alert.alert(
                    'Calificar',
                    `¿Seguro quieres calificar al repartidor con un ${rating}?`,
                    [
                      {
                        text: 'No',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'Si',
                        onPress: () => {
                          setRating(rating);
                          // sendRating(rating);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
