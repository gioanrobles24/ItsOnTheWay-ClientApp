import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
  Image,
  Alert,
  Switch,
  ToastAndroid,
  BackHandler,
  Picker,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import {Card} from 'react-native-shadow-cards';
import {connect} from 'react-redux';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GetLocation from 'react-native-get-location';
import {green} from '../../colors';
import {isPointInPolygon} from 'geolib';
import {setAddresses} from '../../reducers/addresses';
import Autocomplete from 'react-native-autocomplete-input';
import {config} from '../../config';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
const markerIcon = require('../../assets/marker.png');

const image = {uri: 'http://test.itsontheway.com.ve/api/imgBlanca'};

class NewAddressClientView extends Component {
  constructor(props) {
    super(props);
    //  this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      zones: [],
      searchOptions: [],
      coordinates: props.address
        ? [
            parseFloat(props.address.address_lon),
            parseFloat(props.address.address_lat),
          ]
        : [0, 0],
      description: props.address ? props.address.description : '',
    };

    this.props.navigation.setParams({
      title: props.address ? 'Actualizar Dirección' : 'Agregar una Dirección',
    });
  }

  fetchAddresses() {
    fetch(
      `http://test.itsontheway.com.ve/api/clients/address_client/${
        this.props.user.response.client_info.id
      }`,
    )
      .then(resp => resp.json())
      .then(resp => {
        this.props.setAddresses(resp.response.address_client);
      })
      .catch(console.log);
  }

  fetchZones() {
    fetch(`${config.apiUrl}/aviable_zones`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({zones: resp.zones_aviables});
      })
      .catch(e => {
        Alert.alert('Error');
      });
  }
  componentDidMount() {
    this.fetchZones();

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        if (!this.props.address) {
          this.setState({coordinates: [location.longitude, location.latitude]});
        }
      })
      .catch(error => {
        const {code, message} = error;
      });
  }

  newAddress = viewId => {
    const {description} = this.state;
    let zone;

    const coordinate = {
      latitude: this.state.coordinates[1],
      longitude: this.state.coordinates[0],
    };

    if (this.state.zones.length === 0) {
      Alert.alert('Error', 'Error al cargar las zonas validas');
      return;
    } else {
      zone = this.state.zones
        .map(z => ({
          id: z.id,
          coordinates: z.zones_markers.map(m => ({
            latitude: m.marker_lat,
            longitude: m.marker_lon,
          })),
        }))
        .find(zone => isPointInPolygon(coordinate, zone.coordinates));
      if (!zone) {
        Alert.alert('No enviamos a esta dirección');
        return;
      }
    }

    if (description) {
      Alert.alert(
        'Hola! Por favor confirma: ',
        this.props.address
          ? '¿Estas seguro de actualizar esta dirección?'
          : '¿Estás seguro de agregar esta dirección?',
        [
          {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Si',
            onPress: () => {
              const body = JSON.stringify({
                description,
                cl_id: this.props.user.response.client_info.id,
                mun_id: this.state.zones.find(z => z.id === zone.id).mun_id,
                zone_id: zone.id,
                address_lat: coordinate.latitude,
                address_lon: coordinate.longitude,
                client_address_id: this.props.address
                  ? this.props.address.client_address_id
                  : undefined,
              });

              const url = this.props.address
                ? 'http://test.itsontheway.com.ve/api/clients/edit_address_client'
                : 'http://test.itsontheway.com.ve/api/clients/new_address_client';

              fetch(url, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: body,
              })
                .then(resp => {
                  return resp.json();
                })
                .then(resp => {
                  if (resp.error) {
                    Alert.alert(resp.error);
                  } else {
                    this.fetchAddresses();
                    Actions.pop();
                  }
                })
                .catch(e => Alert.alert('Error'));
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert('Por favor ingresa la descripcion');
    }
  };

  render() {
    const marker = {
      type: 'FeatureCollection',
      features:
        this.state.coordinates.length > 0
          ? [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: this.state.coordinates,
                },
              },
            ]
          : [],
    };
    const searchPlace = text =>
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
          text,
        )}.json?access_token=${config.mapboxKey}&country=VE`,
      ).then(resp => resp.json());
    const debouncedSearch = AwesomeDebouncePromise(searchPlace, 1000);
    return (
      <View style={styles.container}>
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            containerStyle={{width: '95%', alignSelf: 'center'}}
            inputContainerStyle={{padding: 5, backgroundColor: 'white'}}
            placeholder="Busca una dirección"
            data={this.state.searchOptions}
            onEndEditing={() => {
              this.setState({
                searchOptions: [],
              });
            }}
            renderItem={({index, item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      coordinates: item.center,
                      searchOptions: [],
                    });
                  }}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: green,
                  }}>
                  <Text>{item.place_name}</Text>
                </TouchableOpacity>
              );
            }}
            onChangeText={async text => {
              const result = await debouncedSearch(text);
              if (result) {
                this.setState({searchOptions: result.features});
              }
            }}
          />
        </View>
        <MapboxGL.MapView
          style={{flex: 1, flexGrow: 1}}
          onPress={e => {
            if (e.type === 'Feature') {
              this.setState({coordinates: e.geometry.coordinates});
            }
          }}>
          {/* <MapboxGL.UserLocation visible={true} /> */}
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={this.state.coordinates}
            // followUserMode="normal"
            // followUserLocation
          />
          <MapboxGL.ShapeSource
            id="marker"
            shape={marker}
            key={JSON.stringify(this.state.coordinates)}>
            {/* <MapboxGL.CircleLayer id="marker" /> */}

            <MapboxGL.SymbolLayer
              id="marker"
              style={{
                iconImage: markerIcon,
                iconColor: green,
                iconSize: 1,
                iconAllowOverlap: true,
              }}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        <View style={styles.inputContainer}>
          <TextInput
            numberOfLines={4}
            multiline
            style={styles.inputs}
            placeholder="Edificio, Casa, Calle, Referencia, etc."
            underlineColorAndroid="transparent"
            onChangeText={description => this.setState({description})}
            value={this.state.description}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.newAddress();
          }}>
          <Text style={styles.loginText}>Agregar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setAddresses: addresses => dispatch(setAddresses(addresses)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAddressClientView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'QUICKSAND-LIGHT',
  },
  SubTitle: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 15,
    zIndex: 1,
  },
  Text: {
    color: '#bdbfc1',
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
  },
  Title: {
    fontSize: 25,
    color: '#373535',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderBottomColor: '#bdbfc1',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputs: {
    marginTop: 5,
    borderRadius: 15,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    borderColor: green,
    borderWidth: 2,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  loginButton: {
    backgroundColor: '#a9d046',
    alignSelf: 'center',
  },
  loginText: {
    fontFamily: 'QUICKSAND-LIGHT',
    color: 'white',
  },
});
