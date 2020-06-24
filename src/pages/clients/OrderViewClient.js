import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {Badge, Avatar} from 'react-native-elements';
const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner'};
import {Card} from 'react-native-shadow-cards';
import RNPickerSelect from 'react-native-picker-select';

import store from '../../store';
import {connect} from 'react-redux';
import {address} from '../components/Data';
import ProductsInCart from '../components/ProductToCart';
import Recomendations from '../components/ProductHorizontalCarousel';
import HomeInfo from '../components/HomeComponent';
class OrderViewClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
    };
  }
  componentDidMount() {
    fetch(
      `http://dev.itsontheway.net/api/clients/address_client/${
        this.props.client_info.user.response.client_info.id
      }`,
    )
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp.response.address_client);
        this.setState({addresses: resp.response.address_client});
      });
  }

  ratingCompleted(rating) {}

  goTypePayment() {
    if (this.state.address) {
      let pedido = this.props.cartItems;
      Actions.paymentType({pedido});
    } else {
      Alert.alert('Selecciona una direccion');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Title} h1>
          Realizar pedido a :{' '}
        </Text>

        <View style={styles.containerProd}>
          <Text style={styles.SubTitle} h1>
            Listado de productos:
          </Text>

          {this.props.cartItems.length > 0 ? (
            <ProductsInCart products={this.props.cartItems} />
          ) : (
            <Text>Por favor agrega un producto</Text>
          )}
        </View>
        <View style={styles.containerProd2}>
          <Text style={styles.SubTitle} h1>
            Nota de pedido:
          </Text>
          <TextInput
            style={styles.inputs}
            placeholder="Coloca una Nota(opcional)"
            keyboardType="Text"
            underlineColorAndroid="transparent"
            onChangeText={ord_description => this.setState({ord_description})}
          />
        </View>
        <View style={styles.containerProd2}>
          <Text style={styles.SubTitle} h1>
            Dirección de pedido:{' '}
          </Text>
          <RNPickerSelect
            placeholder={{
              label: 'Seleciona una direccion`',
            }}
            items={this.state.addresses.map(z => ({
              label: `${z.zone_name} ${z.description}`,
              value: z.zone_id,
            }))}
            onValueChange={value => {
              this.setState({
                address: value,
              });
            }}
            style={{placeholder: {color: 'black'}}}
            // useNativeAndroidPickerStyle={true}
            hideIcon={true}
          />
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.goTypePayment();
          }}>
          <Text style={styles.loginText}>Pagar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
    client_info: state.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: product =>
      dispatch({type: 'REMOVE_FROM_CART', payload: product}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderViewClient);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  containerProd: {
    flex: 0.8,
    // alignItems: "center",
    // justifyContent: "center",
  },
  containerProd2: {
    flex: 0.4,
    // alignItems: "center",
    // justifyContent: "center",
  },
  containertitle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    height: 80,
  },

  menuText: {
    fontSize: 25,
    alignSelf: 'flex-end',
    color: '#373535',
  },
  cardBadge: {
    alignSelf: 'center',
  },
  Title: {
    fontSize: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#373535',
    marginTop: 20,
    marginLeft: 20,
  },
  SubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 270,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
    alignSelf: 'center',
  },
  loginText: {
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },
});
