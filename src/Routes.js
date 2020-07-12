import React, {Component} from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';

import LoginClient from './pages/clients/LoginClient';
import RegisterClient from './pages/clients/RegisterClient';
import ResetPasswordClient from './pages/clients/ResetPasswordClient';
import HomeClient from './pages/clients/HomeClient/HomeClient';
import SearchStoreType from './pages/clients/SearchStoreType';
import AddressClient from './pages/clients/AddressClient';
import AllMyOrders from './pages/clients/AllMyOrdersClient';
import OrderClient from './pages/clients/OrderViewClient';
import VerifyClient from './pages/clients/VerifyClient';
import NewAddressClient from './pages/clients/newAddressClient';
import PaymentTypeClient from './pages/clients/PaymentType';

import {BackHandler, Alert} from 'react-native';
import ProductClientView from './pages/clients/productView';
import PartnerView from './pages/partners/PartnerView';
import PromoAndSugesClient from './pages/clients/PromosAndSuges';
import VerifyPaymentClient from './pages/clients/VerifyPayment/VeryfyPayment';
import AsyncStorage from '@react-native-community/async-storage';
import {setUser} from './reducers/session';
import {connect, useDispatch} from 'react-redux';
import {Header} from './pages/clients/Header';
import {changeDollarPrice} from './reducers/dollarPrice';
import GeneralSearch from './pages/clients/GeneralSearch';
import {OrderDetail} from './pages/clients/OrderDetail';

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      loadingUser: true,
    };
  }
  componentDidMount() {
    /**
     * Load the session and put it in the store
     */
    AsyncStorage.getItem('session')
      .then(user => {
        if (user) {
          try {
            this.props.login(JSON.parse(user));
          } catch (e) {
            return AsyncStorage.removeItem('session');
          }
        }
      })
      .finally(() => this.setState({loadingUser: false}));
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  render() {
    /**
     * You can't render the whole view if the user hasn't be loaded from disk
     */
    if (this.state.loadingUser) return null;

    return this.props.isAuth ? <AuthApp /> : <UnauthApp />;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(setUser(user)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuth: !!state.session.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);

function backAction(params) {
  console.log('ENTRE');
  if (Actions.state.index === 0) {
    BackHandler.exitApp();
    return false;
  }
  Actions.pop();
  return true;
}

const UnauthApp = props => {
  return (
    <Router navBarButtonColor="#a9d046" backAndroidHandler={backAction}>
      <Scene key="root">
        <Scene key="loginClient" hideNavBar={true} component={LoginClient} />
        <Scene key="verifyClient" component={VerifyClient} />
        <Scene key="registerClient" component={RegisterClient} />
        <Scene key="resetPasswordClient" component={ResetPasswordClient} />
      </Scene>
    </Router>
  );
};

const AuthApp = props => {
  const dispatch = useDispatch();

  return (
    <Router navBarButtonColor="#a9d046" backAndroidHandler={backAction}>
      <Scene key="root" headerLayoutPreset="center">
        <Scene
          key="homeClient"
          hideNavBar
          component={HomeClient}
          onEnter={() => {
            dispatch({type: 'CLEAR_CART'});
            fetch('http://test.itsontheway.com.ve/api/currency_value')
              .then(response => response.json())
              .then(dollar => {
                dispatch(changeDollarPrice(dollar.response.c_price.cur_value));
              });
          }}
        />
        <Scene
          key="searchStoreType"
          component={SearchStoreType}
          renderBackButton={() => {}}
        />
        <Scene
          key="addressClient"
          component={AddressClient}
          onEnter={function() {
            AddressClient.onEnter();
          }}
        />
        <Scene key="generalSearch" component={GeneralSearch} />
        <Scene key="newAddressClient" component={NewAddressClient} />
        <Scene key="allmyOrders" component={AllMyOrders} />
        <Scene key="orderDetail" component={OrderDetail} />
        <Scene key="orderClient" component={OrderClient} title="Tu Pedido" />
        <Scene key="paymentType" component={PaymentTypeClient} />
        <Scene
          key="productView"
          component={ProductClientView}
          renderBackButton={() => {}}
        />
        <Scene key="partnerView" component={PartnerView} back />
        <Scene key="promoAndSuges" component={PromoAndSugesClient} />
        <Scene key="verifyPaymentClient" component={VerifyPaymentClient} />
      </Scene>
    </Router>
  );
};
