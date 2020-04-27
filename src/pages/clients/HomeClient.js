import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,Switch, ToastAndroid,BackHandler,Picker,SafeAreaView,Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon,Avatar,Badge,withBadge,Image,Input    } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import Carousel , { ParallaxImage } from 'react-native-snap-carousel'
  const image = { uri: "http://dev.itsontheway.net/api/parnetBanner1" }
  const win = Dimensions.get('window');
  const ratio = win.width/541;
export default class HomeClientView extends Component
{
  constructor(props) {
    super(props)
    this.state = {
          activeIndex:0,
          carouselItems:
          [
                {
                    title:"Item 1",
                    text: "Text 1",
                },
                {
                    title:"Item 2",
                    text: "Text 2",
                },
                {
                    title:"Item 3",
                    text: "Text 3",
                },
                {
                    title:"Item 4",
                    text: "Text 4",
                },
                {
                    title:"Item 5",
                    text: "Text 5",
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
  }
    state = {}


    _renderItem({item,index}){
        return (
          <View style={{

              height: 250,
              marginLeft: 5,
              marginRight: 25,
              borderColor: 'transparent',
              elevation:10,
              justifyContent:'center',
              alignItems: 'center'
            }}>
             <Image  source={image}  style={{ height: 150, width: 250,marginTop:8,marginLeft:1, borderRadius: 5}}/>
              <Text style={{fontSize: 20}}>{item.title}</Text>

            <Text>{item.text}</Text>
          </View>

        )
    }
    _renderItem2 ({item, index}, parallaxProps) {
        return (
           <View style={{
              height: 250,
              marginRight: 25,
              borderColor: 'transparent',
              justifyContent:'center',
              alignItems: 'center'
            }}>
             <Image  source={image}  style={{ width: 250,
                  height: 250 * ratio}}/>
            <Text>{item.text}</Text>
          </View>
        );
    }




    seeAll = (viewId) => {
         alert('ver')
      }



  render() {

    return (
      <View style={styles.container}>
        	          <View style={styles.headerBarContainer} >
                            <View style={styles.headerBar} >
                                  <Image
                                    source={{ uri: 'http://dev.itsontheway.net/api/imgBlanca'}}
                                    style={{ width: 150, height: 80, marginLeft:8}}
                                    />

                                  <Icon
                                    name='navicon'
                                    type='evilicon'
                                    color='#ffffff'
                                    size={35}
                                    iconStyle={{marginRight:15, marginTop:10}}
                                  />
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

                   <View style={styles.container1} >
                          <Text style={styles.container1Title} h3>Recomendaciones...</Text>


                          <Text style={styles.container2Title} onPress={() =>   {
                            this.seeAll()}
                          }  h3>Ver todo>>  </Text>
                   </View>


      	          <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
                          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', marginTop:-30 }}>
                              <Carousel
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.carouselItems}
                                sliderWidth={300}
                                itemWidth={300}
                                renderItem={this._renderItem}
                                onSnapToItem = { index => this.setState({activeIndex:index}) } />
                          </View>
                </SafeAreaView>

                <View style={styles.container4} >
                          <Text style={styles.container1Title} h3>PROMOCIONES</Text>

                   </View>
                <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
                          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', marginTop:-70,marginLeft:16 }}>
                              <Carousel
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.carouselItems2}
                                sliderWidth={250}
                                itemWidth={250}
                                renderItem={this._renderItem2}
                                onSnapToItem = { index => this.setState({activeIndex:index}) } />
                          </View>
                </SafeAreaView>

          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    fontFamily: "QUICKSAND-LIGHT",
  },
   headerBarContainer: {
    flexDirection: 'column',
    backgroundColor: '#a9d046',
    height: 125,
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
    justifyContent: "space-between",
  },
  container1Title:{
      fontSize: 15,
  },
  container2Title:{
      fontSize: 15,
      color: '#d3e38c'
  },
  container4:{
    marginTop: -58,
    flexDirection:'row',
    marginLeft: 15,
    marginBottom: 17
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
});

