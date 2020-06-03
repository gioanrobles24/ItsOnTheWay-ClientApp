import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableHighlight,TouchableOpacity,ScrollView
} from "react-native";
import { Icon,Avatar,Badge,withBadge,Image,Input,Card    } from 'react-native-elements'
  const image = { uri: "http://dev.itsontheway.net/api/parnetBanner1" }
  import { AirbnbRating } from 'react-native-ratings'

class Recomendations extends Component {

    renderProducts = (products,props) => {
        console.log(products)
        return products.map((item, index) => {
            return (
                <View key={index} >
                      <TouchableOpacity
                             onPress={() => this.props.onPress(item)}>
                              <Card containerStyle={{flexDirection: 'row',width:250, marginLeft:20,marginTop:30}}
                             imageStyle={{width: 249, height: 130}}
                             image={image}
                             >
                              <Text style={{fontSize: 20,marginLeft:5}}>{item.prod_name}</Text>
                             <Text style={{fontSize: 15, color: '#bdbfc1', marginLeft:5}}
                             >{item.partner_user}</Text>

                             <View style={{flexDirection:'row',marginLeft:5}}>
                                <AirbnbRating isDisabled={true} showRating={false} defaultRating={4}   size={15}/>
                                <Text style={{fontSize: 10, marginLeft: 30 }}>Bs.: {item.prod_price_bs}</Text>
                                 </View>
                            </Card>
                        </TouchableOpacity>

                </View>



            )
        })
    }



    render() {
        return (
            <View style={styles.container}>
            <ScrollView horizontal={true}>

                 {this.renderProducts(this.props.products)}

               </ScrollView>

            </View>
        );
    }
}
export default Recomendations;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
