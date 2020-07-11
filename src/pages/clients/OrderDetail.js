/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, Alert, View} from 'react-native';
import {Avatar, Badge, ListItem} from 'react-native-elements';
import {getStatusText} from './AllMyOrdersClient';
import {Actions} from 'react-native-router-flux';
import ProductsInCart from '../components/ProductToCart';
import {ScrollView} from 'react-native-gesture-handler';
import {green} from '../../colors';
import {useSelector} from 'react-redux';

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
  const dollarPrice = parseFloat(useSelector(state => state.dollarPrice.price));

  useEffect(() => {
    navigation.setParams({
      title: `Pedido #${orderId}`,
    });

    fetch(`http://test.itsontheway.com.ve/api/clients/orders_detail/${orderId}`)
      .then(resp => resp.json())
      .then(obj => {
        if (obj.response.error) {
          Alert.alert('Error');
          Actions.pop();
        } else {
          console.log(JSON.stringify(obj.response, undefined, 2));
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

  let subTotal = 0;
  order.products.forEach(item => {
    subTotal += getProductPrice(item);
  });

  return (
    <View style={{flex: 1, padding: 30, flexGrow: 1}}>
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
              Bs {subTotal * dollarPrice} (${subTotal})
            </Text>
          </View>
        </ScrollView>

        {/* {order.products.map(p => (
          <ListItem
            leftAvatar={{
              source: {
                uri: `http://test.itsontheway.com.ve/images/productos/${
                  p.prod_partner_id
                }/${p.prod_image}`,
              },
            }}
            title={p.prod_name}
            subtitle={p.prod_description}
            bottomDivider
          />
        ))} */}
      </View>
    </View>
  );
}
