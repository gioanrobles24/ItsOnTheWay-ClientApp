/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, Alert, View} from 'react-native';
import {
  Avatar,
  Badge,
  ListItem,
  AirbnbRating,
  Rating,
} from 'react-native-elements';
import {getStatusText} from './AllMyOrdersClient';
import {Actions} from 'react-native-router-flux';
import ProductsInCart from '../components/ProductToCart';
import {ScrollView} from 'react-native-gesture-handler';
import {green} from '../../colors';
import {useSelector} from 'react-redux';
import {config} from '../../config';
import request from '../../utils/request';

const image = {uri: 'http://test.itsontheway.com.ve/api/imgBlanca'};

function getProductPrice(item) {
  let extraPrice = 0;
  item.extras.forEach(e => {
    extraPrice += parseFloat(e.extra_price_usd);
  });
  return (parseFloat(item.prod_price_usd) + extraPrice) * item.quantity;
}

export function OrderDetail({orderId, navigation}) {
  const [order, setOrder] = useState({products: []});
  const [rating, setRating] = useState(null);
  const dollarPrice = parseFloat(
    useSelector(state => state.parameters.dollarPrice),
  );

  useEffect(() => {
    navigation.setParams({
      title: `Pedido #${orderId}`,
    });

    request(`${config.apiUrl}/clients/orders_detail/${orderId}`)
      .then(obj => {
        console.log(obj);
        if (obj.response.error) {
          Alert.alert('Error');
          Actions.pop();
        } else {
          setRating(parseInt(obj.response.order.ord_rate, 10));
          setOrder({
            ...obj.response.order,
            products: obj.response.order_productos.map(p => ({
              ...p,
              quantity: p.prod_quantity,
              prod_price_usd: p.prod_price_usd.replace(',', '.'),
              extras: p.extras.map(e => ({
                ...e,
                extra_name: e.pe_name,
                extra_price_usd: e.extra_price.replace(',', '.'),
              })),
            })),
          });
        }
      })
      .catch(e => {
        Alert.alert('Error');
        Actions.pop();
      });
  }, [orderId]);

  async function sendRating(rating) {
    try {
      const result = await request(`${config.apiUrl}/clients/rate_order`, {
        method: 'POST',
        body: JSON.stringify({ord_id: orderId, ord_rate: rating}),
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

  let subTotal = 0;
  order.products.forEach(item => {
    subTotal += getProductPrice(item);
  });

  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        flexGrow: 1,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: '#dedede',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, color: green}}>Estado del pedido</Text>
        <Badge
          value={getStatusText(order.ord_status)}
          badgeStyle={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: green,
          }}
          containerStyle={{
            marginVertical: 10,
            alignSelf: 'flex-start',
          }}
          textStyle={{fontSize: 16}}
        />
      </View>
      <View style={{flexGrow: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <ProductsInCart
            haveDelete={false}
            haveImage={false}
            products={order.products}
            dollarPrice={dollarPrice}
          />
          <View>
            <Text
              style={{
                fontSize: 16,
                alignSelf: 'flex-end',
                marginTop: 10,
              }}>
              <Text style={{fontWeight: 'bold'}}>Total: </Text>
              Bs {(subTotal * dollarPrice).toLocaleString()} ($
              {subTotal.toLocaleString()})
            </Text>
          </View>
          <View
            style={{
              marginTop: 100,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: green, marginRight: 10}}>
              Calificar a {order.products[0].p_user}:{' '}
            </Text>
            <AirbnbRating
              showRating={false}
              size={25}
              defaultRating={rating}
              isDisabled={rating === null || rating !== 0}
              onFinishRating={rating => {
                Alert.alert(
                  'Calificar',
                  `¿Seguro quieres calificar esta orden con un ${rating}?`,
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
        </ScrollView>
      </View>
    </View>
  );
}
