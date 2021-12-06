import React, { Component } from 'react';
import { View, Image, ImageBackground, Text,Dimensions,ActivityIndicator ,SafeAreaView, TouchableOpacity, Linking,StyleSheet,FlatList } from "react-native";
import ShoppingCartIcon from './ShoppingCartIcon'
import { connect } from 'react-redux'
import { apiscreen } from '../Api/apiscreen';
import AsyncStorage from "@react-native-community/async-storage";
import RenderHtml from 'react-native-render-html';

import Modal from 'react-native-modal';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";


 class Nodata extends Component {

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
        Recipe_Img:''
       
      
        }
        
        
      }

 

      componentDidMount = async () => {

        
      
        const { navigation } = this.props;  
       
        const seasonid = this.props.route.params.seasonid; 
        const itemid = this.props.route.params.itemid; 


      console.log("cccc",itemid);
        const login = await AsyncStorage.getItem('login');

        //console.log("dashboard", login);
  
        if (login !== null) { 
            let data = JSON.parse(login);
            this.access_token = "Bearer "+ data.access_token
            console.log(this.access_token,"aaaaa",itemid);
           
     
        const url = apiscreen.base_url + apiscreen.Getrecipe;
        console.log("url:"+url);
        console.log(itemid);
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
              

                product_id:itemid
           
              
            })
      
  
      }).then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch',responseJson.data.recipes)
                console.log("sas",itemid)
                setTimeout(() => {
                    this.setState({
                        isloading: false,
                       dataSource:responseJson.data.recipes
                    })
                }, 2000)
        
                // this.setState({
                //     isloading: false,
                
                // })
            }).catch(error => console.log(error))
        
          }
  
      }

      EmptyListMessage = () =>{
         
        return <View style={{flex:1,justifyContent:'center'}}>
           
                 <Text style={{textAlign:'center'}}>No Data Found...</Text>
          </View>
      }


      OPen_Popup = async (Recipe_ID) => {
        console.log('addd',Recipe_ID);

        this.setState({
            isPrivate: true
        })

        
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
                })
            }, 2000)
    
        })
        .catch(error => console.log(error))
    
      }



      }
    
    
      modelfalse = () => {
        
        this.setState({ isPrivate: false })
    
    
        }

    render(){
      const colors = ['#FFA89E', '#FED583', '#FFF184', '#C2E39C', '#A9E7FC','#C6A7FE','#fff'];
      const { navigation } = this.props;  
        const selectedSlice = this.props.route.params.selectedSlice; 
       // let width = Dimensions.get('screen').width/2 - 8
     
       const seasonname = this.props.route.params.seasonname;
       const Mid = this.props.route.params.Mid;
       const cid = this.props.route.params.cid;
       const colorid = this.props.route.params.colorid;
       const cname = this.props.route.params.cname;
       const Mname = this.props.route.params.Mname;



      

        return(

            <ImageBackground style={{ flex: 1, width:'100%',bottom:0,height:'100%',top:0,position:'absolute'  }} source={require('../../assets/images/07.png')} >
              
                {(this.state.isloading) &&
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
    } 
    <SafeAreaView>
                <View style={{flexDirection:'row',width:'100%',}}>
                  <View style={{width:'50%'}}>
                    <Text>{Mid}{cid}{colorid}</Text>
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
                                
                                <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:50,marginTop:10,paddingTop:5,paddingBottom:5}}>
                                    <Text style={{fontFamily: "FredokaOne-Regular",fontSize:14,textTransform:'uppercase'}}>Here is your Recipes</Text>
                                
                                </View>

                      </ImageBackground>
                          
              </View>

                {/* <View style={{marginTop:20}}> 
                    <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:14,textAlign:'center'}}>Add  {JSON.stringify(selectedSlice)} {cname} for {Mname}</Text>
                 </View>*/}

                  <View style={{margin:5,marginTop:30}}>

                                
                  <FlatList
                        
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index}
                        horizontal={false}
                        
                        ListEmptyComponent={this.EmptyListMessage}
                        renderItem={({ item, index }) => 
                        (
                          <View>
                            <TouchableOpacity  style={{width:'80%',backgroundColor:'#fff',alignSelf:'center',borderRadius:0,borderBottomColor:'grey',flexDirection:'row',borderBottomWidth:1,padding:0, height:50, margin: 3,marginTop:10}}
                         onPress={()=> this.props.navigation.navigate('RecipeDetail',{
                           recipe_id:item.id

                         })}
                            
                            >
                                 
                                 <Image style={{ resizeMode:'contain',width:'20%',height:'80%'}}
                                    source={{ uri: item.image }}
                                      />
                                     
                                      <Text style={{paddingLeft:20,paddingTop:5,width:'90%'}}>{item.name}</Text>
                            </TouchableOpacity> 
                            
                            </View>
                          )}
                    />


                  </View>


                         
{this.state.isPrivate == true && (

<Modal isVisible={this.state.isVisible}>

    <View style={{ backgroundColor: '#fff', height: hp('90%'),paddingBottom:10 }}>
        <View style={styles.head1}>
            <View style={{width:wp('10%')}}>
                <TouchableOpacity
                    onPress={() => this.modelfalse()}
                    style={styles.closemodalStyle}>
                     <Image style={{ height:50,resizeMode:'contain',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/back.png')}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:14, width:wp('80%'),textAlign:"center", color: '#141821' }}>Recipe Detail</Text>
            </View>

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
               <Text style={{fontFamily: "FredokaOne-Regular",fontSize:14,}}>{item.name}</Text>
               {/* <Text style={{fontSize:12,paddingLeft:10,}}>{item.description}</Text> */}
               <RenderHtml
     
     source={{html: `${item.description}`}}
    />
             
         
           </TouchableOpacity>
         )}
       />    
    
        
       
           
      
        </View>

      
      
                   
                 
                      </View>
                  </Modal>

                  )}


              </SafeAreaView>
            </ImageBackground>
          
        )
    }
}

const mapStateToProps = (state) => {
  return {
      cartItems: state,
     
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product  }),
      removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodata);

const styles = StyleSheet.create({

container:{ 
  flex:1,
    
}

})