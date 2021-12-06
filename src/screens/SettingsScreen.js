import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, Linking,StyleSheet } from "react-native";

export default class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        
        }
    
        
      }

    render(){
        return(

         <View style={{flex:1,justifyContent:'center'}}>
             <Text style={{alignSelf:'center',textAlign:'center'}}>Setting Screen</Text>
         </View>
        )
    }
}



const styles = StyleSheet.create({

container:{ 
  flex:1,
    
    
}

})