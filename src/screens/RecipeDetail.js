import React, { Component } from 'react';
import { View, Image, ImageBackground,PermissionsAndroid, Text,Dimensions,ActivityIndicator ,ScrollView,SafeAreaView, TouchableOpacity, Linking,StyleSheet,FlatList } from "react-native";
import ShoppingCartIcon from './ShoppingCartIcon'
import { connect } from 'react-redux'
import { apiscreen } from '../Api/apiscreen';
import AsyncStorage from "@react-native-community/async-storage";
import RenderHtml from 'react-native-render-html';

import Modal from 'react-native-modal';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import RNFetchBlob from 'rn-fetch-blob';


 class RecipeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
          accessToken : "",
        dataSource:[],
        RecipeDetail:[],
        isloading:true,
        isPrivate: false,
        isVisible: true,
        Recipe_Name:'',
        Recipe_Desc:'',
        Recipe_Img:'',
        Recipe_pdf:''
       
      
        }
        
        
      }

      historyDownload() {
        //Function to check the platform
        //If iOS the start downloading
        //If Android then ask for runtime permission
        if (Platform.OS === 'ios') {
          this.downloadHistory();
        } else {
          try {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title:'storage title',
                message:'storage_permission',
              },
            ).then(granted => {
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //Once user grant the permission start downloading
                console.log('Storage Permission Granted.');
                this.downloadHistory();
              } else {
                //If permission denied then show alert 'Storage Permission 
               
               Alert.alert('storage_permission');
              }
            });
          } catch (err) {
            //To handle permission related issue
            console.log('error', err);
          }
        }
      }

      async downloadHistory() {
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let date = new Date();
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            //Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/'+this.state.Recipe_Name  +
              Math.floor(date.getTime() + date.getSeconds() / 2)+'.pdf',
            description: 'Risk Report Download',
          },
        };
        config(options)
          .fetch('GET', this.state.Recipe_pdf)
          .then((res) => {
            //Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            alert('Pdf Downloaded Successfully.');
          });
      }

      componentDidMount = async () => {

        
      
        this.setState({

            isloading: true,
        })
       
        const Recipe_ID = this.props.route.params.recipe_id;
      


      console.log("cccc",Recipe_ID);
       
  
        
    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);

    if (login !== null) {
        let data = JSON.parse(login);
        this.access_token = "Bearer "+ data.access_token
        console.log(this.access_token);
 
    const url = apiscreen.base_url + apiscreen.GetrecipeList;
    console.log("url:"+url);
    fetch(url ,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': this.access_token
        // <-- Specifying the Content-Type
          
      }),
      body: JSON.stringify(
        {
    
          recipe_id : Recipe_ID,
        
        })
  
  

  }).then(response => response.json())
        .then((responseJson) => {
            console.log('getting data from fetch',responseJson.items)
            setTimeout(() => {
                this.setState({
                    isloading: false,
                    RecipeDetail:responseJson.items,
                    Recipe_Name:responseJson.name,
                    Recipe_Desc:responseJson.description,
                    Recipe_Img:responseJson.image,
                    Recipe_pdf:responseJson.recipe_pdf,
                })
            }, 2000)
    
        })
        .catch(error => console.log(error))
    
      }



      }

  

    render(){
    
        if(this.state.isloading == true)
        return(
          <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>
          <ActivityIndicator 
          
          color="#00ff00"
                 size="large"
                 style={{
                   backgroundColor: "rgba(1,195,181,.8)",
                   height: 80,
                   width: 80,
                 position:'absolute',
                 textAlign:'center',
                   zIndex: 999,
                   borderRadius: 15
                 }}
                 size="small"
                 color="#0000ff"
                  />
                  </View>

        )

      

        return(

            <ImageBackground style={{ flex: 1, width:'100%',bottom:0,height:'100%',top:0,position:'absolute'  }} source={require('../../assets/images/07.png')} >
              
                {/* {(this.state.isloading) &&
             <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>
     <ActivityIndicator 
     
     color="#00ff00"
            size="large"
            style={{
              backgroundColor: "rgba(1,195,181,.8)",
              height: 80,
              width: 80,
            position:'absolute',
            textAlign:'center',
              zIndex: 999,
              borderRadius: 15
            }}
            size="small"
            color="#0000ff"
             />
             </View>
    }  */}
    <SafeAreaView>
                <View style={{flexDirection:'row',width:'100%',}}>
                  <View style={{width:'50%'}}>
                  
                <TouchableOpacity
                style={{marginTop: 30, width: 50, height: 50, justifyContent: 'center',paddingLeft:10 }}
                onPress={() => this.props.navigation.goBack()}
               >
                <Image style={{ height:50,resizeMode:'contain',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/back.png')}
                    />
              </TouchableOpacity>
              </View>
                     <View style={{marginTop: 30,width:'50%',alignItems:'flex-end',paddingRight:10}}>
                      <ShoppingCartIcon navigation={this.props.navigation}/>
                    
                    </View>
             </View>  
                <View style={{height:60,marginTop:0}}>
                
                    <ImageBackground style={{height:65,paddingBottom:10,resizeMode:'cover',justifyContent:'center' }}
                          source={require('../../assets/images/headerBG.png')}>
                                
                                <View style={{justifyContent:'center',flex:1,alignItems:'flex-start',paddingLeft:50,marginTop:10,paddingTop:5,paddingBottom:5}}>
                                    <Text style={{fontFamily: "FredokaOne-Regular",fontSize:14,textTransform:'uppercase'}}>Here is your Recipe Detail</Text>
                                
                                </View>

                      </ImageBackground>
                          
              </View>

               

                  <View style={{margin:5,marginTop:30}}>
                
            <View style={{height:400}}>
<ScrollView>
      <View style={{padding:20}}>
      <Image style={{ height:100,alignSelf:'center',width:100 }}
                    source={{uri:this.state.Recipe_Img}}
                    />
            <Text style={{textAlign:'center',marginTop:10,fontFamily: "FredokaOne-Regular",fontSize:18,color: '#141821'}}>{this.state.Recipe_Name}</Text>
            <RenderHtml
     
     source={{html: `${this.state.Recipe_Desc}`}}
    />
           
           <Text style={{marginTop:10,fontFamily: "FredokaOne-Regular",fontSize:16,color: '#141821'}}>Ingredients used for this Recipe</Text>

      </View>
     
       <FlatList
     
         data={this.state.RecipeDetail}
         keyExtractor={(item, index) => index}
         horizontal={false}
        
         renderItem={({ item, index }) => (
           <TouchableOpacity style={{margin:10,borderRadius:10,padding:10}}
         
           >
               <Image style={{ height:100,alignSelf:'center',width:100 }}
                    source={{uri:item.image}}
                    /> 
               <Text style={{fontFamily: "FredokaOne-Regular",fontSize:14,textAlign:'center'}}>{item.name}</Text>
               
               <RenderHtml
     
     source={{html: `${item.description}`}}
    />
             
         
           </TouchableOpacity>
         )}
       />    

            {this.state.Recipe_pdf == '' ? 
            
            <View/>
            :
            
            
           
                  <View
                        style={{
                         
                          paddingHorizontal: 20,
                      //    justifyContent: "flex-start",
                          paddingBottom: 15,
                          marginBottom:80,
                          
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => this.historyDownload()}
                          style={{
                            flexDirection: "row",
                            backgroundColor: "#B83B3A",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 2,
                            shadowOffset: { width: 1, height: 2 },
                            shadowColor: "#000",
                            shadowOpacity: 0.4,
                            elevation: 4,
                            paddingVertical: 10
                          }}
                        >
                          <View
                            style={{
                              marginRight: 15
                            }}
                          >
                           
                          </View>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "500",
                              color: "white"
                            }}
                          >
                        Download Recipe
                          </Text>
                        </TouchableOpacity>
                      </View>
                       }
        
       </ScrollView>
      
                                
           </View> 
               
                  </View>




              </SafeAreaView>
            </ImageBackground>
          
        )
    }
}



export default RecipeDetail;

const styles = StyleSheet.create({

container:{ 
  flex:1,
    
}

})