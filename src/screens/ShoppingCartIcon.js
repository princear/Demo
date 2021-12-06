import React,{ Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,TouchableOpacity, Alert,Image
} from "react-native";


import { connect}  from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

 class ShoppingCartIcon extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
       
       
        }
    
        this._shop= this._shop.bind(this);
      }


      _shop = () =>{

       // Alert.alert('Shopss');
        props.navigation.navigate('Basket');
      }


render(){
    const props= this.props;
    return(

       
    <View style={[{ padding: 5 }, Platform.OS == 'android' ? styles.iconContainer : null]}>
      
        <TouchableOpacity  style={{flexDirection:'row',padding:0, height:38, margin: 3,marginTop:10}}
                   onPress={() => props.navigation.navigate('Basket')}
      
        >
        
        
        <View style={{
            position: 'absolute', height: 25, width: 25, borderRadius: 15, backgroundColor: '#FBAA9A', left: 25, bottom: 25, alignItems: 'center', justifyContent: 'center', zIndex: 2000,

        }}>
            <Text style={{ color: '#fff', fontWeight: 'bold',fontSize:16 }}>{props.cartItems.length}</Text>
        </View>
          <Image source={require('../../assets/images/carticon.png')} style={{width:35,height:35}}/>
          
        </TouchableOpacity >
      
    </View>
)


}

}
const mapStateToProps = (state) => {
  console.log(state);
  
  
 
    return {
        cartItems: state,
      
        
    }
}

export default connect(mapStateToProps)(ShoppingCartIcon);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }
});