import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Icon,
  Avatar,
  Badge,
  withBadge,
  Image,
  Input,
  Card,
} from 'react-native-elements';
const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner1'};
import {AirbnbRating} from 'react-native-ratings';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

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
  renderProducts(products) {
    return products.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity>
            <Card
              containerStyle={{
                flexDirection: 'row',
                width: 250,
                marginLeft: 20,
                marginTop: 30,
              }}
              imageStyle={{width: 249, height: 130}}
              image={{
                uri: `http://dev.itsontheway.net/images/productos/${
                  item.prod_partner_id
                }/${item.prod_image}`,
              }}>
              <Text style={{fontSize: 20, marginLeft: 5}}>
                {item.prod_name}
              </Text>
              <Text style={{fontSize: 15, color: '#bdbfc1', marginLeft: 5}}>
                {item.partner_user}
              </Text>

              <View style={{flexDirection: 'row', marginLeft: 5}}>
                <AirbnbRating
                  isDisabled={true}
                  showRating={false}
                  defaultRating={4}
                  size={15}
                />
                <Text style={{fontSize: 10, marginLeft: 30}}>
                  Bs.: {item.prod_price_bs}
                </Text>
                <Icon
                  raised
                  name="times"
                  type="font-awesome"
                  color="red"
                  size={20}
                  onPress={() => this.confirmRemoveProduct(item)}
                  containerStyle={{position: 'absolute', top: -4, right: -35}}
                />
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {this.renderProducts(this.props.products)}
        </ScrollView>
      </View>
    );
  }
}

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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
