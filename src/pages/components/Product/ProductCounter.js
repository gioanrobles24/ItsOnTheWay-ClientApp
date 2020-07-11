import React from 'react';
import {Text, View} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {styles} from './styles';
import Counter from 'react-native-counters';
import {green} from '../../../colors';
import {onChange} from 'react-native-reanimated';

export function ProductCounter({quantity, onChange: handleChange}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={{...styles.bodyText, ...styles.mutedText}}>Cantidad</Text>
      <View style={{marginLeft: 20}}>
        <Counter
          start={1}
          min={1}
          max={Infinity}
          countTextStyle={styles.bodyText}
          onChange={number => handleChange(number)}
          buttonTextStyle={{color: 'white', fontSize: 32, fontWeight: 'bold'}}
          buttonStyle={{
            width: 50,
            height: 50,
            backgroundColor: green,
            borderWidth: 0,
            borderRadius: 50,
          }}
        />
      </View>
    </View>
  );
}
