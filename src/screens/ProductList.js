import React, { Component } from 'react';
import { View, Image, ImageBackground, Text,Dimensions,ActivityIndicator ,SafeAreaView, TouchableOpacity, Linking,StyleSheet,FlatList } from "react-native";
import ShoppingCartIcon from './ShoppingCartIcon'
import { connect } from 'react-redux'
import { apiscreen } from '../Api/apiscreen';
import AsyncStorage from "@react-native-community/async-storage";

import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
 class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          accessToken : "",
        dataSource:[],
       
      
        }
        
        
      }

 

      componentDidMount = async () => {

        
        this.setState({
          loading:true,
     
      }
    
      )
      
      const Mid = this.props.route.params.Mid;
      const cid = this.props.route.params.cid;
      const colorid = this.props.route.params.colorid;
      const login = await AsyncStorage.getItem('login');
      const { navigation } = this.props;  
      const selectedSlice = this.props.route.params.selectedSlice; 
     

      if (login !== null) {
          let data = JSON.parse(login);
          this.access_token = "Bearer "+ data.access_token
          console.log("******",this.access_token);
   
      const url = apiscreen.base_url + apiscreen.GetItems;
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
            
            category_id:cid,
            color_id:colorid,
            month_id:Mid
            
          })
    
    

    }).then(response => response.json())
          .then((responseJson) => {
            console.log("itemssss", login,Mid,cid,colorid);
            console.log('Product List',responseJson.data.products)


            console.log('Message',responseJson.data.message)

            // if(responseJson.data.message == "no product found")
            // {

            //     this.props.navigation.navigate('Nodata',{
            //       selectedSlice:selectedSlice
            //     })

            // }
            // else{
            //   this.setState({
            //     loading:false,
           
            //    dataSource: responseJson.data.products
            // }

              setTimeout(() => {
              
                this.setState({
                    loading:false,
                    dataSource: responseJson.data.products
                }
 
                )

  
                     
            }, 2000)
         
      
          }).catch(function (error) {
            console.log("-------- error ------- "+error);
            alert("Token Expired Please Login");
         });
      
        }

      }


     handleRemoveProduct = (item) => {
        console.log(item);
        this.props.removeItem(item);

      }


      EmptyListMessage = () =>{
         
        return <View style={{flex:1,justifyContent:'center'}}>
           
                 <Text style={{textAlign:'center'}}>No Data Found...</Text>
          </View>
      }

    render(){

      let colors = ['#ECFBC4', '#FFF9C9', '#F7DFD3', '#B8F5F6'];
      
      const isItemExist = (itemToFindId) => {
    
        return this.props.cartItems.findIndex(item => item.id === itemToFindId) === -1;
      
       }
  

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
                     
                   
                    <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:50,marginTop:10,paddingTop:5,paddingBottom:5}}>
                            <Text style={{fontFamily: "FredokaOne-Regular",fontSize:14,textTransform:'uppercase'}}>{seasonname}</Text>
                          

                    </View>
                       </ImageBackground>
                    
                </View>

                <View style={{marginTop:20}}>
                    <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:14,textAlign:'center'}}>Add  {JSON.stringify(selectedSlice)} {cname} for {Mname}</Text>
                 </View>

                 <View style={{margin:5,marginTop:30}}>

               
                 <FlatList
                        columnWrapperStyle={{justifyContent:'space-between', }}
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => index}
                        horizontal={false}
                        numColumns={2}
                        ListEmptyComponent={this.EmptyListMessage}
                        renderItem={({ item, index }) => 
                        
                        
                        (

                  <TouchableOpacity  style={{borderRadius:20,borderColor:'grey',flexDirection:'row',borderWidth:1, width:'48%',padding:0, height:38, margin: 3,marginTop:10}}
                          onPress={() =>this.props.addItemToCart({
                            
                            name:item.name,
                            id:item.id
                          
                          })} 
                          disabled={isItemExist(item.id) ? false : true }  

                   >
    
     
    <Text style={{paddingLeft:20,paddingTop:5,width:'78%'}}>{item.name}</Text>
          
  
         {isItemExist(item.id) ?
         
        
    <Text style={{fontSize:18,backgroundColor:'#daf9e9',paddingTop:5,width:40,height:36,alignContent:'center',borderRadius:20,textAlign:'center',justifyContent:'center',alignContent:'flex-end',alignSelf:'flex-end'}}>+</Text>
           :
    
    <TouchableOpacity style={{}} key={item.id}  onPress={() => this.handleRemoveProduct(item)} >
      
        <Image style={{ width:30,height:36,alignContent:'flex-end',alignSelf:'flex-end' }}
             source={require('../../assets/images/tick.png')}
         />

    </TouchableOpacity>
         
         }

    </TouchableOpacity>
      )

}

    
    />
                 </View>
                 </SafeAreaView>
            </ImageBackground>
          
        )
    }
}

const mapStateToProps = (state) => {
  return {
      cartItems: state.CartItems,
     
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product  }),
      removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

const styles = StyleSheet.create({

container:{ 
  flex:1,
    
}

})