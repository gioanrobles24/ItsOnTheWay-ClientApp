import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Input} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';
import TabMenuIcons from '../components/TabMenuIcons';
import {config} from '../../config';
import request from '../../utils/request';
const background = require('../../assets/search-background.jpg');

export default class GeneralSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
      param: props.param,
    };
  }
  ThisPartnerView(id) {
    let p_id = id;
    Actions.partnerView({p_id});
  }

  search(param) {
    request(`${config.apiUrl}/clients/searchByParam/${param}`)
      .then(responseData => {
        if (responseData.error) {
          Alert.alert(responseData.error);
          this.setState({partners: []});
        } else {
          const result = [];
          responseData.response.results.forEach(partner => {
            if (!result.find(p => p.p_id === partner.p_id)) {
              result.push(partner);
            }
          });
          this.setState({
            partners: result,
          });
        }
      })
      .catch(error => {
        Alert.alert('Error');
        console.error(error);
      });
  }

  componentDidMount() {
    this.search(this.state.param);
  }
  keyExtractor(item) {
    return item.id;
  }
  renderItem = ({item: partner}) => (
    <View style={styles.cardOrdercontainer}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => {
          this.ThisPartnerView(partner.p_id);
        }}>
        <Card style={styles.cardOrder}>
          <ImageBackground
            source={{
              uri: `${config.imagesUrl}/images/socios/${partner.p_id}/${
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
              value={this.state.param}
              onChangeText={value => this.setState({param: value})}
              onEndEditing={() => this.search(this.state.param)}
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
              data={this.state.partners}
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
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
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
