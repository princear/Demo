import React, { Component } from 'react';
import { View, Image, ImageBackground, Text,BackHandler, TouchableOpacity, Linking,StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        isLoading:false
        }
        
      }

      UNSAFE_componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
      handleBackButtonClick() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaa')
       // this.props.route.params.onGoBack();
        this.props.navigation.goBack();
        return false;
        
    }

      goBack = () => {
      //  this.props.route.params.onGoBack();
        this.props.navigation.goBack();
       
    }

      componentDidMount() {
        console.log('wokringaaaaaaaaaa');
        AsyncStorage.removeItem('login');
      //   setTimeout(() => {
            
      //  // this.readData();
      //   }, 1000);
      }
    
      // readData = async () => {
     
         
      //     const login = await AsyncStorage.getItem('login');
    
      //     if (login == null) {
           
    
      //       this.props.navigation.navigate('Home');
      //     } else {
            
    
      //       this.props.navigation.navigate('Auth');
      //     }
       
      // };

     

    render(){

        return(

            <View style={styles.container}>
              <ScrollView>
                <View style={{paddingTop:0}}>
                    <Image style={{ marginTop: 10, resizeMode: 'contain', width:'50%', alignSelf: "center" }}
                    source={require('../../assets/images/2.png')}
                    />
                  
                </View>
                <View style={{marginTop:50}}>
                    <Image style={{ width:'90%',height:250, alignSelf: "center" }}
                    source={require('../../assets/images/1.png')}
                    />
                    
                </View>
                <ImageBackground style={{ flex: 1,resizeMode:'contain',marginTop:60 }} source={require('../../assets/images/BG.png')} >
                    {/* <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',paddingTop:50,fontSize:18}}>When you eat rainbow</Text>
                <Text style={{textAlign:'center',fontSize:12,paddingTop:20}}>
                        Eating the rainbow is the best for your body. It is a great and genuine guideline for daily, weekly
                        and monthly food consumption and diet despite your age, weight, health condition or
                        background.
                </Text> */}

                <TouchableOpacity
                style={{ alignSelf:'center',marginTop: 40, width: 100, height: 50, borderRadius: 50, justifyContent: 'center' }}
                onPress={() => this.props.navigation.navigate('LogInScreen')}
               >
                <Image style={{ resizeMode:'center',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/Button.png')}
                    />
              </TouchableOpacity>


                </ImageBackground>
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({

container:{ 
  flex:1,
    
    
}

})