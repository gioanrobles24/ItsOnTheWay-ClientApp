import React, {Component, useState, useEffect} from 'react';
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
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  console.log(product);

  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(
      `http://dev.itsontheway.net/api/clients/products_extras/${product.id}`,
    )
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp.response.prod_extras);
        const extras = [];
        const sizes = [];
        if (!resp.error) {
          resp.response.prod_extras.forEach(e => {
            if (e.extra_type === '1') {
              sizes.push(e);
            } else {
              extras.push(e);
            }
          });
          setSizes(sizes);
          setExtras(extras);
        }
      });
  }, [product.id]);

  function onAddPress() {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        extras: selectedSize
          ? [...selectedExtras, selectedSize]
          : selectedExtras,
        quantity: qty,
        comment,
      },
    });
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
          <ProductDetailHeader title={product.prod_name} product={product} />
          <ProductCounter quantity={qty} onChange={setQuantity} />
          <ProductExtras
            title="Presentaciones"
            extras={sizes}
            onChange={setSelectedSize}
            radio
          />
          <ProductExtras
            title="Extras"
            extras={extras}
            onChange={setSelectedExtras}
          />
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
        <ProductPrice
          product={product}
          extras={
            selectedSize ? [...selectedExtras, selectedSize] : selectedExtras
          }
          quantity={qty}
        />
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
