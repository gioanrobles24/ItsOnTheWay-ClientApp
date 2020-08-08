import React, {useState, useEffect} from 'react';
import {Text, View, Modal} from 'react-native';
import {styles} from './styles';
import {Avatar, Icon} from 'react-native-elements';
import {gray} from '../../../colors';
import ImageViewer from 'react-native-image-zoom-viewer';
export function ProductDetailHeader({title, product}) {
  const [imageVisible, setImageVisible] = useState(false);
  const imageUri = `http://test.itsontheway.com.ve/images/productos/${
    product.prod_partner_id
  }/${product.prod_image}`;

  return (
    <View style={styles.header}>
      <Modal
        visible={imageVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageVisible(false)}>
        <View style={{flex: 1, position: 'relative'}}>
          <View
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              zIndex: 2,
            }}>
            <Icon
              name="close"
              color="white"
              onPress={() => setImageVisible(false)}
            />
          </View>
          <ImageViewer imageUrls={[{url: imageUri}]} />
        </View>
      </Modal>
      <Avatar
        rounded
        size={120}
        onPress={() => {
          setImageVisible(true);
        }}
        source={{
          uri: imageUri,
        }}
      />
      <View style={{flex: 1, padding: 10}}>
        <Text style={{color: gray, fontWeight: 'bold'}}>Descripción</Text>
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
          }}>
          <Text style={{flex: 1, flexShrink: 1, color: gray}}>{title}</Text>
        </View>
      </View>
      {/* <Avatar /> */}
    </View>
  );
}
