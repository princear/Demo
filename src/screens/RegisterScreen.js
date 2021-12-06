import React, { Component } from 'react';
import { View, Image, ImageBackground, Text,TextInput ,TouchableOpacity,ActivityIndicator,Linking,StyleSheet, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import CountryPicker from 'react-native-country-picker-modal'
import { apiscreen } from '../Api/apiscreen';

import {Picker} from '@react-native-community/picker'




const countryPickerCustomStyles = {};
export default class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading:false,
          username:'',
          email:'',
          phone:'',
          password:'',
          confirmpass:'',
          enterCode: false,
          dataSource:[],
          selectedValue:'',
          country: {
            cca2: 'IN',
            callingCode: '91',
            name:'India'
          },
        }
    
        
      }


componentDidMount = () => {

  this.setState({
   
    loading: true,

})

const url = apiscreen.base_url + apiscreen.GetCountries;
console.log("url:"+url);
fetch(url)
    .then(response => response.json())
    .then((responseJson) => {
        console.log('getting data from fetch', responseJson.data.countries)
        setTimeout(() => {
            this.setState({
                loading: false,
                dataSource:responseJson.data.countries
            })
        }, 2000)

    })
    .catch(error => console.log(error))

}


_onsubmit = () => {

  const username = this.state.username;
  const email = this.state.email;
  const phone = this.state.phone;
  const cca2 = this.state.country.cca2;
  const cname = this.state.selectedValue;
  const callingCode = JSON.parse(this.state.country.callingCode);
  const password = this.state.password;
  const confirmpass = this.state.confirmpass;

  console.log(username,email,phone, callingCode,cca2,password,confirmpass,cname);

  const url = apiscreen.base_url + apiscreen.register;
  console.log("url:"+url);

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
                  name : username,
 
                  email :email,
 
                   phone: phone,
                   dialCode:cca2,
                  iso2: callingCode,
                  password:password,
                  password_confirmation:confirmpass,
                  country_id:cname,
                  state_id:0,
                  city_id:0

                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
               if(responseJsonFromServer.status == 0){
                 console.log(responseJsonFromServer.data.error[0])
                  Alert.alert(JSON.stringify(responseJsonFromServer.data.error+""));
               }
               else{
                  Alert.alert('User Register Successfully');
                  this.props.navigation.navigate('LogInScreen');
               }
 
               this.setState({ ActivityIndicator_Loading : false });
 
            }).catch((error) =>
            {
                console.error(error);
 
               
            });
        

}


      _changeCountry = country => {
        this.setState({country});
        console.log(country);
       
      };
    
      _renderCountryPicker = () => {
        if (this.state.enterCode) {
          //return < View />;
        }
    
        return (
          <CountryPicker
           // ref={'countryPicker'}
            closeable
           
            style={styles.countryPicker}
            onSelect={this._changeCountry}
           styles={countryPickerCustomStyles}
            translation="eng"
            withFlagButton="true"
            countryCode={this.state.country.cca2}
            
            withFilter="true"
            withFlag="true"
            withCountryNameButton="true"
            withAlphaFilter="true"
            withEmoji="true"
           
          />
        );
      };
    
      _renderCallingCode = () => {
        if (this.state.enterCode) {
          return <View />;
        }
    
        return (
          <View style={styles.callingCodeView}>
            <Text style={styles.callingCodeText}>
              + ({this.state.country.callingCode})
            </Text>
          </View>
        );
      };
    



    render(){
    
      let myUsers = this.state.dataSource.map((myValue,myIndex)=>{
        return(
        <Picker.Item label={myValue.name} value={myValue.id} key={myIndex}/>
        )
        });


        return(
 <ImageBackground style={{ flex: 1,resizeMode:'contain' }} source={require('../../assets/images/BG.png')} >
            
            {(this.state.loading) &&
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
                    <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',paddingTop:20,fontSize:22}}>Sign Up</Text>
                <View style={{padding:20,marginTop:20}}>
                    <TextInput placeholder="User Name"
                      onChangeText={(username) => this.setState({username})}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />
      
<TextInput placeholder="Email"
onChangeText={(email) => this.setState({email})}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />
    <View style={{flexDirection:'row', borderColor: 'gray', borderWidth: 1,height:50,marginBottom:20,borderRadius:5}}>

   <View style={{height:50,justifyContent:'center',paddingLeft:5}}>
   {this._renderCountryPicker()}
   </View>
   <View>
    {this._renderCallingCode()}
    </View>
    <View style={{width:'75%'}}>
   <TextInput placeholder="Phone Number"
    keyboardType='numeric'
  
    onChangeText={(phone) => this.setState({phone})}      
    style={{ height: 50, borderColor: 'gray', borderWidth: 0,paddingLeft:10,marginBottom:20,marginLeft:0,fontSize:16,borderRadius:5 }}
     
    />
   </View> 
    </View>  
    <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 4,marginBottom:20 }}>
    <Picker
     selectedValue={this.state.selectedValue}
     onValueChange={(value)=>this.setState({selectedValue:value})} 
    itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
    >
{myUsers}
</Picker>
</View>
    
   
      <TextInput placeholder="Password"
       onChangeText={(password) => this.setState({password})}
       secureTextEntry={true}
      style={{ height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    />
    <TextInput placeholder="Confirm Password"
    secureTextEntry={true}
     onChangeText={(confirmpass) => this.setState({confirmpass})}
      style={{height: 50, borderColor: 'gray', borderWidth: 1,paddingLeft:10,marginBottom:20,fontSize:16,borderRadius:5 }}
     
    /> 
   
  
 

                <TouchableOpacity
                style={{ alignSelf:'center',marginTop: 0, width: 100, height: 50, borderRadius: 50, justifyContent: 'center' }}
               // onPress={() => this.props.navigation.navigate('LogInScreen')}
                onPress={() => this._onsubmit()}
               >
                <Image style={{ resizeMode:'center',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/Button.png')}
                    />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LogInScreen')}
              style={{ marginTop: 0, height: 50, borderRadius: 50, justifyContent: 'center' }}>
                            <Text style={{  fontSize: 14, marginTop: 30,textAlign:'center' }}>Already Member? SIGN IN HERE</Text>
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