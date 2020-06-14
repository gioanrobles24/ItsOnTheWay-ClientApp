import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './HomeClient';

export function HomeSection(props) {
  return (
    <>
      <View style={styles.container4}>
        <Text
          style={{
            marginBottom: 15,
            fontSize: 18,
            color: '#404040',
            padding: 7,
            borderRadius: 3,
            borderBottomWidth: 3,
            borderBottomColor: '#a9d046',
          }}>
          {props.title}
        </Text>
      </View>
      {props.children}
    </>
  );
}
