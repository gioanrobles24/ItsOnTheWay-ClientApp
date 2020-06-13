/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Recomedantions from '../components/Recomendations';
import TabMenuIcons from '../components/TabMenuIcons';
import {unsetUser} from '../../reducers/session';
import {Header} from './Header';
const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner1'};

class HomeClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      open: false,
      data: this.props.user.response.client_info,
      products: this.props.user.response.all_products,
    };
  }

  CurrentOrder() {
    Actions.orderClient();
  }
  PromoAndSuges() {
    Actions.promoAndSuges();
  }
  productView() {
    alert('asdsadfsd');
  }

  _renderItem2({item, index}) {
    return (
      <TouchableOpacity onPress={() => Actions.promoAndSuges()}>
        <Card
          containerStyle={{
            flexDirection: 'row',
            width: 250,
            marginLeft: -20,
            marginTop: 30,
          }}
          imageStyle={{width: 249, height: 130}}
          image={image}>
          <Text style={{fontSize: 20, marginLeft: 5}}>{item.title}</Text>
          <Text style={{fontSize: 15, color: 'black', marginLeft: 5}}>
            {item.text}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  }
  _renderItem3({item, index}, parallaxProps) {
    return (
      <Card
        containerStyle={{
          flexDirection: 'row',
          width: 279,
          height: 130,
          marginLeft: -20,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
        imageStyle={{width: 276, height: 130, borderRadius: 15}}
        roundImage
        image={image}
      />
    );
  }

  allmyOrders = viewId => {
    Actions.allmyOrders();
  };

  alladdress = viewId => {
    Actions.addressClient();
  };
  seeAll = viewId => {
    alert('ver');
  };

  render() {
    const data = this.state.data;
    return (
      <View style={styles.container}>
        <Header>
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
                  <Recomedantions products={this.state.products} />
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
                  <Recomedantions products={this.state.products} />
                </View>
              </SafeAreaView>

              {/* <SafeAreaView style={{flex: 1, paddingTop: 50}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: -70,
                    marginLeft: 16,
                  }}>
                  <Carousel
                    layout={'default'}
                    ref={ref => (this.carousel = ref)}
                    data={this.state.carouselItems2}
                    sliderWidth={250}
                    itemWidth={250}
                    renderItem={this._renderItem2}
                    onSnapToItem={index => this.setState({activeIndex: index})}
                  />
                </View>
              </SafeAreaView> */}
            </HomeSection>
          </ScrollView>
        </Header>
        <SafeAreaView style={styles.menutab}>
          <TabMenuIcons />
        </SafeAreaView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    client_info: client_info =>
      dispatch({type: 'ADD_USER_INFO', payload: client_info}),
    logout: () => dispatch(unsetUser()),
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

function HomeSection(props) {
  return (
    <>
      <View style={styles.container4}>
        <Text
          style={{
            marginBottom: 15,
            fontSize: 18,
            color: '#404040',
            backgroundColor: '#cfcfcf',
            padding: 7,
            borderRadius: 3,
          }}>
          {props.title}
        </Text>
      </View>
      {props.children}
    </>
  );
}

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
