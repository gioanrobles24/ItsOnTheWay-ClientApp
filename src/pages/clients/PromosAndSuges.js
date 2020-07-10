import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Switch,
  ToastAndroid,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Icon,
  Avatar,
  Badge,
  withBadge,
  Input,
  Card,
} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {AirbnbRating} from 'react-native-ratings';

const image = {uri: 'http://test.itsontheway.com.ve/api/parnetBanner1'};
const mainColor = '#bdbfc1';
const url = 'www.freakycoder.com';

const pnkGradient = ['#ffffff', '#ffffff'];

export default class PromoAndSugesClientView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [
        {
          title: 'nombre de producto',
          text: 'Nombre de restaurante',
        },
        {
          title: 'nombre de producto',
          text: 'Nombre de restaurante',
        },
        {
          title: 'nombre de producto',
          text: 'Nombre de restaurante',
        },
        {
          title: 'nombre de producto',
          text: 'Nombre de restaurante',
        },
        {
          title: 'nombre de producto',
          text: 'Nombre de restaurante',
        },
      ],
      carouselItems2: [
        {
          title: 'nombre de combo',
          text: 'Nombre de restaurante',
        },
        {
          title: 'nombre de combo',
          text: 'Nombre de restaurante',
        },
        {
          title: 'nombre de combo',
          text: 'Nombre de restaurante',
        },
        {
          title: 'nombre de combo',
          text: 'Nombre de restaurante',
        },
        {
          title: 'nombre de combo',
          text: 'Nombre de restaurante',
        },
      ],
    };
    state = {};
  }

  register = viewId => {
    Alert.alert(
      'Has sido verficado con exito',
      'Gracias por registrarte, ya puedes distrutar de nuestros servicios',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => Actions.homeClient()},
      ],
    );
  };

  _renderItem({item, index}) {
    return (
      <TouchableOpacity onPress={() => alert('Pressed!')}>
        <Card
          containerStyle={{
            flexDirection: 'row',
            width: 250,
            marginLeft: -20,
            marginTop: 30,
          }}
          imageStyle={{width: 249, height: 130}}
          image={image}>
          <Text style={{fontSize: 20, marginLeft: 5}}>{item.title}</Text>
          <Text style={{fontSize: 15, color: '#bdbfc1', marginLeft: 5}}>
            {item.text}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  }
  _renderItem2({item, index}) {
    return (
      <TouchableOpacity onPress={() => alert('Pressed!')}>
        <Card
          containerStyle={{
            flexDirection: 'row',
            width: 210,
            height: 200,
            marginLeft: -20,
            marginTop: 10,
          }}
          imageStyle={{width: 210, height: 200}}
          image={image}>
          <Text style={{fontSize: 20, marginLeft: 5}}>{item.title}</Text>
          <Text style={{fontSize: 15, color: '#bdbfc1', marginLeft: 5}}>
            {item.text}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.Title} h1>
            Promociones
          </Text>
        </View>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -30,
            }}>
            <Carousel
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={this.state.carouselItems2}
              sliderWidth={300}
              itemWidth={250}
              renderItem={this._renderItem}
              onSnapToItem={index => this.setState({activeIndex: index})}
            />
          </View>
        </SafeAreaView>
        <View>
          <Text style={styles.Title2} h1>
            Sugerencias
          </Text>
        </View>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -30,
            }}>
            <Carousel
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={this.state.carouselItems}
              sliderWidth={300}
              itemWidth={250}
              renderItem={this._renderItem2}
              onSnapToItem={index => this.setState({activeIndex: index})}
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
    fontFamily: 'QUICKSAND-LIGHT',
  },

  Title: {
    fontSize: 20,
    flexDirection: 'row',
    color: '#373535',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  Title2: {
    fontSize: 20,
    flexDirection: 'row',
    color: '#373535',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: -60,
  },
});
