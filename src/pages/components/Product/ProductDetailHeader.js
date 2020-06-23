import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
export function ProductDetailHeader({title}) {
  return (
    <View style={styles.header}>
      <Text style={styles.Title}>{title}</Text>
    </View>
  );
}
