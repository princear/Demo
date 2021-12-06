import React, {Component} from 'react';

import {View, StyleSheet, Alert, Image, ActivityIndicator} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class AuthCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      login: false,
    };
  }

  componentDidMount() {
    console.log('wokring');
    setTimeout(() => {
        
    this.readData();
    }, 1000);
  }

  readData = async () => {
 
     
      const login = await AsyncStorage.getItem('login');
      

      if (login !== null) {
       

        this.props.navigation.replace('Home');
      } else {
        

        this.props.navigation.replace('home');
      }
   
  };

  render() {

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      
      <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width:'100%',
    height:'100%',
    
    
        resizeMode: 'stretch'
        
  }
});
