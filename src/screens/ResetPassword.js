import React, { Component } from 'react';
import { View, Image, ImageBackground, Text,TextInput ,TouchableOpacity, Linking,StyleSheet, Alert,ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import CountryPicker from 'react-native-country-picker-modal'
import { apiscreen } from '../Api/apiscreen';
//import APIScreen from '../Api/apiscreen'


const countryPickerCustomStyles = {};
export default class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          otp:'',
          email:'',
          token:'',
          password:'',
          confirmpass:'',
          isLoading:false
          

          
        }
    
        
      }

     


_onsubmit = (otp1,token1,email1) => {

  const otp = otp1
  const email = email1;
  const token = token1;
  const password = this.state.password;
  const confirmpass = this.state.confirmpass;

console.log(otp,email,token,password,confirmpass);

const url = apiscreen.base_url + apiscreen.ResetPass;
console.log("url:"+url);
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
                  otp : otp1,
 
                  otp_token :token1,
                  email: email1,  
                   
                  password:password,
                  password_confirmation:confirmpass
                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                this.setState({
                    isLoading:false
                  })
               if(responseJsonFromServer.status == '1'){
                  console.log(responseJsonFromServer)
                  Alert.alert(responseJsonFromServer.data.message);
                  this.props.navigation.navigate('LogInScreen');
               }
               else{
                  Alert.alert('password Error');
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

        const { navigation } = this.props;  
        const otp = this.props.route.params.otp;
        const token = this.props.route.params.token;
        const email = this.props.route.params.email;   
        
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
             </View>
    }

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
                    <Image style={{ height:100, alignSelf: "center",resizeMode:'center' }}
                    source={require('../../assets/images/1.png')}
                    />
                    
                </View> 
                    <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',paddingTop:20,fontSize:22}}>Reset Password</Text>
                <View style={{padding:20,marginTop:20}}>
                    {/* <TextInput placeholder="Enter OTP"
                      onChangeText={(otp) => this.setState({otp})}
                      value={otp.toString()}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />

<TextInput placeholder="Access Token"
onChangeText={(token) => this.setState({token})}
value={token}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />

<TextInput placeholder="Email"
onChangeText={(email) => this.setState({email})}
value={email}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />   
   */}
      <TextInput placeholder="Password"
       onChangeText={(password) => this.setState({password})}
       secureTextEntry={true}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />
    <TextInput placeholder="Confirm Password"
     onChangeText={(confirmpass) => this.setState({confirmpass})}
     secureTextEntry={true}
      style={{height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    /> 
   
  
 

                <TouchableOpacity
                style={{ alignSelf:'center',marginTop: 0, width: 100, height: 50, borderRadius: 50, justifyContent: 'center' }}
               // onPress={() => this.props.navigation.navigate('LogInScreen')}
                onPress={() => this._onsubmit(otp,token,email)}
               >
                <Image style={{ resizeMode:'center',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/Button.png')}
                    />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LogInScreen')}
              style={{ marginTop: 0, height: 50, borderRadius: 50, justifyContent: 'center' }}>
                            <Text style={{  fontSize: 14, marginTop: 30,textAlign:'center' }}>Already Member? SIGN IN HERE</Text>
                        </TouchableOpacity>    */}
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
    
    
},
countryPicker:{
  borderColor:'black',
  borderWidth:2
  
},
callingCodeView: {
  alignItems: 'center',
  justifyContent: 'center',
  
  height:50

},

callingCodeText: {

  
  paddingRight: 12,
},

})