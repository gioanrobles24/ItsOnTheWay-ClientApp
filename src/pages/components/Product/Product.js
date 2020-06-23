import React, {Component, useState} from 'react';
import {View, ScrollView, Alert, TouchableHighlight, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Input, Icon, Button} from 'react-native-elements';
import {ProductDetailHeader} from './ProductDetailHeader';
import {ProductCounter} from './ProductCounter';
import {ProductExtras} from './ProductExtras';
import {ProductPrice} from './ProductPrice';
import {styles} from './styles';
import {useDispatch} from 'react-redux';

function ProductDetail(props) {
  const {products: product} = props;
  const [qty, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  function onAddPress() {
    dispatch({type: 'ADD_TO_CART', payload: product});
    Alert.alert(
      'Producto Agregado',
      '¿Que deseas hacer?',
      [
        {
          text: 'Seguir comprando',
          onPress: () => Actions.pop(),
          style: 'cancel',
        },
        {text: 'Ir a tu pedido', onPress: () => Actions.orderClient()},
      ],
      {cancelable: false},
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <ProductDetailHeader title={product.prod_name} />
          <ProductCounter quantity={qty} onChange={setQuantity} />
          <ProductExtras title="Presentaciones" />
          <ProductExtras title="Extras" />
          <View>
            <Input
              containerStyle={{paddingHorizontal: 0, marginVertical: 30}}
              label="Nota"
              value={comment}
              onChange={setComment}
              placeholder="Escribir nota"
            />
          </View>
        </View>
      </ScrollView>
      <View style={{marginBottom: 30}}>
        <ProductPrice product={product} />
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={onAddPress}>
          <Text style={styles.loginText}>Agregar al pedido </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ProductDetail;
