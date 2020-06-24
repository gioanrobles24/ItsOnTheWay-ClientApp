/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon, Image, Input, Avatar} from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer';
import {} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {unsetUser} from '../../reducers/session';

const image = {uri: 'http://dev.itsontheway.net/api/parnetBanner1'};

export function Header(props) {
  const [open, setOpen] = useState(false);
  return (
    <MenuDrawer
      open={open}
      drawerContent={<SidebarMenu toggle={() => setOpen(false)} />}
      drawerPercentage={100}
      animationTime={450}
      overlay={true}
      opacity={0.8}>
      <View style={styles.headerBarContainer}>
        <View style={styles.headerBar}>
          <Image
            source={{uri: 'http://dev.itsontheway.net/api/imgBlanca'}}
            style={{width: 150, height: 80, marginRight: 80}}
          />
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => setOpen(true)}>
            <Icon
              name="navicon"
              type="evilicon"
              color="#ffffff"
              size={35}
              iconStyle={{marginRight: 15, marginTop: 10}}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.headerBar}>
          <Input
            placeholder=""
            leftIcon={<Icon name="search" type="evilicon" color="black" />}
            inputContainerStyle={{
              borderRadius: 20,
              borderBottomColor: 'transparent',
              width: 330,
              height: 35,
              backgroundColor: 'white',
              alignSelf: 'center',
              marginBottom: 5,
              justifyContent: 'center',
            }}
          />
        </View>
      </View>
      {props.children}
    </MenuDrawer>
  );
}

function SidebarMenu(props) {
  const dispatch = useDispatch();
  return (
    <View style={styles.animatedMenuBox}>
      <TouchableOpacity
        onPress={() => {
          console.log('Cerrando Sidebar');
          props.toggle();
        }}>
        <Icon
          name="arrow-left"
          type="font-awesome"
          color="#a9d046"
          iconStyle={{
            marginLeft: 10,
            flexDirection: 'column',
            alignSelf: 'flex-start',
            marginTop: 20,
          }}
        />
      </TouchableOpacity>

      <Avatar
        rounded
        size="xlarge"
        overlayContainerStyle={{backgroundColor: '#bdbfc1'}}
        containerStyle={{
          alignSelf: 'center',
          flexDirection: 'column',
          marginTop: 20,
        }}
        source={image}
      />

      <Text style={styles.animatedBoxTextSpecial} h3>
        {/* {this.state.data.cl_name} */}
      </Text>
      <View style={styles.MenubarContainer}>
        <View style={styles.menubarItemContainer}>
          <Icon
            name="credit-card"
            type="evilicon"
            color="#bdbfc1"
            iconStyle={styles.menubarIconLeft}
            onPress={() => {
              this.allmyOrders();
            }}
          />
          <Text
            style={styles.menubarItemText}
            onPress={() => {
              this.allmyOrders();
            }}>
            Mis pedidos
          </Text>
          <Icon
            name="chevron-right"
            type="evilicon"
            color="#bdbfc1"
            iconStyle={styles.menubarIconRight}
            onPress={() => {
              this.allmyOrders();
            }}
          />
        </View>
        <View style={styles.menubarItemContainer}>
          <Icon
            type="font-awesome"
            name="map-marker"
            color="#bdbfc1"
            iconStyle={styles.menubarIconRight}
            onPress={() => {
              Actions.addressClient();
            }}
          />
          <Text style={styles.menubarItemText}>Mis dirreciones</Text>
          <Icon
            name="chevron-right"
            type="evilicon"
            color="#bdbfc1"
            iconStyle={styles.menubarIconRight}
            onPress={() => {
              this.seeAll();
            }}
          />
        </View>

        <TouchableHighlight
          style={[styles.salirboton, styles.salirbotonButton]}
          onPress={() => {
            dispatch(unsetUser());
          }}>
          <Text style={styles.salirbotonText}>Salir</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBarContainer: {
    marginTop: -5,
    flexDirection: 'column',
    backgroundColor: '#a9d046',
    height: 130,
    alignItems: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },

  animatedMenuBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: -5,
  },
  animatedBoxTextSpecial: {
    flexDirection: 'column',
    flex: 0.1,
    fontSize: 25,
    color: '#373535',
    marginTop: 30,
    alignSelf: 'center',
  },
  bodyOpenMenu: {
    flex: 1,
  },
  MenubarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.7,
  },

  menubarItemContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: 400,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menubarItemText: {
    flex: 0.8,
    marginLeft: 12,
    justifyContent: 'center',
  },

  menubarIconLeft: {
    marginStart: 25,
  },
  menubarIconRight: {
    marginStart: 25,
  },
  salirboton: {
    marginTop: 70,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 270,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
  },

  salirbotonButton: {
    backgroundColor: '#a9d046',
  },
  salirbotonText: {
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },
});
