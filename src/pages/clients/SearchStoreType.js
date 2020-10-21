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
  Switch,
  ToastAndroid,
  BackHandler,
  Picker,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge, Input} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import BottomBar from 'react-native-bottom-bar';
import BottomBarMenu from '../components/BotomBarMenu';
import {Card} from 'react-native-shadow-cards';
import TabMenuIcons from '../components/TabMenuIcons';
import {config} from '../../config';
import request from '../../utils/request';
const mainColor = '#bdbfc1';
const pnkGradient = ['#ffffff', '#ffffff'];
const background = require('../../assets/search-background.jpg');

export default class SearchStoreTypeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnersByCat: [],
    };

    request(`${config.apiUrl}/clients/searchByCat/${this.props.cat_id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(responseData => {
        if (responseData.error) {
          alert(' por favor intenta nuevamente');
        } else {
          this.setState(
            {
              partnersByCat: responseData.response.parterByCat,
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
    Actions.popTo('homeClient');
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  searchByCat(id) {
    let cat_id = id;
    Actions.searchStoreType({cat_id});
  }

  AllMyOrders = viewId => {
    Actions.allmyOrders();
  };
  ThisPartnerView(id) {
    let p_id = id;
    Actions.partnerView({p_id});
  }
  CurrentOrder() {
    Actions.orderClient();
  }
  keyExtractor(item) {
    return item.id;
  }
  renderItem = ({item: partner}) => (
    <View style={styles.cardOrdercontainer}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => {
          this.ThisPartnerView(partner.id);
        }}>
        <Card style={styles.cardOrder}>
          <ImageBackground
            source={{
              uri: `${config.imagesUrl}/images/socios/${partner.id}/${
                partner.profile_pic
              }`,
            }}
            style={{flex: 1, resizeMode: 'cover'}}>
            {!partner.is_open && (
              <View style={styles.statusBadge}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                  }}>
                  Cerrado
                </Text>
              </View>
            )}
            <View style={styles.scheduleBadge}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 14}}>
                  {partner.p_rate || 0}
                </Text>
                <Icon
                  name="star"
                  color="#f2ef22"
                  size={14}
                  style={{marginLeft: 5}}
                />
              </View>
              <Text style={{color: 'white', fontSize: 14}}>
                De {partner.p_open_time} a {partner.p_close_time}
              </Text>
            </View>
          </ImageBackground>
        </Card>
      </TouchableHighlight>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          style={{flex: 1, resizeMode: 'cover'}}>
          <View style={styles.header}>
            <Icon name="location" type="evilicon" size={20} color="#a9d046" />
            <Text style={styles.Title}>Buscar</Text>
          </View>
          <View style={styles.header}>
            <Input
              placeholder="escribe y pulsa para buscar"
              leftIcon={<Icon name="search" type="evilicon" color="black" />}
              inputContainerStyle={{
                borderRadius: 10,
                borderBottomColor: 'transparent',
                width: 330,
                height: 35,
                backgroundColor: '#e3e3e3',
                marginBottom: 5,
                justifyContent: 'center',
              }}
            />
          </View>
          <View style={styles.productscontainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.partnersByCat}
              renderItem={this.renderItem}
            />
          </View>
          <TabMenuIcons containerStyle={{paddingTop: 100}} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 100,
    // flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
  },
  Title: {
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
    fontWeight: 'bold',
  },
  SubTitle: {
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#bdbfc1',
    fontWeight: 'bold',
  },
  menutab: {
    flex: 1,
  },
  productscontainer: {
    // marginTop: 10,
    flex: 1,
    // marginBottom: 250,
    // backgroundColor: 'red',
    // flexDirection: 'column',
  },
  cardOrderSubTitle: {
    fontSize: 19,
  },
  menubarItemContainer: {
    borderBottomColor: '#bdbfc1',
    borderBottomWidth: 1,
    width: 400,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  cardOrdercontainer: {
    flexDirection: 'row',
  },
  cardOrder: {
    // marginTop: 30,
    // padding: 20,
    margin: 20,
    flexDirection: 'row',
    elevation: 8,
    height: 200,
    position: 'relative',
  },
  cardOrderSubTitle: {
    fontSize: 20,
    marginLeft: 10,
    alignSelf: 'center',
  },

  statusBadge: {
    position: 'absolute',
    right: 0,
    top: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: 'red',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  scheduleBadge: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
