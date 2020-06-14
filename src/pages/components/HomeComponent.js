import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ScrollView,
  Alert,
  Switch,
  ToastAndroid,
  BackHandler,
  Picker,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Icon,
  Avatar,
  Badge,
  withBadge,
  Image,
  Input,
  Card,
} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {SideMenu} from 'react-native-side-menu';
import MenuDrawer from 'react-native-side-drawer';
import BottomBar from 'react-native-bottom-bar';
import BottomBarMenu from '../components/BotomBarMenu';
import {Provider} from 'react-redux';
import store from '../../store';
import {connect} from 'react-redux';
import Products from '../components/Products';
import Recomedantions from './ProductHorizontalCarousel';
import TabMenuIcons from '../components/TabMenuIcons';
import {electronics} from '../components/Data';
const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner1'};

import {AirbnbRating} from 'react-native-ratings';

class HomeInfo extends Component {
  constructor(props) {
    super(props);
    state = {
      cantidad: '',
    };
  }
  renderProducts = (client_info, props) => {
    return (
      <View>
        <View style={styles.header}>
          <TouchableHighlight
            style={{backgroundColor: 'transparent'}}
            onPress={() => this.props.onPress(client_info)}>
            <Text style={styles.loginText}>{client_info.cl_name}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderProducts(this.props.client_info)}
      </View>
    );
  }
}
export default HomeInfo;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },
  SubTitle: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  Text: {
    color: '#bdbfc1',
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
  },
  extras: {
    flexDirection: 'column',
    marginTop: 20,
  },
  Title: {
    fontSize: 25,
    color: '#373535',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 400,
    flexDirection: 'row',
  },
  inputs: {
    marginLeft: 12,
    borderBottomColor: '#FFFFFF',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 270,
    borderRadius: 5,
    marginTop: 80,
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
