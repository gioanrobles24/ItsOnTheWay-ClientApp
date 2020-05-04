import React, { Component } from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'

import  LoginClient  from './pages/clients/LoginClient'
import  RegisterClient  from './pages/clients/RegisterClient'
import  ResetPasswordClient  from './pages/clients/ResetPasswordClient'
import  HomeClient  from './pages/clients/HomeClient'
import  SearchStoreType  from './pages/clients/SearchStoreType'
import  AddressClient  from './pages/clients/AddressClient'
import  AllMyOrders  from './pages/clients/AllMyOrdersClient'
import  OrderClient  from './pages/clients/OrderViewClient'
import  NewOrderClient  from './pages/clients/NewOrderClient'
import VerifyClient from  './pages/clients/VerifyClient'
import NewAddressClient from './pages/clients/newAddressClient'

export default class Routes extends Component {
    render() {
        return (

            <Router  navBarButtonColor='#a9d046'>
                <Stack key="root">
                     <Scene key="loginClient" hideNavBar={true} component={LoginClient}/>
                     <Scene key="registerClient" hideNavBar={true} component={RegisterClient}/>
                     <Scene key="resetPasswordClient" hideNavBar={true} component={ResetPasswordClient}/>
                     <Scene key="homeClient" hideNavBar={true} component={HomeClient}/>
                     <Scene key="searchStoreType" hideNavBar={false} component={SearchStoreType}/>
                     <Scene key="addressClient" hideNavBar={false} component={AddressClient}/>
                     <Scene key="newAddressClient" hideNavBar={false} component={NewAddressClient}/>
                     <Scene key="allmyOrders" hideNavBar={false} component={AllMyOrders}/>
                     <Scene key="orderClient" hideNavBar={false} component={OrderClient}/>
                     <Scene key="newOrderClient" hideNavBar={false} component={NewOrderClient}/>
                     <Scene key="verifyClient" hideNavBar={false} component={VerifyClient}/>
                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: '#a9d046'
    }
}