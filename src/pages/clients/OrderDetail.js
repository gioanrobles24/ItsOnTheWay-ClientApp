/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, Alert, View} from 'react-native';
import {Avatar, Badge, ListItem} from 'react-native-elements';
import {getStatusText} from './AllMyOrdersClient';
import {Actions} from 'react-native-router-flux';
import ProductsInCart from '../components/ProductToCart';
import {ScrollView} from 'react-native-gesture-handler';
import {green} from '../../colors';

const image = {uri: 'http://test.itsontheway.com.ve/api/imgBlanca'};

export function OrderDetail({orderId, navigation}) {
  const [order, setOrder] = useState({products: []});

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
            products: obj.response.order_productos,
          });
        }
      })
      .catch(e => {
        Alert.alert('Error');
        Actions.pop();
      });
  }, [orderId]);

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
        {/* <Avatar size="large" rounded source={image} />
        <View style={{marginLeft: 15}}>
          <Text style={{fontSize: 28}}>{(order.products[0] || {}).p_user}</Text>
        </View> */}
      </View>
      <View style={{flexGrow: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <ProductsInCart
            haveDelete={false}
            haveImage={false}
            products={order.products.map(p => ({...p, extras: []}))}
            dollarPrice={200}
          />
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
