import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Avatar} from 'react-native-elements';
import {gray} from '../../../colors';
export function ProductDetailHeader({title, product}) {
  return (
    <View style={styles.header}>
      <Avatar
        rounded
        size={120}
        source={{
          uri: `http://test.itsontheway.com.ve/images/productos/${
            product.prod_partner_id
          }/${product.prod_image}`,
        }}
      />
      <View style={{flex: 1, padding: 10}}>
        <Text style={{color: gray, fontWeight: 'bold'}}>Descripción</Text>
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
          }}>
          <Text style={{flex: 1, flexShrink: 1, color: gray}}>{title}</Text>
        </View>
      </View>
      {/* <Avatar /> */}
    </View>
  );
}
