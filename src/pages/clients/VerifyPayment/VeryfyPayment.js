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
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Icon,
  Avatar,
  Badge,
  withBadge,
  Card,
  CheckBox,
} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import {BankPayment} from './BankPayment';
import {MobilePayment} from './MobilePayment';
import {ZellePayment} from './ZellePayment';
import {connect} from 'react-redux';
import {config} from '../../../config';

class VerifyPaymentClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banks: [],
    };
    props.navigation.setParams({
      title: 'Verificacion de pago',
    });
  }

  componentDidMount() {
    fetch(`${config.apiUrl}/its_banks`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({banks: resp.response.banks});
      });
  }
  render() {
    switch (this.props.opType) {
      case 'P1': {
        return (
          <MobilePayment
            {...this.props}
            price={this.props.price * this.props.dollarPrice}
            banks={this.state.banks}
          />
        );
      }
      case 'P2': {
        return (
          <BankPayment
            {...this.props}
            price={this.props.price * this.props.dollarPrice}
            banks={this.state.banks}
          />
        );
      }
      case 'P3': {
        return <ZellePayment {...this.props} />;
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
    client_info: state.session,
    dollarPrice: state.dollarPrice.price,
  };
};

export default connect(
  mapStateToProps,
  null,
)(VerifyPaymentClientView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },

  ConfirTitle: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#373535',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 350,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 50,
    marginLeft: 12,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 270,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
  },
  loginText: {
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },

  loginSubTitle: {
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#bdbfc1',
  },
  loginSubTitle2: {
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
