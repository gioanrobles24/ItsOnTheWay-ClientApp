import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ProductCard} from './ProductCard';

export const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner1'};

class Recomendations extends Component {
  ThisPartnerView(id) {
    let p_id = id;

    Actions.partnerView({p_id});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {this.props.products.map(product => (
            <ProductCard
              product={product}
              onPress={() => this.ThisPartnerView(product.prod_partner_id)}
              key={product.prod_name}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Recomendations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
