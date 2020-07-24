import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {CheckBox, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

class PaymentTypeClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryPrice: null,
      loading: true,
    };
  }

  componentDidMount() {
    fetch(
      `http://test.itsontheway.com.ve/api/delivery_price/${
        this.props.address.zone_id
      }`,
    )
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          deliveryPrice: parseFloat(resp.response.d_price.delivery_price_usd),
          loading: false,
        });
      });
  }

  VerifyPaymentClient = viewId => {
    let pedido = this.props.pedido;
    let address = this.props.address;
    let description = this.props.description;
    let opType = viewId;

    Actions.verifyPaymentClient({
      address,
      description,
      pedido,
      opType,
      price:
        this.state.deliveryPrice + this.getSubTotal() / this.props.dollarPrice,
    });
  };

  getProductPrice(item) {
    let extraPrice = 0;
    item.extras.forEach(e => {
      extraPrice += parseFloat(e.extra_price_usd);
    });
    return (
      (parseFloat(item.prod_price_usd) + extraPrice) *
      item.quantity *
      this.props.dollarPrice
    );
  }

  getSubTotal() {
    let price = 0;
    this.props.cartItems.forEach(item => {
      price += this.getProductPrice(item);
    });
    return price;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Método de pago</Text>
        </View>
        <View>
          <View style={{maxHeight: 200}}>
            <ScrollView>
              {this.props.cartItems.map(item => (
                <ListItem
                  title={`(${item.quantity}) ${item.prod_name}`}
                  bottomDivider
                  rightContentContainerStyle={{flex: 1}}
                  rightTitle={`Bs ${this.getProductPrice(
                    item,
                  ).toLocaleString()} ($${this.getProductPrice(item) /
                    this.props.dollarPrice})`}
                />
              ))}
            </ScrollView>
          </View>
          <ListItem
            titleStyle={{fontWeight: 'bold'}}
            rightTitleStyle={{fontWeight: 'bold'}}
            rightContentContainerStyle={{flex: 1}}
            bottomDivider
            title="Sub Total"
            rightTitle={`Bs ${this.getSubTotal().toLocaleString()} ($${this.getSubTotal() /
              this.props.dollarPrice})`}
          />
          <ListItem
            bottomDivider
            rightContentContainerStyle={{flex: 1}}
            title="Delivery"
            rightTitle={`Bs ${(
              this.state.deliveryPrice * this.props.dollarPrice
            ).toLocaleString()} ($${this.state.deliveryPrice})`}
          />
          <ListItem
            bottomDivider
            titleStyle={{fontWeight: 'bold'}}
            rightTitleStyle={{fontWeight: 'bold'}}
            rightContentContainerStyle={{flex: 1}}
            title="Total"
            rightTitle={`Bs ${(
              this.state.deliveryPrice * this.props.dollarPrice +
              this.getSubTotal()
            ).toLocaleString()} ($${this.state.deliveryPrice +
              this.getSubTotal() / this.props.dollarPrice})`}
          />
        </View>

        <View style={styles.platformsContainer}>
          <View style={styles.platformName}>
            <Text>1. Transferencia</Text>
            <Text style={styles.platformNamePrice2}>
              {this.props.pedido[0].prod_price_bs} Bs.
            </Text>
            <CheckBox
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.transfchecked}
              onPress={() => this.VerifyPaymentClient('P2')}
            />
          </View>
          <View style={styles.platformName}>
            <Text>2. Pago móvil</Text>
            <Text style={styles.platformNamePrice3}>
              {this.props.pedido[0].prod_price_bs} Bs.
            </Text>
            <CheckBox
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.pagomchecked}
              onPress={() => this.VerifyPaymentClient('P1')}
            />
          </View>
          <View style={styles.platformName}>
            <Text>3. Zelle</Text>
            <Text style={styles.platformNamePrice4}>----</Text>
            <CheckBox
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.zellechecked}
              onPress={() => this.VerifyPaymentClient('P3')}
            />
          </View>
          {/* <View style={styles.platformName}>
            <Text style={styles.platformNameTD}>
              4. Crédito - Débito internacional
            </Text>
            <Text style={styles.platformNamePrice5}>---</Text>
            <CheckBox
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.tddchecked}
              onPress={() =>
                this.setState({tddchecked: !this.state.tddchecked})
              }
            />
          </View> */}
        </View>
      </View>
    );
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
)(PaymentTypeClientView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },
  header: {
    flexDirection: 'row',
    marginTop: 30,
  },
  Title: {
    fontSize: 25,
    color: '#373535',
    marginLeft: 20,
    fontWeight: 'bold',
  },

  platformsContainer: {
    flexDirection: 'column',
  },
  platformName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 400,
  },
  platformNameTD: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  platformNamePrice2: {
    marginLeft: 30,
  },
  platformNamePrice3: {
    marginLeft: 44,
  },
  platformNamePrice4: {
    marginLeft: 80,
  },
  platformNamePrice5: {
    marginLeft: 30,
  },
});
