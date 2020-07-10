import React, {useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import faker from 'faker';
import {styles} from './styles';
import {onChange} from 'react-native-reanimated';
import {gray} from '../../../colors';
export function ProductExtras({title, extras, onChange, radio}) {
  const [selected, setSelected] = useState([]);

  function handleSelect(extra) {
    if (radio) {
      if (extra.extra_id === selected.extra_id) {
        setSelected([]);
        onChange(null);
      } else {
        setSelected(extra);
        onChange(extra);
      }
    } else {
      const filtered = selected.filter(s => s.extra_id !== extra.extra_id);

      if (filtered.length !== selected.length) {
        setSelected(filtered);
        onChange(filtered);
      } else {
        filtered.push(extra);
        setSelected(filtered);
        onChange(filtered);
      }
    }
  }
  return (
    <View style={{maxHeight: 250}}>
      <Text
        style={{
          ...styles.SubTitle,
        }}>
        {title}
      </Text>
      <ScrollView nestedScrollEnabled={true}>
        {extras.map(extra => (
          <TouchableOpacity
            onPress={() => handleSelect(extra)}
            key={extra.extra_id}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#dedede',
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{...styles.bodyText, alignSelf: 'center'}}>
              {extra.extra_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text style={{...styles.bodyText, color: gray}}>
                + ${extra.extra_price_usd}
              </Text>
              <CheckBox
                checked={
                  !radio
                    ? selected.find(s => s.extra_id === extra.extra_id)
                    : selected.extra_id === extra.extra_id
                }
                containerStyle={{alignSelf: 'flex-end', paddingVertical: 1}}
                right
                onPress={() => handleSelect(extra)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
