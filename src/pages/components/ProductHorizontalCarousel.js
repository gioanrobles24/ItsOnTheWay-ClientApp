import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ProductCard} from './ProductCard';

export const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner1'};

class Recomendations extends Component {
  goToPartner(product) {
    Actions.productView({
      product,
      onBack: () => {
        Actions.replace('partnerView', {
          p_id: product.prod_partner_id,
        });
      },
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
