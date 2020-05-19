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
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import store from '../../store'


  const mainColor = "#bdbfc1";
  const url = "www.freakycoder.com";
  const pnkGradient = ["#ffffff", "#ffffff"];




  const carIcon = (props) =>(
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
        <Text style={{fontSize:10,color:'black',marginLeft:20,fontWeight:'bold'}}>
        	{props.cartItems.length}
      	</Text>
          <Icon
                  name='cart'
                  type='evilicon'
                  size={28}
                  color={mainColor}
                  onPress={() =>   {
                    this.CurrentOrder()}
                 }
                />
                <Text style={{fontSize:10,color:'#bdbfc1'}}>Mercado</Text>
        </View>
  	)

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

export default connect(mapStateToProps)(carIcon);


 const styles = StyleSheet.create({
  container: {
	    flex: 0.5,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: 'white',
	    fontFamily: "QUICKSAND-LIGHT",
  },

  ConfirTitle: {
	    fontSize: 34,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    color : '#373535'
  },
  inputContainer: {
	      borderBottomColor: '#bdbfc1',
	      backgroundColor: '#FFFFFF',
	      borderRadius:30,
	      borderBottomWidth: 1,
	      width:350,
	      height:55,
	      marginBottom:20,
	      flexDirection: 'row',
	      alignItems:'center'
    },
  inputs:{
      height:50,
      marginLeft:12,
      borderBottomColor: '#FFFFFF',
      flex:1,

  },
  inputIcon:
  {
	    width:30,
	    height:30,
	    marginLeft:15,
	    justifyContent: 'center'
  },

  buttonContainer:
  {
	    height:45,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginBottom:20,
	    width:270,
	    borderRadius:5,
	    shadowColor: 'rgba(0, 0, 0, 0.1)',
	    shadowOpacity: 0.8,
	    elevation: 6,
	    shadowRadius: 15 ,
	    shadowOffset : { width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: "#a9d046",
  },
  loginText: {
    fontFamily: "QUICKSAND-LIGHT",
    color: 'white',
  },

  loginSubTitle:{
	    fontSize: 16,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginTop: 20,
	    marginBottom: 20,
	    color : '#bdbfc1'
  },
   menutab: {
    flex: 1,
  }

});