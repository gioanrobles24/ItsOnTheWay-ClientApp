import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

import {connect} from 'react-redux';
import ProductsInCart from '../components/ProductToCart';
import {gray, green} from '../../colors';
import {setAddresses} from '../../reducers/addresses';

class OrderViewClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
    };
  }
  componentDidMount() {
    fetch(
      `http://test.itsontheway.com.ve/api/clients/address_client/${
        this.props.client_info.user.response.client_info.id
      }`,
    )
      .then(resp => resp.json())
      .then(resp => {
        this.props.setAddresses(resp.response.address_client);
      });
  }

  ratingCompleted(rating) {}

  goTypePayment() {
    if (!this.state.address) {
      Alert.alert('Selecciona una direccion');
      return;
    } else if (this.props.cartItems.length === 0) {
      Alert.alert('No ha seleccionado ningun producto');
      return;
    }

    let pedido = this.props.cartItems;
    Actions.paymentType({
      pedido,
      description: this.state.ord_description,
      address: this.props.addresses.find(
        ad => ad.client_address_id === this.state.address,
      ),
    });
  }
  getProductPrice(item) {
    let extraPrice = 0;
    item.extras.forEach(e => {
      extraPrice += parseFloat(e.extra_price_usd);
    });
    return (parseFloat(item.prod_price_usd) + extraPrice) * item.quantity;
  }

  getSubTotal() {
    let price = 0;
    this.props.cartItems.forEach(item => {
      price += this.getProductPrice(item);
    });
    return price;
  }

  render() {
    const subTotal = this.getSubTotal();
    const windowHeight = Dimensions.get('window').height;

    return (
      <View>
        <ScrollView contentContainerStyle={{height: 'auto'}}>
          <View style={{height: windowHeight}}>
            <ProductsInCart
              products={this.props.cartItems}
              dollarPrice={this.props.dollarPrice}
            />
            <View style={styles.contentContainer}>
              <Text
                style={{
                  ...styles.grayText,
                  fontSize: 16,
                  alignSelf: 'flex-end',
                }}>
                <Text style={{fontWeight: 'bold'}}>Subtotal: </Text>
                Bs {(subTotal * this.props.dollarPrice).toLocaleString()} ($
                {subTotal.toLocaleString()})
              </Text>
              <Text style={styles.SubTitle}>Nota de pedido:</Text>
              <TextInput
                numberOfLines={4}
                multiline
                style={styles.inputs}
                placeholder="Coloca una Nota(opcional)"
                underlineColorAndroid="transparent"
                onChangeText={ord_description =>
                  this.setState({ord_description})
                }
              />
              <Text style={styles.SubTitle} h1>
                Dirección Existente:
              </Text>
              <View>
                <RNPickerSelect
                  Icon={() => (
                    <Icon
                      type="font-awesome"
                      name="chevron-down"
                      color={green}
                      style={{textAlignVertical: 'center'}}
                    />
                  )}
                  placeholder={{
                    label: 'Seleciona una dirección existente`',
                    color: 'black',
                  }}
                  items={this.props.addresses.map(z => ({
                    label: `${z.zone_name} ${z.description}`,
                    value: z.client_address_id,
                  }))}
                  onValueChange={value => {
                    this.setState({
                      address: value,
                    });
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    inputAndroid: styles.select,
                    iconContainer: {
                      top: 20,
                      right: 12,
                    },
                    // placeholder: {color: 'black'},
                  }}
                />
              </View>
              <View style={styles.SubTitle}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    Actions.push('newAddressClient');
                  }}>
                  <Icon
                    name="plus"
                    type="evilicon"
                    color="#a9d046"
                    size={28}
                    onPress={() => {
                      Actions.push('newAddressClient');
                    }}
                  />

                  <Text
                    style={{
                      marginLeft: 10,
                      color: green,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Enviar a una nueva dirección
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.buttonContainer, styles.loginButton]}
                  onPress={() => {
                    this.goTypePayment();
                  }}>
                  <Text style={styles.loginText}>Pagar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
    client_info: state.session,
    dollarPrice: state.parameters.dollarPrice,
    addresses: state.addresses.addresses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: product =>
      dispatch({type: 'REMOVE_FROM_CART', payload: product}),
    setAddresses: addresses => dispatch(setAddresses(addresses)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderViewClient);

const styles = StyleSheet.create({
  grayText: {
    color: gray,
  },
  select: {
    marginTop: 5,
    borderRadius: 15,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: green,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  container: {
    flex: 1,
    // paddingHorizontal: 30,
    paddingVertical: 20,
    // alignItems: "center",
    // justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 30,
    marginTop: 20,
    // alignItems: 'flex-end',
  },
  containerProd: {
    flex: 1,
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
  inputs: {
    marginTop: 5,
    borderRadius: 15,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    borderColor: green,
    borderWidth: 2,
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
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: gray,
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: '80%',
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
