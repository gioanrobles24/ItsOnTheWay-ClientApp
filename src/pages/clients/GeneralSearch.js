import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Input} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';
import TabMenuIcons from '../components/TabMenuIcons';
import {config} from '../../config';

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
    fetch(`${config.apiUrl}/clients/searchByParam/${param}`)
      .then(response => response.json())
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
          <Avatar
            rounded
            size="medium"
            source={{
              uri: `${config.imagesUrl}/images/socios/${partner.p_id}/${
                partner.profile_pic
              }`,
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
    marginTop: 50,
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
