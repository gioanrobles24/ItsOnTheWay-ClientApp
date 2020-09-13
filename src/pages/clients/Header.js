/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import {Icon, Image, Input, Avatar} from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {unsetUser} from '../../reducers/session';
import AsyncStorage from '@react-native-community/async-storage';
import {green} from '../../colors';
import {config} from '../../config';
import request from '../../utils/request';
import {LoginMenu} from '../components/LoginMenu';
const image = {uri: `${config.apiUrl}/imgVerdePerfil`};

export function Header(props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  function handleSearch() {
    if (search.trim() !== '') {
      Actions.generalSearch({param: search});
    }
  }

  useEffect(() => {
    function backAction() {
      if (open) {
        setOpen(false);
        return true;
      }
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, [open]);

  return (
    <MenuDrawer
      open={open}
      drawerContent={<SidebarMenu toggle={() => setOpen(false)} />}
      drawerPercentage={100}
      animationTime={450}
      overlay={true}
      opacity={0.8}>
      <View style={{flex: 1, height: '100%'}}>
        <View style={styles.headerBarContainer}>
          <View style={styles.headerBar}>
            <Image
              source={{uri: `${config.apiUrl}/imgBlanca`}}
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
              onEndEditing={handleSearch}
              value={search}
              onChangeText={setSearch}
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
      </View>
    </MenuDrawer>
  );
}

function SidebarMenu(props) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const token = useSelector(state => state.session.pushToken);

  return (
    <View style={styles.animatedMenuBox}>
      <TouchableOpacity
        onPress={() => {
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
        overlayContainerStyle={{backgroundColor: green}}
        containerStyle={{
          alignSelf: 'center',
          flexDirection: 'column',
          marginTop: 20,
          backgroundColor: 'white',
        }}
        source={image}
      />
      {!user ? (
        <LoginMenu />
      ) : (
        <UserMenu
          onExitClick={() => {
            request(`${config.pushUrl}/session/${token}`, {
              method: 'DELETE',
            });
            AsyncStorage.removeItem('session').then(() =>
              dispatch(unsetUser()),
            );
            props.toggle();
          }}
        />
      )}
    </View>
  );
}

function UserMenu({onExitClick}) {
  return (
    <View style={styles.MenubarContainer}>
      <TouchableOpacity
        style={styles.menubarItemContainer}
        onPress={() => {
          Actions.userDetail();
        }}>
        <Icon
          name="user"
          type="evilicon"
          color="#bdbfc1"
          iconStyle={styles.menubarIconLeft}
          onPress={() => {
            Actions.userDetail();
          }}
        />
        <Text
          style={styles.menubarItemText}
          onPress={() => {
            Actions.userDetail();
          }}>
          Mi Perfil
        </Text>
        <Icon
          name="chevron-right"
          type="evilicon"
          color="#bdbfc1"
          iconStyle={styles.menubarIconRight}
          onPress={() => {
            Actions.userDetail();
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menubarItemContainer}
        onPress={() => {
          Actions.allmyOrders();
        }}>
        <Icon
          name="credit-card"
          type="evilicon"
          color="#bdbfc1"
          iconStyle={styles.menubarIconLeft}
          onPress={() => {
            Actions.allmyOrders();
          }}
        />
        <Text
          style={styles.menubarItemText}
          onPress={() => {
            Actions.allmyOrders();
          }}>
          Mis pedidos
        </Text>
        <Icon
          name="chevron-right"
          type="evilicon"
          color="#bdbfc1"
          iconStyle={styles.menubarIconRight}
          onPress={() => {
            Actions.allmyOrders();
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menubarItemContainer}
        onPress={() => {
          Actions.addressClient();
        }}>
        <Icon
          type="font-awesome"
          name="map-marker"
          color="#bdbfc1"
          iconStyle={styles.menubarIconRight}
          onPress={() => {
            Actions.addressClient();
          }}
        />
        <Text style={styles.menubarItemText}>Mis Direcciones</Text>
        <Icon
          name="chevron-right"
          type="evilicon"
          color="#bdbfc1"
          iconStyle={styles.menubarIconRight}
          onPress={() => {
            Actions.addressClient();
          }}
        />
      </TouchableOpacity>

      <TouchableHighlight
        style={[styles.salirboton, styles.salirbotonButton]}
        onPress={() => {
          onExitClick();
        }}>
        <Text style={styles.salirbotonText}>Salir</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBarContainer: {
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
    // flex: 1,
    height: Dimensions.get('screen').height,
    backgroundColor: 'white',
    // marginTop: -5,
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
    marginTop: 50,
    // alignItems: 't',
    // justifyC ontent: 'center',
    flex: 1,
  },

  menubarItemContainer: {
    borderBottomColor: '#bdbfc1',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menubarItemText: {
    flex: 1,
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
