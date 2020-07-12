import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  Image,
  Alert,
  FlatList,
  ImageBackground,
  Dimensions,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {Badge, Avatar, Card, ListItem} from 'react-native-elements';
// const image = { uri: "http://test.itsontheway.com.ve/api/parnetBanner" }
import PayBoton from '../components/BotomBarMenu';
import {Provider} from 'react-redux';
import store from '../../store';
import {connect} from 'react-redux';
import {electronics} from '../components/Data';
import {green} from '../../colors';

class PartnerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partner_products: [],
      partner_banner: '',
      partner: [],
    };

    fetch(
      'http://test.itsontheway.com.ve/api/clients/showPartner/' +
        this.props.p_id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseData => {
        if (responseData.error) {
          alert(' por favor intenta nuevamente');
        } else {
          this.props.navigation.setParams({
            title: responseData.response.partner.p_user,
          });

          this.setState(
            {
              partner_products: responseData.response.partner_products,
              partner_banner: responseData.response.partner_banner,
              partner: responseData.response.partner,
            },
            () => {},
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  backAction = () => {
    console.log('Entre partner view back');
    if (Actions.currentScene !== 'partnerView') {
      return false;
    }

    if (this.props.cartItems.length > 0) {
      Alert.alert(
        'Se perderea el carrito actual',
        '¿Esta seguro que desea hacerlo?',
        [
          {
            text: 'No',
          },
          {
            text: 'Si',
            onPress: () => {
              this.props.clearCart();
              Actions.pop();
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      Actions.pop();
    }
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    this.props.navigation.setParams({
      onBack: this.backAction,
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  ratingCompleted(rating) {}
  productView(item) {
    let product = item;
    Actions.productView({product});
  }

  keyExtractor = (item, index) => item.id;

  renderItem = ({item}) => (
    <ListItem
      key={item.id}
      title={item.prod_name}
      rightTitle={`$${item.prod_price_usd}`}
      titleStyle={{
        fontWeight: 'bold',
        ...styles.grayText,
      }}
      leftAvatar={{
        source: {
          uri: `http://test.itsontheway.com.ve/images/productos/${
            item.prod_partner_id
          }/${item.prod_image}`,
        },
      }}
      chevron
      onPress={() => this.productView(item)}
      bottomDivider
    />
  );

  render() {
    let partner_profile_pic = {uri: this.state.partner_banner};

    return (
      <View style={styles.container}>
        {!!this.state.partner_banner && (
          <View style={{flex: 1.1, backgroundColor: 'red'}}>
            <Image
              source={partner_profile_pic}
              style={{flex: 1, height: undefined, width: '100%'}}
            />
          </View>
        )}
        <View style={{marginTop: 30}}>
          <Text style={{textAlign: 'center', color: green, fontSize: 24}}>
            Productos
          </Text>
        </View>
        {/* <ScrollView> */}
        <View style={styles.productscontainer}>
          {/* {this.state.partner_products.map(this.renderItem)} */}
          <FlatList
            initialNumToRender={10}
            keyExtractor={this.keyExtractor}
            data={this.state.partner_products}
            renderItem={this.renderItem}
          />
          <PayBoton />
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
    client_info: state.session,
    dollarPrice: state.dollarPrice.price,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product => dispatch({type: 'ADD_TO_CART', payload: product}),
    clearCart: () => dispatch({type: 'CLEAR_CART'}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartnerView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containertitle: {
    marginTop: 10,
    flexDirection: 'row',
    maxWidth: 800,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: -1,
    height: 80,
  },
  cardOrdercontainer: {
    justifyContent: 'center',
  },
  cardOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
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
  productscontainer: {
    marginTop: 50,
    flex: 1,
  },
});
