import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

export function HomeSection(props) {
  return (
    <>
      <View style={styles.container4}>
        <Text
          style={{
            marginBottom: 15,
            fontSize: 24,
            color: '#404040',
            padding: 7,
            borderRadius: 3,
            borderBottomWidth: 3,
            borderBottomColor: '#a9d046',
            fontFamily: '[z] Arista Light',
            textShadowOffset: {width: 0.5, height: 0.5},
            textShadowColor: '#FFFFFF',
            textShadowRadius: 1,
          }}>
          {props.title}
        </Text>
      </View>
      {props.children}
    </>
  );
}
