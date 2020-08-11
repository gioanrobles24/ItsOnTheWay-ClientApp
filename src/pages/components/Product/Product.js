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
import {config} from '../../../config';

function getPartner(partnerId) {
  return fetch(`${config.apiUrl}/clients/showPartner/${partnerId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.error) {
        throw new Error(responseData.error);
      } else {
        return responseData.response.partner;
      }
    });
}

function getStatus() {
  return fetch(`${config.apiUrl}/working_status`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.error) {
        alert(' por favor intenta nuevamente');
      } else {
        try {
          return responseData.success.status;
        } catch (e) {
          return false;
        }
      }
    });
}

function ProductDetail(props) {
  const {products: product} = props;
  const [qty, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`${config.apiUrl}/api/clients/products_extras/${product.id}`)
      .then(resp => resp.json())
      .then(resp => {
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

  async function onAddPress() {
    const partner = await getPartner(product.prod_partner_id);
    const status = await getStatus();

    if (!partner.is_open || !status) {
      Alert.alert('Tienda cerrada');
      return;
    }
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
        {
          text: 'Ir a tu pedido',
          onPress: () => {
            Actions.replace('orderClient');
            // Actions.orderClient();
          },
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <ProductDetailHeader
            title={product.prod_description}
            product={product}
          />
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
