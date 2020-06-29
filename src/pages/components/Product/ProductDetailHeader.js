import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Avatar} from 'react-native-elements';
export function ProductDetailHeader({title, product}) {
  return (
    <View style={styles.header}>
      <Text style={styles.Title}>{title}</Text>
      <Avatar
        rounded
        size={120}
        source={{
          uri: `http://dev.itsontheway.net/images/productos/${
            product.prod_partner_id
          }/${product.prod_image}`,
        }}
      />
      {/* <Avatar /> */}
    </View>
  );
}
