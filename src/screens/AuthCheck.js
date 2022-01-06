import React, {Component} from 'react';

import {View, StyleSheet, Alert, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

 class AuthCheck extends Component {
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
 
     console.log('llllllllllllll',this.props.user.token);
      const login = await AsyncStorage.getItem('login');

   // const login = this.props.user.token;
      

      if (login !== null) {
       

        this.props.navigation.replace('Home');
        
      } else {
        
      
        this.props.navigation.replace('home');
      }
   
  };

  render() {

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      
      <ActivityIndicator 
     
     color="#00ff00"
            size="large"
            style={{
              backgroundColor: "rgba(1,195,181,.8)",
              height: 80,
              width: 80,
            
              zIndex: 999,
              borderRadius: 15
            }}
            size="small"
            color="#0000ff"
             />
             
      </View>
    );
  }
}




const mapStateToProps = state => {
  return {
    user: state.SeasonReducer,
  };
};
export default connect(
  mapStateToProps,
  null,
)(AuthCheck);

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
