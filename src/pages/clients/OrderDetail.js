import React, {useState, useEffect} from 'react';
import {Text, Alert, View} from 'react-native';
import {Avatar, Badge, ListItem} from 'react-native-elements';
import {getStatusText} from './AllMyOrdersClient';
import {Actions} from 'react-native-router-flux';
const image = {uri: 'http://dev.itsontheway.net/api/imgBlanca'};

export function OrderDetail({orderId}) {
  const [order, setOrder] = useState({products: []});

  useEffect(() => {
    fetch(`http://dev.itsontheway.net/api/clients/orders_detail/${orderId}`)
      .then(resp => resp.json())
      .then(obj => {
        if (obj.response.error) {
          Alert.alert('Error');
          Actions.pop();
        } else {
          console.log(obj.response);
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
    <View style={{flex: 1, padding: 30}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor: '#dedede',
        }}>
        <Avatar size="large" rounded source={image} />
        <View style={{marginLeft: 15}}>
          <Text style={{fontSize: 18}}>Pedido: {order.ord_id}</Text>
          <Text style={{fontSize: 28}}>{(order.products[0] || {}).p_user}</Text>
          <Badge
            value={getStatusText(order.ord_status)}
            badgeStyle={{paddingVertical: 15, paddingHorizontal: 10}}
            containerStyle={{
              marginVertical: 10,
              alignSelf: 'flex-start',
            }}
            textStyle={{fontSize: 16}}
          />
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 18}}>Productos</Text>
        {order.products.map(p => (
          <ListItem
            leftAvatar={{
              source: {
                uri: `http://dev.itsontheway.net/images/productos/${
                  p.prod_partner_id
                }/${p.prod_image}`,
              },
            }}
            title={p.prod_name}
            subtitle={p.prod_description}
            bottomDivider
          />
        ))}
      </View>
    </View>
  );
}
