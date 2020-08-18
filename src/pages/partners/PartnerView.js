/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Dimensions,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Badge, ListItem, Tile, AirbnbRating} from 'react-native-elements';
import PayBoton from '../components/BotomBarMenu';
import {connect} from 'react-redux';
import {green} from '../../colors';
import AutoHeightImage from 'react-native-auto-height-image';
import {config} from '../../config';
import request from '../../utils/request';
import {changePartner, changePartnerSegment} from '../../reducers/partner';
import {ScrollView} from 'react-native-gesture-handler';

class PartnerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partner_products: [],
      partner_banner: '',
      partner: {},
      appStatus: false,
    };

    console.log(`partner id: ${this.props.p_id}`);

    request(`${config.apiUrl}/clients/showPartner/${this.props.p_id}`)
      .then(responseData => {
        if (responseData.error) {
          Alert.alert(' por favor intenta nuevamente');
        } else {
          this.props.navigation.setParams({
            title: responseData.response.partner.p_user,
          });
          console.log(responseData.response.partner);
          this.setState(
            {
              partner_products: responseData.response.partner_products.filter(
                p => p.prod_aviable,
              ),
              partner_banner: responseData.response.partner_banner,
              partner: responseData.response.partner,
            },
            () => {},
          );
          this.props.setPartner(responseData.response.partner);
        }
      })
      .catch(error => {
        console.error(error);
      });

    request(`${config.apiUrl}/working_status`)
      .then(responseData => {
        if (responseData.error) {
          Alert.alert(' por favor intenta nuevamente');
        } else {
          try {
            this.setState({
              appStatus: responseData.success.status,
            });
          } catch (e) {
            this.setState({
              appStatus: false,
            });
          }
        }
      })
      .catch(e => {
        this.setSelectedSegment({appStatus: false});
      });
  }

  backAction = () => {
    if (
      Actions.currentScene === 'partnerView' &&
      this.props.partner.selectedSegment !== null
    ) {
      this.props.setSelectedSegment(null);
      // Actions.pop();
      return true;
    }

    if (Actions.currentScene !== 'partnerView') {
      Actions.pop();
      return true;
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
        // fontWeight: 'bold',
        ...styles.grayText,
      }}
      leftAvatar={{
        source: {
          uri: `${config.imagesUrl}/images/productos/${item.prod_partner_id}/${
            item.prod_image
          }`,
        },
      }}
      chevron
      onPress={() => this.productView(item)}
      bottomDivider
    />
  );

  render() {
    let partner_profile_pic = {uri: this.state.partner_banner};
    let segments = [];

    this.state.partner_products.forEach(product => {
      const segment = segments.find(
        s => s.id === parseInt(product.prod_seg_id, 10),
      );
      if (product.prod_seg_id && !segment) {
        segments.push({
          ...this.props.segments.find(
            s => s.id === parseInt(product.prod_seg_id, 10),
          ),
          product,
        });
      }
    });

    console.log(segments);

    return (
      <>
        {!!this.state.partner_banner && (
          <AutoHeightImage
            source={partner_profile_pic}
            width={Dimensions.get('window').width}
          />
        )}
        <View style={styles.container}>
          <View style={{position: 'absolute', top: -40, right: 10}}>
            <AirbnbRating
              showRating={false}
              size={25}
              defaultRating={parseFloat(this.state.partner.p_rate)}
              isDisabled
            />
          </View>
          <View
            style={{
              marginTop: 15,
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                textAlign: 'left',
                color: green,
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              Productos
            </Text>
            {!this.state.partner.is_open && (
              <Badge
                status="error"
                value="CERRADO"
                containerStyle={{alignSelf: 'center'}}
              />
            )}
            {!this.state.appStatus && (
              <Badge
                status="error"
                value="CIERRE TOTAL"
                containerStyle={{alignSelf: 'center'}}
              />
            )}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{textAlign: 'right', fontSize: 18}}>Horario: </Text>
              {this.state.partner.p_open_time && (
                <Badge
                  value={`${this.state.partner.p_open_time} - ${
                    this.state.partner.p_close_time
                  }`}
                  badgeStyle={{backgroundColor: green, color: 'white'}}
                />
              )}
            </View>
          </View>
          <View style={styles.productscontainer}>
            {this.props.partner.selectedSegment === null ? (
              <ScrollView
                contentContainerStyle={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}>
                {segments.map(s => (
                  <Tile
                    title={s.seg_description}
                    titleStyle={{fontSize: 24}}
                    onPress={() => {
                      this.props.setSelectedSegment(s.id);
                    }}
                    featured
                    width={Dimensions.get('window').width / 2}
                    height={Dimensions.get('window').width / 2}
                    imageContainerStyle={{
                      backgroundColor: 'rgba(0,0,0,.5)',
                    }}
                    imageSrc={{
                      uri: `${config.imagesUrl}/images/productos/${
                        s.product.prod_partner_id
                      }/${s.product.prod_image}`,
                    }}
                  />
                ))}
              </ScrollView>
            ) : (
              <FlatList
                initialNumToRender={10}
                keyExtractor={this.keyExtractor}
                data={this.state.partner_products.filter(
                  p =>
                    parseInt(p.prod_seg_id, 10) ===
                    this.props.partner.selectedSegment,
                )}
                renderItem={this.renderItem}
              />
            )}
            {this.state.partner.is_open && this.state.appStatus && (
              <View style={{marginTop: 20}}>
                <PayBoton />
              </View>
            )}
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
    client_info: state.session,
    dollarPrice: state.parameters.dollarPrice,
    partner: state.partner,
    segments: state.segments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product => dispatch({type: 'ADD_TO_CART', payload: product}),
    setPartner: partner => dispatch(changePartner(partner)),
    setSelectedSegment: segmentId => dispatch(changePartnerSegment(segmentId)),
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
    marginTop: 20,
    flex: 1,
  },
});
