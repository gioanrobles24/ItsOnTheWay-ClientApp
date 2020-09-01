import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Alert, StyleSheet} from 'react-native';
import {Avatar, AirbnbRating, Icon} from 'react-native-elements';
import {green} from '../../../colors';
import {config} from '../../../config';
import request from '../../../utils/request';

export function DeliverymanDetail({deliveryman}) {
  const [rating, setRating] = useState(parseInt(deliveryman.ord_dm_rate, 10));
  const [avg, setAvg] = useState();
  console.log(rating);

  useEffect(() => {
    (async function() {
      const {response} = await request(
        `${config.apiUrl}/delivery/dm_rate/${deliveryman.dm_id}`,
      );

      if (response.status == '200') {
        setAvg(response.prom);
      }
    })();
  }, [deliveryman.dm_id]);

  async function sendRating(rating) {
    try {
      const result = await request(`${config.apiUrl}/clients/rate_dm`, {
        method: 'POST',
        body: JSON.stringify({ord_id: deliveryman.ord_id, ord_dm_rate: rating}),
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

  console.log(
    `${config.imagesUrl}/images/repartidores/${deliveryman.dm_id}/${
      deliveryman.dm_profile_pic
    }`,
  );

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
            source={{
              uri: `${config.imagesUrl}/images/repartidores/${
                deliveryman.dm_id
              }/${deliveryman.dm_profile_pic}`,
            }}
          />
          <View>
            <Text style={{...styles.deliveryDetail, marginTop: 30}}>
              <Text style={{color: green}}>Nombre:</Text> {deliveryman.dm_name}
            </Text>
            <Text style={styles.deliveryDetail}>
              <Text style={{color: green}}>Cédula:</Text> {deliveryman.dm_dni}
            </Text>
            <Text style={styles.deliveryDetail}>
              <Text style={{color: green}}>Teléfono:</Text>{' '}
              {deliveryman.dm_phone_1}
            </Text>
            <Text style={styles.deliveryDetail}>
              <Text style={{color: green}}>Correo:</Text> {deliveryman.dm_email}
            </Text>
            <View
              style={{
                ...styles.deliveryDetail,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18}}>
                <Text style={{color: green}}>Rating:</Text> {avg}
              </Text>
              <Icon name="star" color="#eded26" />
            </View>
            <View
              style={{
                marginTop: 100,
                alignItems: 'center',
                marginBottom: 100,
              }}>
              <Text>Calificar</Text>
              <AirbnbRating
                showRating={false}
                defaultRating={rating}
                isDisabled={rating != null && !isNaN(rating)}
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
                          sendRating(rating);
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

const styles = StyleSheet.create({
  deliveryDetail: {fontSize: 18, marginTop: 20},
});
