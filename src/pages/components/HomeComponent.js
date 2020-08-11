import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

class HomeInfo extends Component {
  constructor(props) {
    super(props);
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
