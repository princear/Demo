import React, { Component } from 'react';
import { View, Image, ImageBackground, Text,TextInput ,TouchableOpacity, Linking,StyleSheet, Alert, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { apiscreen } from '../Api/apiscreen';
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from 'react-redux';
import { LoginUser } from '../Redux/Actions/UserAction';


 class LogInScreen extends Component {

  accessToken = "";
  profileDetails = "abc";

    constructor(props) {
        super(props);
        this.state = {
          isLoading:false,
        email:'',
        password:'',
        
        }
    
        
      }



      _onLogin = () => {

        this.setState({
          isLoading:true
        })
        const email = this.state.email;
        const password = this.state.password;


       
         // console.log("url:"+url);
         
       


         

          setTimeout(() => {
            this.setState({
              isLoading:false
            })
            this.props.LoginUser(email,password, this.props.navigation);
          }, 2000);
          
//         const url = apiscreen.base_url + apiscreen.login;
// fetch(url,
//             {
//                 method: 'POST',
//                 headers: 
//                 {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(
//                 {
                  
 
//                   email :email,
//                   password:password,
                  
//                 })
 
//             }).then((response) => response.json()).then((responseJson) =>
//             {
//               console.log("from login*** ");
//               console.log("from login*** ",responseJson.data);
//               this.setState({  isLoading:false })
//                if(responseJson.status == '1'){
//                   console.log("from login ",responseJson.data);
                
//                 AsyncStorage.setItem("login",JSON.stringify(responseJson.data));
             
//                //this.props.navigation.goBack(null);
//                 this.props.navigation.navigate("AuthCheck");

//                }
//                else{
//                   Alert.alert('Invalid Credentials');
//                }
 
//                this.setState({ ActivityIndicator_Loading : false });
 
//             }).catch((error) =>
//             {
//               this.setState({
//                 isLoading:false
//               })
//                 console.error(error);
 
               
//             });

      
      }

    render(){

     
        return(

 <ImageBackground style={{ flex: 1,resizeMode:'contain' }} source={require('../../assets/images/BG.png')} >
             {(this.state.isLoading) &&
             <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>
     <ActivityIndicator 
     
   
           
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
                    source={require('../../assets/images/222.png')}
                    />
                    
                </View>
                <View style={{width:'70%',alignSelf:"center"}}>
                    <Image style={{ height:150, alignSelf: "center",resizeMode:'center' }}
                    source={require('../../assets/images/1.png')}
                    />

                    <Text style={{fontFamily: "FredokaOne-Regular",textAlign:'center',fontSize:12,lineHeight:18,paddingTop:10,color:'#b67edc' }}>"Feed me colours, feed me seasonal,{'\n'} feed me rainbow!"</Text>
                    
                </View> 
                  
                <View style={{padding:20,marginTop:0}}>
                <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',padding:20,fontSize:22}}>Sign In</Text>
                    <TextInput placeholder="Email"
                     onChangeText={(email) => this.setState({email})}
                       style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
               />
      <TextInput placeholder="Password"
      onChangeText ={(password) => this.setState({password})}
      secureTextEntry={true}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />
  
 

                <TouchableOpacity
                style={{ alignSelf:'center',marginTop: 0, width: 100, height: 50, borderRadius: 50, justifyContent: 'center' }}
              
                onPress={() => this._onLogin()}
               >
                <Image style={{ resizeMode:'center',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/Button.png')}
                    />
              </TouchableOpacity>

              <TouchableOpacity
                 onPress={() => this.props.navigation.navigate('RegisterScreen')}
              style={{ marginTop: 0, height: 50, borderRadius: 50, justifyContent: 'center' }}>
                       
              <Text style={{  fontSize: 14, marginTop: 30,textAlign:'center' }}>Not A Member? SIGN UP HERE</Text>
              
              </TouchableOpacity> 

                <TouchableOpacity
                 onPress={() => this.props.navigation.navigate('ForgetPassword')}
              style={{ marginTop: 0, height: 30, borderRadius: 50, justifyContent: 'center' }}>
                <Text style={{  fontSize: 14, marginTop: 10,textAlign:'center' }}>Forgot Password</Text>
               
                </TouchableOpacity>                 
             
              </View>
              
              </KeyboardAwareScrollView>
                {/* </ImageBackground> */}
              
            </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (user) => {
  return {
    getuser: user
     
  }
}



export default connect( mapStateToProps,{LoginUser}, null)(LogInScreen);


const styles = StyleSheet.create({

container:{ 
  flex:1,
    
    
}

})