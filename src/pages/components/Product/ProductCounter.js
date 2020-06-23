import React from 'react';
import {Text, View} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {styles} from './styles';
export function ProductCounter({quantity, onChange: handleChange}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={{...styles.bodyText, ...styles.mutedText}}>Cantidad</Text>
      <NumericInput
        value={quantity}
        onChange={handleChange}
        minValue={1}
        totalWidth={110}
        totalHeight={35}
        containerStyle={{
          marginLeft: 15,
        }}
        textColor="#031f30"
        inputStyle={{backgroundColor: 'white', borderWidth: 0}}
        iconStyle={{color: '#999999'}}
      />
    </View>
  );
}
