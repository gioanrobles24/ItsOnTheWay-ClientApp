/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  ImageBackground,
  Alert,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import Recomedantions from '../../components/ProductHorizontalCarousel';
import TabMenuIcons from '../../components/TabMenuIcons';
import {unsetUser, setHomeProducts} from '../../../reducers/session';
import {Header} from '../Header';
import {HomeSection} from './HomeSection';
import {Actions} from 'react-native-router-flux';
const background = require('../../../assets/background.png');
import {styles} from './styles';
import {config} from '../../../config';
import request from '../../../utils/request';
import {changeSegments} from '../../../reducers/segments';
// chequear la version de la app
import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

class HomeClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      open: false,
      products: [],
      partners: [],
    };
  }

  componentDidMount() {
    this.fetchSegmentations();
    this.fetchHomeProducts();
    VersionCheck.getCountry().then(country => console.log(country));          // KR
    VersionCheck.getLatestVersion({
      forceUpdate: true,
    }).then(latestVersion => {
      // Alert.alert("latestVersion " + latestVersion, "getCurrentVersion " + parseFloat(VersionCheck.getCurrentVersion()))
      if (parseFloat(VersionCheck.getCurrentVersion()) < parseFloat(latestVersion)){
        Alert.alert("", "Hay una actualización disponible", [
          {
            text: "Actualizar",
            onPress: () => {
              Linking.openURL("market://details?id=com.itsclients");
            }
          },
          {
            text: "Cerrar",
            onPress: () => {

            }
          }
        ]);
      }
    });
  }

  fetchSegmentations() {
    return request(`${config.apiUrl}/clients/segmentatios`).then(resp => {
        this.props.setSegments(resp.response.segmentos);
      })
      .catch(e => Alert.alert(e.message));
  }

  fetchHomeProducts() {
    return request(`${config.apiUrl}/clients/refresh_home`)
      .then(resp => {
        if (resp.error) {
          throw new Error(resp.error);
        }
        this.props.setHomeProducts({
          partners: resp.response.partners_home,
          products: resp.response.all_products,
        });
        this.setState({
          partners: resp.response.partners_home,
          products: resp.response.all_products,
        });
      })
      .catch(e => {
        Alert.alert('Error', e.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          style={{flex: 1, resizeMode: 'cover'}}>
          <Header>
            <View style={{flex: 1}}>
              <ScrollView>
                <HomeSection title="Recomendaciones">
                  <SafeAreaView style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: -30,
                      }}>
                      <Recomedantions
                        items={this.props.products.filter(
                          p => p.prod_recome === '1',
                        )}
                        onPress={product => {
                          Actions.partnerView({
                            p_id: product.prod_partner_id,
                          });
                          Actions.productView({
                            product,
                          });
                        }}
                      />
                    </View>
                  </SafeAreaView>
                </HomeSection>
                <HomeSection title="Promociones">
                  <SafeAreaView style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: -30,
                      }}>
                      <Recomedantions
                        items={this.props.products.filter(
                          p => p.prod_suges === '1',
                        )}
                        onPress={product => {
                          Actions.partnerView({
                            p_id: product.prod_partner_id,
                          });
                          Actions.productView({
                            product,
                          });
                        }}
                      />
                    </View>
                  </SafeAreaView>
                </HomeSection>
                <HomeSection title="Restaurantes">
                  <SafeAreaView style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: -30,
                        marginBottom: 100,
                      }}>
                      <Recomedantions
                        items={this.props.partners.map(p => ({
                          prod_image: p.profile_pic,
                          prod_partner_id: p.p_id,
                          prod_name: p.p_user,
                          id: p.p_id,
                        }))}
                        partner
                        onPress={product => {
                          Actions.partnerView({
                            p_id: product.prod_partner_id,
                          });
                        }}
                      />
                    </View>
                  </SafeAreaView>
                </HomeSection>
              </ScrollView>
              <TabMenuIcons />
            </View>
          </Header>
          {/* <Text> Hola</Text> */}
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    client_info: client_info =>
      dispatch({type: 'ADD_USER_INFO', payload: client_info}),
    logout: () => dispatch(unsetUser()),
    setSegments: segments => dispatch(changeSegments(segments)),
    setHomeProducts: obj => dispatch(setHomeProducts(obj)),
    clearCart: () => dispatch({type: 'CLEAR_CART'}),
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
    products: state.session.all_products,
    partners: state.session.partners_home,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeClientView);
