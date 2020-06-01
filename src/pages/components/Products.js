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

class Products extends Component {

    renderProducts = (products,props) => {
        console.log(products)
        return products.map((item, index) => {
            return (
                <View key={index} style={styles.cardOrdercontainer}>
                      <TouchableOpacity onPress={() => this.props.onPress(item)}>
                             <Card containerStyle={styles.cardOrder} >
                                  <Avatar
                                        rounded
                                        size="large"
                                        source={{uri: 'http://dev.itsontheway.net/images/productos/'+Object.prod_partner_id+'/'+Object.prod_image,}}
                                  />

                              <Text style={styles.cardOrderSubTitle}>{item.prod_name}</Text>
                             <Text style={styles.cardOrderSubTitle}
                             >Bs.: {item.prod_price_bs}</Text>

                             <View style={{flexDirection:'row',marginLeft:5}}>
                                <Text style={{fontSize: 10, marginLeft: 30 }}>Descripcción: {item.prod_description}</Text>
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
export default Products;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containertitle:{
    marginTop:10,
    flexDirection:'row',
    maxWidth: 600,
    alignItems:'center',
    justifyContent:'center',
    elevation:-1,
    height:80
  },
    cardOrdercontainer: {
        justifyContent: 'center',
     },
   cardOrder:{
      flexDirection: 'row',
      alignItems: 'center',
      width: 300
    },
});