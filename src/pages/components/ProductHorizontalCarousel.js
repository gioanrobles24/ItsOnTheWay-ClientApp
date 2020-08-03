import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ProductCard} from './ProductCard';

export const image = {uri: 'http://test.itsontheway.com.ve/api/parnetBanner1'};

class Recomendations extends Component {
  goToPartner(product) {
    Actions.partnerView({
      p_id: product.prod_partner_id,
    });

    Actions.productView({
      product,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          data={this.props.items}
          renderItem={product => (
            <ProductCard
              partner={this.props.partner}
              product={product.item}
              onPress={this.props.onPress}
              key={`${product.item.id}-${product.index}`}
            />
          )}
        />
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
