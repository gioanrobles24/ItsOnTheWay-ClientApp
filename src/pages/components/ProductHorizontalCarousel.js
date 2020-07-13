import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ProductCard} from './ProductCard';

export const image = {uri: 'http://test.itsontheway.com.ve/api/parnetBanner1'};

class Recomendations extends Component {
  goToPartner(product) {
    // console.log(product);
    Actions.partnerView({
      p_id: product.prod_partner_id,
    });

    Actions.productView({
      product,
      // fromHome: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {this.props.products.map(product => (
            <ProductCard
              product={product}
              onPress={() => this.goToPartner(product)}
              key={product.id}
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
