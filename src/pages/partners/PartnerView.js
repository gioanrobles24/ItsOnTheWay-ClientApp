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
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {Badge, Avatar, Card} from 'react-native-elements';
// const image = { uri: "http://dev.itsontheway.net/api/parnetBanner" }
import Products from '../components/Products';
import PayBoton from '../components/BotomBarMenu';
import {Provider} from 'react-redux';
import store from '../../store';
import {connect} from 'react-redux';
import {electronics} from '../components/Data';
const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner1'};
class PartnerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partner_products: [],
      partner_banner: '',
      partner: [],
    };

    fetch(
      'http://dev.itsontheway.net/api/clients/showPartner/' + this.props.p_id,
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
        console.log(responseData);
        if (responseData.error) {
          alert(' por favor intenta nuevamente');
        } else {
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

  ratingCompleted(rating) {}
  productView(item) {
    let product = item;
    Actions.productView({product});
  }

  render() {
    let partner_profile_pic = {uri: this.state.partner_banner};
    return (
      <View style={styles.container}>
        <Image style={styles.partnerimage} source={partner_profile_pic} />
        <Text style={styles.Title} h1>
          {this.state.partner.p_user}
        </Text>
        <Text style={styles.SubTitle} h1>
          Listado de productos:{' '}
        </Text>

        <ScrollView>
          <View style={styles.productscontainer}>
            {this.state.partner_products.map(item => (
              <TouchableHighlight
                key={item.id}
                underlayColor="transparent"
                onPress={() => this.productView(item)}>
                <Card containerStyle={styles.cardOrder}>
                  <Avatar rounded size="large" source={image} />
                  <Text style={styles.cardOrderSubTitle}>{item.prod_name}</Text>
                  <Text style={styles.cardOrderSubTitle}>
                    Bs.: {item.prod_price_bs}
                  </Text>

                  <View style={{flexDirection: 'row', marginLeft: 5}}>
                    <Text style={{fontSize: 10, marginLeft: 30}}>
                      Descripcción: {item.prod_description}
                    </Text>
                  </View>
                </Card>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>

        <PayBoton />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product => dispatch({type: 'ADD_TO_CART', payload: product}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(PartnerView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  partnerimage: {
    flex: 0.4,
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
    flexDirection: 'column',
  },
});
