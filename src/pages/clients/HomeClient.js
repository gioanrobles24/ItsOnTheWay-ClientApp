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
import { createStackNavigator } from 'react-navigation'
import RNPickerSelect from 'react-native-picker-select'
import Carousel , { ParallaxImage } from 'react-native-snap-carousel'
import { SideMenu } from 'react-native-side-menu'
import  MenuDrawer from 'react-native-side-drawer'
import { AirbnbRating } from 'react-native-ratings'
import BottomBar from 'react-native-bottom-bar'
import BottomBarMenu from '../components/BotomBarMenu'
import {Provider} from 'react-redux'
import store from '../../store'
import {connect} from 'react-redux'
import Products from '../components/Products'
import {electronics} from '../components/Data'
 // import { Card } from 'react-native-shadow-cards';
  const image = { uri: "http://dev.itsontheway.net/api/parnetBanner1" }

  const win = Dimensions.get('window');
  const ratio = win.width/541;


  const mainColor = "#bdbfc1";
  const url = "www.freakycoder.com";

  const pnkGradient = ["#ffffff", "#ffffff"];





 class HomeClientView extends Component
{
  constructor(props) {
      super(props)
      this.mainIconOnPress = this.mainIconOnPress.bind(this);
      this.state = {
                activeIndex:0,
                  open: false,
                  data: this.props.responseData.response.client_info,
                carouselItems:
                [
                      {   id:1,
                          title:"nombre de producto",
                          text: "Nombre de restaurante"
                      },
                      {    id:1,
                          title:"nombre de producto",
                          text: "Nombre de restaurante",
                      },
                      {
                          id:2,
                          title:"nombre de producto",
                          text: "Nombre de restaurante",
                      },
                      {
                          id:3,
                          title:"nombre de producto",
                          text: "Nombre de restaurante",
                      },
                      {
                          id:4,
                          title:"nombre de producto",
                          text: "Nombre de restaurante",
                      },
                ],
                 carouselItems2:
                [
                      {
                          text: "Desayunos",
                      },
                      {
                        text: "Almuerzos",
                      },
                      {
                          text: "Cenas",
                      },
                      {
                        text: "Text 5",
                      },
                      {
                        text: "Text 5",
                      },
                ]
        }

           if(this.state.doubleBackToExitPressedOnce) {
              BackHandler.exitApp();
            }
            ToastAndroid.show('Por favor vuelve a presionar para salir.', ToastAndroid.SHORT);
            this.setState({ doubleBackToExitPressedOnce: true });
            setTimeout(() => {
              this.setState({ doubleBackToExitPressedOnce: false });
            }, 2000);
            return true;
    }

    state = {}
    mainIconOnPress() {
    // Magic happens for main icon on press
          alert("mainIconOnPress");
    }

    searchByCat(){
      Actions.searchStoreType()
    }
    CurrentOrder(){
     Actions.orderClient()
    }
     PromoAndSuges(){
     Actions.promoAndSuges()
    }
    productView(){
      this.props.addItemToCart
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
                    this.searchByCat()}
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
              <TouchableOpacity
                // onPress={() => {
                //   this.openURL();
                // }}
              >
                <Icon
                  name='heartbeat'
                  type='font-awesome'
                  size={20}
                  color={mainColor}
                  onPress={() =>   {
                    this.searchByCat()}
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
                    this.searchByCat()}
                 }
                />
                <Text style={{fontSize:10,color:'#bdbfc1'}}>Tienda</Text>
        </View>
      );
    }

    renderFourthIconComponent ()  {
      return  (
        <BottomBarMenu/>
      );
    }

    _renderItem({item,index,props}){
      console.log(electronics);
        return (
           <Card containerStyle={{flexDirection: 'row',width:279, marginLeft:-20, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
              imageStyle={{width: 276, height: 130, borderRadius: 15}}
              roundImage
              image={image}>
            <Text>{item.text}</Text>
          </Card>
        );
    }
    _renderItem2 ({item, index}, parallaxProps) {
        return (
           <Card containerStyle={{flexDirection: 'row',width:279, marginLeft:-20, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
              imageStyle={{width: 276, height: 130, borderRadius: 15}}
              roundImage
              image={image}>
            <Text>{item.text}</Text>
          </Card>
        );
    }
    _renderItem3 ({item, index}, parallaxProps) {
        return (
           <Card containerStyle={{flexDirection: 'row',width:279, height:130, marginLeft:-20, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}
              imageStyle={{width: 276, height: 130, borderRadius: 15}}
              roundImage
              image={image}>
          </Card>
        );
    }

    allmyOrders = (viewId) => {
         Actions.allmyOrders()
      }

       alladdress = (viewId) => {
         Actions.addressClient()
      }
    seeAll = (item) => {
        this.props.addItemToCart
      }
    handleBackButton = () => {
          if(this.state.doubleBackToExitPressedOnce) {
            BackHandler.exitApp();
          }
          ToastAndroid.show('Por favor vuelve a presionar para salir.', ToastAndroid.SHORT);
          this.setState({ doubleBackToExitPressedOnce: true });
          setTimeout(() => {
            this.setState({ doubleBackToExitPressedOnce: false });
          }, 2000);
          return true;
      }

     toggleOpen = () => {
        this.setState({ open: !this.state.open });
     }
     drawerContent = () => {
        return (

          <View style={styles.animatedMenuBox}>
                            <TouchableOpacity onPress={this.toggleOpen}>
                               <Icon
                                    name='arrow-left'
                                    type='font-awesome'
                                    color='#a9d046'
                                    iconStyle={{marginLeft: 10, flexDirection:'column', alignSelf: 'flex-start', marginTop:20 }}
                                   />
                            </TouchableOpacity>


                  <Avatar
                   rounded
                   size="xlarge"
                   overlayContainerStyle={{backgroundColor: '#bdbfc1',}}
                   containerStyle={{alignSelf: "center", flexDirection:'column',
                   marginTop: 20,}}
                   source={image}
                  />

                  <Text style={styles.animatedBoxTextSpecial}  h3>{this.state.data.cl_name}</Text>
                <View style={styles.MenubarContainer}>

                      <View style={styles.menubarItemContainer} >
                           <Icon
                                name='credit-card'
                                type='evilicon'
                                color='#bdbfc1'
                                iconStyle={styles.menubarIconLeft}
                                onPress={() =>   {
                                    this.allmyOrders()}
                                  }
                               />
                                <Text style={styles.menubarItemText} onPress={() =>   {
                                    this.allmyOrders()}
                                  } >Mis pedidos</Text>
                            <Icon
                                name='chevron-right'
                                type='evilicon'
                                color='#bdbfc1'
                                iconStyle={styles.menubarIconRight}
                                onPress={() =>   {
                                    this.allmyOrders()}
                                  }
                               />
                      </View>
                       <View style={styles.menubarItemContainer}>
                          <Icon
                                type='font-awesome'
                                name='map-marker'
                                color='#bdbfc1'
                                iconStyle={styles.menubarIconRight}
                                onPress={() =>   {
                                    this.alladdress()}
                                  }
                               />

                                  <Text style={styles.menubarItemText} onPress={() =>   {
                                    this.alladdress()}
                                  }>Mis dirreciones</Text>
                            <Icon
                                name='chevron-right'
                                type='evilicon'
                                color='#bdbfc1'
                                iconStyle={styles.menubarIconRight}
                                onPress={() =>   {
                                    this.seeAll()}
                                  }
                               />
                      </View>

                     <TouchableHighlight style={[styles.salirboton, styles.salirbotonButton]}
                          onPress={() =>  {
                                this.handleBackButton ()}
                              }
                             >

                            <Text style={styles.salirbotonText}>Salir</Text>
                      </TouchableHighlight>
                </View>
          </View>

        );
    }

  render() {

    return (
      <View style={styles.container}>
               <MenuDrawer
                      open={this.state.open}
                      drawerContent={this.drawerContent()}
                      drawerPercentage={100}
                      animationTime={450}
                      overlay={true}
                      opacity={0.8}
                >

            	          <View style={styles.headerBarContainer} >
                                <View style={styles.headerBar} >
                                      <Image
                                        source={{ uri: 'http://dev.itsontheway.net/api/imgBlanca'}}
                                        style={{ width: 150, height: 80,marginRight:80}}
                                        />
                                          <TouchableHighlight underlayColor={'transparent'} onPress={this.toggleOpen}>
                                              <Icon
                                                  name='navicon'
                                                  type='evilicon'
                                                  color='#ffffff'
                                                  size={35}
                                                  iconStyle={{marginRight:15, marginTop:10}}

                                            />
                                  </TouchableHighlight>

                               </View>
                                <View style={styles.headerBar} >
                                   <Input
                                       placeholder=''
                                       leftIcon={
                                       <Icon
                                          name='search'
                                          type='evilicon'
                                          color='black'
                                          />
                                         }
                                        inputContainerStyle={{borderRadius:20,
                                        borderBottomColor:'transparent',
                                         width:330,
                                         height:35,
                                         backgroundColor:'white',
                                         alignSelf: 'center',
                                         marginBottom:5,
                                         justifyContent:'center'
                                      }}
                                   />
                               </View>
                         </View>
               <ScrollView>
                         <View style={styles.container1} >
                                <Text style={styles.container1Title} h3>Recomendaciones...</Text>


                                <Text style={styles.container2Title} onPress={() =>   {
                                  this.PromoAndSuges()}
                                }  h3>Ver todo</Text>
                         </View>
            	          <SafeAreaView style={{flex: 1}}>
                                <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', marginTop:-30 }}>

                                  <Products products={electronics} onPress={this.props.addItemToCart}/>
                                </View>
                        </SafeAreaView>
                         <View style={styles.container4} >
                              <Text style={styles.container1Title} h3>PROMOCIONES</Text>
                         </View>

                      <SafeAreaView style={{height: 100, }}>

                      </SafeAreaView>
                  </ScrollView>

            </MenuDrawer>

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


const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}
export default  connect(null,mapDispatchToProps)(HomeClientView);

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    fontFamily: "QUICKSAND-LIGHT",
  },
   headerBarContainer: {
     marginTop:-5,
    flexDirection: 'column',
    backgroundColor: '#a9d046',
    height: 130,
    alignItems: 'center'
  },
  headerBar: {
    flexDirection: 'row',
    alignSelf: 'flex-end'

  },
  headerBarIcon:{
  },
  container1:{
    marginTop: 30,
    flexDirection:'row',
    marginLeft: 15,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  container1Title:{
      fontSize: 15,
      fontWeight:'bold'
  },
  container2Title:{
      fontSize: 15,
      color: '#d3e38c'
  },
  container4:{
    flexDirection:'row',
    marginLeft: 15,
    marginTop:10
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'white',
    borderRadius: 8
  },
  imagenes: {
    resizeMode: 'cover',
  },

   animatedMenuBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: -5,
  },
   animatedBoxTextSpecial: {
     flexDirection: 'column',
      flex: 0.1,
    fontSize: 25,
    color: '#373535',
    marginTop: 30,
    alignSelf: "center",
  },
  bodyOpenMenu: {
    flex: 1,
  },
   MenubarContainer:{
     flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
     flex: 0.7,
   },

    menubarItemContainer: {
      borderBottomColor: '#bdbfc1',
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      width:400,
      height:55,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',

       },
  menubarItemText:{
      flex: 0.8,
      marginLeft:12,
      justifyContent: 'center'
  },

  menubarIconLeft: {
     marginStart: 25
  },
   menubarIconRight: {
     marginStart: 25
  },
   salirboton:  {
    marginTop: 70,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width:270,
    borderRadius:5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
  },

  salirbotonButton: {
    backgroundColor: "#a9d046",
  },
  salirbotonText: {
    fontFamily: "QUICKSAND-LIGHT",
    color: 'white',
  },
   menutab: {
    flex: 1,
  }

});

