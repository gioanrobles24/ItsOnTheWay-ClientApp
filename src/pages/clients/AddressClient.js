import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
const image = {uri: 'http://dev.itsontheway.net/api/imgBlanca'};

class AllmyOrdersClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
    };
  }

  newAddress = viewId => {
    Actions.newAddressClient();
  };

  componentDidMount() {
    fetch(
      `http://dev.itsontheway.net/api/clients/address_client/${
        this.props.user.response.client_info.id
      }`,
    )
      .then(resp => resp.json())
      .then(resp => {
        this.setState({addresses: resp.response.address_client});
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Mis Direcciones</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.container1Title} h3 />

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
        <View>
          <ScrollView style={{paddingHorizontal: 25}}>
            {this.state.addresses.map(addr => (
              <View style={styles.addressContainer}>
                <Text style={styles.SubTitle}>{addr.zone_name}</Text>
                <Text style={styles.Text}>{addr.description}</Text>
              </View>
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
  };
};

export default connect(
  mapStateToProps,
  null,
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
  header: {
    flexDirection: 'row',
    // marginTop: 50,
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
