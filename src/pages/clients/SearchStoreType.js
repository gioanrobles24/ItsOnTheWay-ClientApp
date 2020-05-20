import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,Switch,
  ToastAndroid,
  BackHandler,
  Picker,
  SafeAreaView,
  TouchableOpacity,ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon,Avatar,Badge,withBadge,Input   } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import BottomBar from 'react-native-bottom-bar'
import BottomBarMenu from '../components/BotomBarMenu'
import { Card } from 'react-native-shadow-cards'
const image = { uri: "http://dev.itsontheway.net/api/imgBlanca" }
 const mainColor = "#bdbfc1"
 const pnkGradient = ["#ffffff", "#ffffff"]
export default class SearchStoreTypeView extends Component
{

  constructor(props) {
    super(props);
    console.log('id de cat'+JSON.stringify(this.props.cat_id))
        this.state = {
            partnersByCat: []
        }

        fetch('http://dev.itsontheway.net/api/clients/searchByCat/'+this.props.cat_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
             .then((responseData) => {
               console.log(responseData)
                 if (responseData.error){
                     alert(' por favor intenta nuevamente')
                   }
                 else{

                     this.setState({
                                partnersByCat: responseData.response.parterByCat
                            },() => {
                                console.log('PRUEBAAAA'+JSON.stringify(this.state.partnersByCat));
                              });
                 }
      }).catch((error) =>{
        console.error(error);
      })

  }

      renderMainIcon() {
          return (
            <Icon
              raised
             name='home'
             type='font-awesome'
             size={29}
             color="#d3e38c"
              />
          );
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

    renderFourthIconComponent() {
      return (
        <BottomBarMenu/>
      );
    }
     searchByCat(id){
      console.log('id de cat'+id)
      let cat_id = id
      Actions.searchStoreType({cat_id})
    }

  AllMyOrders = (viewId) =>
  {
      Actions.allmyOrders()
  }
   CurrentOrder(){
     Actions.orderClient()
    }
  render() {

    return (
      <View style={styles.container}>
	        <View style={styles.header} >
            <Icon
                  name='location'
                  type='evilicon'
                  size={20}
                  color='#a9d046'
                />
	          <Text style={styles.Title}  >Buscar</Text>
	        </View>
	        <View style={styles.header} >
              <Input
                  placeholder='escribe y pulsa para buscar'
                  leftIcon={
                      <Icon
                        name='search'
                        type='evilicon'
                        color='black'
                        />
                    }
                   inputContainerStyle={{borderRadius:10,
                     borderBottomColor:'transparent',
                      width:330,
                      height:35,
                      backgroundColor:'#e3e3e3',
                      marginBottom:5,
                      justifyContent:'center'
                   }}
                />
          </View>
            <View style={styles.productscontainer}>
               <ScrollView>


                     {this.state.partnersByCat.map(Object =>
                       <View style={styles.cardOrdercontainer}>
                          <Card style={styles.cardOrder} >
                                <Avatar
                                      rounded
                                      size="medium"
                                      source={image}
                                  />
                                    <Text style={styles.cardOrderSubTitle} >{Object.p_user}</Text>
                            </Card>
                      </View>)}
             </ScrollView>
          </View>



             <SafeAreaView style={styles.menutab}>
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
            </SafeAreaView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: "QUICKSAND-LIGHT",
  },
  header:{
    flexDirection: 'row',
    marginTop:20,
    marginLeft:10
  },
  Title: {
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color : '#373535',
    fontWeight:'bold'
},
SubTitle:{
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    color : '#bdbfc1',
    fontWeight:'bold'
  },
  menutab: {
    flex: 1,
  },
  productscontainer: {
       marginTop: 50,
        flexDirection: 'column',
      alignItems: 'flex-start',
    },
    cardOrderSubTitle:{
        fontSize: 19
    },
   menubarItemContainer: {
      borderBottomColor: '#bdbfc1',
      borderBottomWidth: 1,
      width:400,
      marginBottom:20,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft: 10,
     },
      cardOrdercontainer: {
        flexDirection: 'row',
     },
    cardOrder:{
      marginTop: 30,
      padding: 20,
      margin: 20,
      flexDirection: 'row',
      elevation: 8
    },
    cardOrderSubTitle: {
      fontSize: 20,
      marginLeft : 10,
      alignSelf: 'center'
    },

});

