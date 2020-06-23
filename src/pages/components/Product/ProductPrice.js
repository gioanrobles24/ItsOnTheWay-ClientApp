import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
export function ProductPrice({product}) {
  const dollarPrice = parseFloat(useSelector(state => state.dollarPrice.price));
  const [showDollar, setShowDollar] = useState(true);
  let price = parseFloat(product.prod_price_bs);
  if (showDollar) {
    price = price / dollarPrice;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => setShowDollar(d => !d)}
        style={{
          width: 100,
          borderRadius: 5,
          height: 45,
          backgroundColor: '#a9d046',
          justifyContent: 'center',
          shadowColor: 'black',
          elevation: 5,
          shadowOffset: {width: 5, height: 5},
          shadowOpacity: 0.5,
          shadowRadius: 0.8,
        }}>
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 10,
            borderRightWidth: 10,
            borderBottomWidth: 13,
            // borderRadius: 10,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#a9d046',
            position: 'absolute',
            right: -12,
            rotation: 90,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          {showDollar ? '$' : 'BsS'}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          width: '45%',
          fontSize: 40,
          marginLeft: 50,
          fontWeight: 'bold',
          color: '#031f30',
        }}>
        {parseFloat(price.toFixed(2)).toLocaleString('es-VE')}
      </Text>
    </View>
  );
}
