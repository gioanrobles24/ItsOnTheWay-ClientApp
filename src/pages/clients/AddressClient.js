import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {address} from 'faker';
import {setAddresses} from '../../reducers/addresses';
import {config} from '../../config';

class AllmyOrdersClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
    };
    this.props.navigation.setParams({
      title: 'Mis Direcciónes',
    });
  }

  newAddress = viewId => {
    Actions.newAddressClient();
  };

  fetchAddresses() {
    console.log(this.props.user.response.client_info.id);
    fetch(
      `${config.apiUrl}/clients/address_client/${
        this.props.user.response.client_info.id
      }`,
    )
      .then(resp => resp.json())
      .then(resp => {
        this.props.setAddresses(resp.response.address_client);
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.fetchAddresses();
  }

  deleteAddress(address) {
    fetch(
      `${config.apiUrl}/clients/delete_address_client/${
        address.client_address_id
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(resp => resp.json())
      .then(resp => {
        this.fetchAddresses();
      })
      .catch(e => Alert.alert('Error'));
  }

  confirmDeleteAddress(address) {
    Alert.alert(
      'Eliminar Dirección',
      '¿Seguro quieres eliminar esta dirección?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Si',
          onPress: () => {
            this.deleteAddress(address);
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.container1Title} />
          <Text
            style={styles.container2Title}
            onPress={() => {
              this.newAddress();
            }}>
            Agregar dirección
          </Text>
          <Icon
            name="plus"
            type="evilicon"
            color="#a9d046"
            onPress={() => {
              this.newAddress();
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {this.props.addresses.map(addr => (
              <ListItem
                title={addr.zone_name}
                subtitle={addr.description}
                onPress={() => {
                  Actions.newAddressClient({address: addr});
                }}
                rightIcon={{
                  type: 'font-awesome',
                  name: 'times',
                  color: 'red',
                  onPress: () => this.confirmDeleteAddress(addr),
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
    addresses: state.addresses.addresses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddresses: addresses => dispatch(setAddresses(addresses)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllmyOrdersClientView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },

  addressContainer: {
    marginTop: 5,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#bdbfc1',
  },
  header: {
    flexDirection: 'row',
  },
  SubTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  Text: {
    // color: '#bdbfc1',
  },
  Title: {
    fontSize: 25,
    color: '#373535',
    marginLeft: 25,
    fontWeight: 'bold',
  },
  container1: {
    marginTop: 30,
    marginRight: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container1Title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
