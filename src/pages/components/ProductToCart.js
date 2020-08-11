import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {gray, green} from '../../colors';
import {config} from '../../config';

class ProductsInCart extends Component {
  confirmRemoveProduct(product) {
    Alert.alert(
      'Eliminar Producto',
      '¿Seguro quieres eliminar el producto de tu pedido?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Si',
          onPress: () => {
            this.props.removeProduct(product);
          },
        },
      ],
      {cancelable: false},
    );
  }

  getProductPrice(item) {
    let extraPrice = 0;
    item.extras.forEach(e => {
      extraPrice += parseFloat(e.extra_price_usd);
    });
    return (parseFloat(item.prod_price_usd) + extraPrice) * item.quantity;
  }

  renderProducts(products) {
    return products.map(item => {
      const presentation = item.extras.find(extra => extra.extra_type === '1');
      const extras = item.extras
        .filter(extra => extra.extra_type !== '1')
        .map(extra => extra.extra_name);

      const price = this.getProductPrice(item);
      const bsPrice = price * this.props.dollarPrice;
      return (
        <ListItem
          title={`(${item.quantity}) ${item.prod_name}`}
          titleStyle={{
            fontWeight: 'bold',
            ...styles.grayText,
          }}
          subtitle={
            <View>
              <Text style={{...styles.grayText}}>
                Presentación: {presentation ? presentation.extra_name : 'No'}
              </Text>
              <Text style={{...styles.grayText}}>
                Extras: {extras.length > 0 ? `${extras.join(', ')}` : ' No'}
              </Text>
              <Text style={{color: green}}>
                <Text style={styles.grayText}>Precio: </Text>
                Bs {bsPrice.toLocaleString()} (${price.toLocaleString()})
              </Text>
            </View>
          }
          rightIcon={
            this.props.haveDelete
              ? {
                  type: 'font-awesome',
                  name: 'times',
                  color: 'red',
                  onPress: () => this.confirmRemoveProduct(item),
                }
              : undefined
          }
          leftAvatar={
            this.props.haveImage
              ? {
                  source: {
                    uri: `${config.imagesUrl}/images/productos/${
                      item.prod_partner_id
                    }/${item.prod_image}`,
                  },
                }
              : undefined
          }
          bottomDivider
          // chevron
        />
      );
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView nestedScrollEnabled>
          {this.renderProducts(this.props.products)}
        </ScrollView>
      </View>
    );
  }
}

ProductsInCart.defaultProps = {
  haveImage: true,
  haveDelete: true,
};

const mapDispatchToProps = dispatch => {
  return {
    removeProduct: product =>
      dispatch({type: 'REMOVE_FROM_CART', payload: product}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ProductsInCart);

const styles = StyleSheet.create({
  grayText: {
    color: gray,
  },

  container: {
    maxHeight: '30%',
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
