import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';

export function ProductCard(props) {
  const {product, onPress: handlePress} = props;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handlePress(product);
        }}>
        <Card
          containerStyle={{
            flexDirection: 'row',
            width: 250,
            marginLeft: 20,
            marginTop: 30,
          }}
          imageStyle={{width: 249, height: 130}}
          image={{
            uri: `http://test.itsontheway.com.ve/images/${
              !props.partner ? 'productos' : 'socios'
            }/${product.prod_partner_id}/${product.prod_image}`,
          }}>
          <Text style={{fontSize: 20, marginLeft: 5}}>{product.prod_name}</Text>
          <Text style={{fontSize: 15, color: '#bdbfc1', marginLeft: 5}}>
            {product.partner_user}
          </Text>

          <View style={{flexDirection: 'row', marginLeft: 5}}>
            {/* <AirbnbRating
              isDisabled={true}
              showRating={false}
              defaultRating={4}
              size={15}
            />
            <Text style={{fontSize: 10, marginLeft: 30}}>
              Bs.: {product.prod_price_bs}
            </Text> */}
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
