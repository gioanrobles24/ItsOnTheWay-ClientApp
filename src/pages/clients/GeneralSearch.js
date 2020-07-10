import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, Avatar, Input} from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';
import TabMenuIcons from '../components/TabMenuIcons';
const image2 = {uri: 'http://test.itsontheway.com.ve/api/parnetBanner1'};

export default class GeneralSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
      param: props.param,
    };
  }

  search(param) {
    fetch(`http://test.itsontheway.com.ve/api/clients/searchByParam/${param}`)
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
        <ScrollView>
          <View style={styles.productscontainer}>
            {this.state.partners.map(partner => (
              <View style={styles.cardOrdercontainer}>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    Actions.partnerView({p_id: partner.p_id});
                  }}>
                  <Card style={styles.cardOrder}>
                    <Avatar rounded size="medium" source={image2} />
                    <Text style={styles.cardOrderSubTitle}>
                      {partner.p_user}
                    </Text>
                  </Card>
                </TouchableHighlight>
              </View>
            ))}
          </View>
        </ScrollView>
        <SafeAreaView style={{height: 80}} />
        <SafeAreaView style={styles.menutab}>
          <TabMenuIcons />
        </SafeAreaView>
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
