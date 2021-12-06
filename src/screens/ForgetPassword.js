import React, { Component } from 'react';
import { View, Image, ImageBackground, Text,TextInput ,TouchableOpacity, Linking,StyleSheet, Alert, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { apiscreen } from '../Api/apiscreen';
import AsyncStorage from "@react-native-community/async-storage";


export default class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading:false,
        email:'',
       
        }
    
        
      }



      _onForgetPassword = () => {

       
        const email = this.state.email;
     


        const url = apiscreen.base_url + apiscreen.ForgetPass;
         // console.log("url:"+url);
         this.setState({
          isLoading:true
        })

fetch(url,
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  
 
                  email :email,
                
                  
                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
              this.setState({
                isLoading:false
              })
               if(responseJsonFromServer.status == '1'){

                    console.log(responseJsonFromServer);
                    let otp = responseJsonFromServer.data.otp;
                    let token = responseJsonFromServer.data.otp_token;
                    let email = responseJsonFromServer.data.email;
                    console.log(otp, token, email);
                this.props.navigation.navigate("ResetPassword",{

                   otp : otp,
                   token:token,
                   email : email 

                });

               }
               else{
               Alert.alert('Invalid Email');
               }
 
               this.setState({ ActivityIndicator_Loading : false });
 
            }).catch((error) =>
            {
              this.setState({
                isLoading:false
              })
                console.error(error);
 
               
            });

      
      }

    render(){

     
        return(

 <ImageBackground style={{ flex: 1,resizeMode:'contain' }} source={require('../../assets/images/BG.png')} >
             {(this.state.isLoading) &&
             <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>
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
     </View>}
            <View style={styles.container}>
              
              
                {/* <ImageBackground style={{ flex: 1,resizeMode:'contain',marginTop:60 }} source={require('../../assets/images/BG.png')} >
               */}
               <KeyboardAwareScrollView>   
               <View style={{paddingTop:0}}>
                    <Image style={{ marginTop: 10, resizeMode: 'contain', width:'50%', alignSelf: "center" }}
                    source={require('../../assets/images/2.png')}
                    />
                    
                </View>
                <View style={{}}>
                    <Image style={{ height:150, alignSelf: "center",resizeMode:'center' }}
                    source={require('../../assets/images/1.png')}
                    />
                    
                </View> 
                    <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',paddingTop:20,fontSize:22}}>Forget Password</Text>
                <View style={{padding:20,marginTop:20}}>
                    <TextInput placeholder="Email"
                    onChangeText={(email) => this.setState({email})}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />
       
 

                <TouchableOpacity
                style={{ alignSelf:'center',marginTop: 0, width: 100, height: 50, borderRadius: 50, justifyContent: 'center' }}
              
                onPress={() => this._onForgetPassword()}
               >
                <Image style={{ resizeMode:'center',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/Button.png')}
                    />
              </TouchableOpacity>

              <TouchableOpacity
                 onPress={() => this.props.navigation.navigate('LogInScreen')}
              style={{ marginTop: 0, height: 50, borderRadius: 50, justifyContent: 'center' }}>
                            <Text style={{  fontSize: 16, marginTop: 30,textAlign:'center' }}>Sign In</Text>
             </TouchableOpacity>       
              </View>
              </KeyboardAwareScrollView>
                {/* </ImageBackground> */}
              

            </View>
            </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({

container:{ 
  flex:1,
    
    
}

})