/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import Recomedantions from '../../components/ProductHorizontalCarousel';
import TabMenuIcons from '../../components/TabMenuIcons';
import {unsetUser} from '../../../reducers/session';
import {Header} from '../Header';
import {HomeSection} from './HomeSection';
import {Actions} from 'react-native-router-flux';
const background = require('../../../assets/background.png');

class HomeClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      open: false,
      data: this.props.user.response.client_info,
      products: this.props.user.response.all_products,
      partners: this.props.user.response.partners_home,
    };
    console.log(this.props.user);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          style={{flex: 1, resizeMode: 'cover'}}>
          <Header>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                      items={this.state.products.filter(
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
                      items={this.state.products.filter(
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
                <SafeAreaView style={{flex: 1, marginBottom: 150}}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: -30,
                    }}>
                    <Recomedantions
                      items={this.state.partners.map(p => ({
                        prod_image: p.profile_pic,
                        prod_partner_id: p.p_id,
                        prod_name: p.p_user,
                      }))}
                      partner
                      onPress={product => {
                        Actions.partnerView({
                          p_id: product.prod_partner_id,
                        });
                      }}

                      // onPress={product => {
                      //   Actions.productView({
                      //     product,
                      //   });
                      // }}
                    />
                  </View>
                </SafeAreaView>
              </HomeSection>
            </ScrollView>
          </Header>
          <TabMenuIcons />
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
    clearCart: () => dispatch({type: 'CLEAR_CART'}),
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeClientView);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },
  container1Title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  container2Title: {
    fontSize: 15,
    color: '#d3e38c',
  },
  container4: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  imagenes: {
    resizeMode: 'cover',
  },

  menutab: {
    flex: 1,
  },
});
