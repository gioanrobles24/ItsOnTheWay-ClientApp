import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import BottomBar from 'react-native-bottom-bar';
import {green} from '../../colors';

const mainColor = '#bdbfc1';
const pnkGradient = [green, green];

class TabMenuIcons extends Component {
  constructor(props) {
    super(props);
    this.mainIconOnPress = this.mainIconOnPress.bind(this);
    this.state = {};
  }

  searchByCat(id) {
    let cat_id = id;
    Actions.searchStoreType({
      cat_id,
      onBack: () => Actions.popTo('homeClient'),
    });
  }
  MisPedios() {
    Actions.popTo('homeClient');
  }
  renderMainIcon() {
    return (
      <Icon
        name="home"
        type="font-awesome"
        size={29}
        color="white"
        onPress={() => {
          this.MisPedios();
        }}
      />
    );
  }
  mainIconOnPress() {
    alert('boton home');
  }
  renderFirstIconComponent() {
    return (
      <View
        style={{
          ...Platform.select({
            ios: {
              right: 16,
            },
            android: {
              right: 8,
              top: 8,
            },
          }),
        }}>
        <Icon
          name="restaurant"
          type="material"
          size={20}
          color={mainColor}
          onPress={() => {
            this.searchByCat('1');
          }}
        />
        <Text style={{fontSize: 10, color: '#bdbfc1'}}>Restaurantes</Text>
      </View>
    );
  }

  renderSecondIconComponent() {
    return (
      <View
        style={{
          ...Platform.select({
            ios: {
              right: 24,
              bottom: 3,
            },
            android: {
              top: 3,
            },
          }),
        }}>
        <TouchableOpacity>
          <Icon
            name="heartbeat"
            type="font-awesome"
            size={20}
            color={mainColor}
            onPress={() => {
              this.searchByCat('2');
            }}
          />
          <Text style={{fontSize: 10, color: '#bdbfc1'}}>Farmacia</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderThirdIconComponent() {
    return (
      <View
        style={{
          ...Platform.select({
            ios: {
              left: 24,
              bottom: 3,
            },
            android: {
              top: 3,
              left: 3,
            },
          }),
        }}>
        <Icon
          name="local-mall"
          type="material"
          size={20}
          color={mainColor}
          onPress={() => {
            this.searchByCat('3');
          }}
        />
        <Text style={{fontSize: 10, color: '#bdbfc1'}}>Tienda</Text>
      </View>
    );
  }

  renderFourthIconComponent() {
    return (
      <View
        style={{
          ...Platform.select({
            ios: {
              left: 16,
            },
            android: {
              left: 8,
              top: 8,
            },
          }),
        }}>
        <Icon
          name="cart"
          type="evilicon"
          size={28}
          color={mainColor}
          onPress={() => {
            this.searchByCat('4');
          }}
        />
        <Text style={{fontSize: 10, color: '#bdbfc1'}}>Mercados</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.menutab}>
        <View style={styles.menutab}>
          <BottomBar
            // shapeColor="#ffffff"
            // miniButtonsColor="#ffffff"
            mainIconGradient={[green, green]}
            // mainIconColor={green}
            mainIcon={this.renderMainIcon()}
            mainIconOnPress={this.mainIconOnPress}
            firstIconComponent={this.renderFirstIconComponent()}
            secondIconComponent={this.renderSecondIconComponent()}
            thirdIconComponent={this.renderThirdIconComponent()}
            fourthIconComponent={this.renderFourthIconComponent()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default TabMenuIcons;

const styles = StyleSheet.create({
  menutab: {
    flex: 1,
  },
});
