/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Recomedantions from '../../components/ProductHorizontalCarousel';
import TabMenuIcons from '../../components/TabMenuIcons';
import {unsetUser} from '../../../reducers/session';
import {Header} from '../Header';
import {HomeSection} from './HomeSection';

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
            </HomeSection>
          </ScrollView>
        </Header>
        <TabMenuIcons />
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
