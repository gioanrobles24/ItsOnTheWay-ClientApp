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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Badge, withBadge, Input} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import BottomBar from 'react-native-bottom-bar';
import BottomBarMenu from '../components/BotomBarMenu';
import {Card} from 'react-native-shadow-cards';
import TabMenuIcons from '../components/TabMenuIcons';
const image = {uri: 'http://test.itsontheway.com.ve/api/imgBlanca'};
const image2 = {uri: 'http://test.itsontheway.com.ve/api/parnetBanner1'};
const mainColor = '#bdbfc1';
const pnkGradient = ['#ffffff', '#ffffff'];
export default class SearchStoreTypeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnersByCat: [],
    };

    fetch(
      'http://test.itsontheway.com.ve/api/clients/searchByCat/' +
        this.props.cat_id,
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
          <Avatar
            rounded
            size="medium"
            source={{
              uri: `http://test.itsontheway.com.ve/images/socios/${
                partner.id
              }/${partner.profile_pic}`,
            }}
          />
          <Text style={styles.cardOrderSubTitle}>{partner.p_user}</Text>
        </Card>
      </TouchableHighlight>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
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
        {/* <ScrollView>
          <View style={styles.productscontainer}>
            {this.state.partnersByCat.map(partner => (
              <View style={styles.cardOrdercontainer} key={partner.id}>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    this.ThisPartnerView(partner.id);
                  }}>
                  <Card style={styles.cardOrder}>
                    <Avatar
                      rounded
                      size="medium"
                      source={{
                        uri: `http://test.itsontheway.com.ve/images/socios/${
                          partner.id
                        }/${partner.profile_pic}`,
                      }}
                    />
                    <Text style={styles.cardOrderSubTitle}>
                      {partner.p_user}
                    </Text>
                  </Card>
                </TouchableHighlight>
              </View>
            ))}
          </View>
        </ScrollView> */}
        <TabMenuIcons containerStyle={{paddingTop: 100}} />
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
    marginTop: 50,
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
    marginTop: 30,
    padding: 20,
    margin: 20,
    flexDirection: 'row',
    elevation: 8,
  },
  cardOrderSubTitle: {
    fontSize: 20,
    marginLeft: 10,
    alignSelf: 'center',
  },
});
