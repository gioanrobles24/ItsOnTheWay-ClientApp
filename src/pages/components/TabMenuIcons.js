import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ScrollView,
  Alert,
  Switch,
  ToastAndroid,
  BackHandler,
  Picker,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Icon,Avatar,Badge,withBadge,Image,Input,Card    } from 'react-native-elements'
import BottomBar from 'react-native-bottom-bar'



  const mainColor = "#bdbfc1";
  const url = "www.freakycoder.com";
  const pnkGradient = ["#ffffff", "#ffffff"];

class TabMenuIcons extends Component{
		constructor(props) {
		  super(props);
		  this.mainIconOnPress = this.mainIconOnPress.bind(this);
		  this.state = {};
		}

    renderMainIcon() {
          return (
            <Icon
              raised
             name='home'
             type='font-awesome'
             size={29}
             color="#d3e38c" />
          );
      }
      mainIconOnPress(){
      	alert('boton home')
      }
    renderFirstIconComponent() {
            return (
              <View
                style={{...Platform.select({
                    ios: {
                      right: 16
                    },
                    android: {
                      right: 8,
                      top: 8
                    }
                  })
                }}
              >
                <Icon
                  name='restaurant'
                  type='material'
                  size={20}
                  color={mainColor}
                   onPress={() =>   {
                    this.searchByCat('1')}
                 }
                />
                <Text style={{fontSize:10,color:'#bdbfc1'}}>Restaurantes</Text>
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
                    bottom: 3
                  },
                  android: {
                    top: 3
                  }
                })
              }}
            >
              <TouchableOpacity>
                <Icon
                  name='heartbeat'
                  type='font-awesome'
                  size={20}
                  color={mainColor}
                  onPress={() =>   {
                    this.searchByCat('2')}
                 }
                />
                <Text style={{fontSize:10,color:'#bdbfc1'}}>Farmacia</Text>
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
                bottom: 3
              },
              android: {
                top: 3,
                left: 3
              }
            })
          }}
        >
          <Icon
                   name='local-mall'
                  type='material'
                  size={20}
                  color={mainColor}
                  onPress={() =>   {
                    this.searchByCat('3')}
                 }
                />
                <Text style={{fontSize:10,color:'#bdbfc1'}}>Tienda</Text>
        </View>
      );
    }

    renderFourthIconComponent ()  {
      return (
         <View style={{
            ...Platform.select({
              ios: {
                left: 16
              },
              android: {
                left: 8,
                top: 8
              }
            })
          }}
        >

          <Icon
                  name='cart'
                  type='evilicon'
                  size={28}
                  color={mainColor}
                  onPress={() =>   {
                    Actions.orderClient()}
                 }
                />
                <Text style={{fontSize:10,color:'#bdbfc1'}}>Mercado</Text>
        </View>
      );
    }


  render() {

	return(
		          	<View style={styles.menutab}>
		                <BottomBar
		                   shapeColor="#ffffff"
		                   miniButtonsColor="#ffffff"
		                   mainIconGradient={pnkGradient}
		                   mainIcon={this.renderMainIcon()}
		                   mainIconOnPress={this.mainIconOnPress}
		                   firstIconComponent={this.renderFirstIconComponent()}
		                   secondIconComponent={this.renderSecondIconComponent()}
		                   thirdIconComponent={this.renderThirdIconComponent()}
		                   fourthIconComponent={this.renderFourthIconComponent()}
		                />
		           </View>
		);
  }
}

export default TabMenuIcons;


 const styles = StyleSheet.create({
   menutab: {
    flex: 1,
  }

});