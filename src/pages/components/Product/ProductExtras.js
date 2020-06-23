import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import faker from 'faker';
import {styles} from './styles';
export function ProductExtras({title}) {
  return (
    <View style={{maxHeight: 250}}>
      <Text
        style={{
          ...styles.SubTitle,
        }}>
        {title}
      </Text>
      <ScrollView nestedScrollEnabled={true}>
        {[0, 1].map(extra => (
          <TouchableOpacity
            key={extra}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#dedede',
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{...styles.bodyText, alignSelf: 'center'}}>
              {faker.commerce.productAdjective()}
            </Text>
            <CheckBox
              containerStyle={{alignSelf: 'flex-end', paddingVertical: 1}}
              right
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
