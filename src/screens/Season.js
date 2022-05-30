import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, Linking,StyleSheet, Alert,FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { apiscreen } from '../Api/apiscreen';
import ShoppingCartIcon from './ShoppingCartIcon';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import PTRView from 'react-native-pull-to-refresh';
 import { getseason,USerProfile } from '../Redux/Actions/GetSeasonAction';
 import { connect } from 'react-redux';

 class Season extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
        loading:false,
        accessToken : "",
        dataSource:[],
        profile:[]
        }
    
        
      }


     


      componentDidMount = async () => {
         console.log('???????????????????????????????',this.props.Allseason.SeasonReducer.season);
         console.log('???????????????????????????????',this.props.token,this.props.username);
         this.setState({
   
                loading: true,
            
            })

        // this.props.GetSeasons.season;

        setTimeout(() => {

          this.setState({
   
            loading: false,
        
        })
        this.props.getseason(this.props.navigation);
        this.props.USerProfile(this.props.navigation);
        }, 100);
   
    //     this.setState({
   
    //       loading: true,
      
    //   })
      
    //   //const login = await AsyncStorage.getItem('login');
    //   const login = this.props.token;
     
    //   if (login !== null) {
    //     console.log("aaaaaaaaaa",login)
    //       let data = JSON.parse(login);
    //       this.access_token = "Bearer "+ data.access_token
    //       console.log("******",this.access_token);
    //       this.setState({  Loading:false })
    //   const url = apiscreen.base_url + apiscreen.GetSeason;
    //   console.log("url:"+url);
    //   fetch(url ,
    //     {
    //       method: 'POST',
    //       headers: new Headers({
    //         'Content-Type': 'application/json',
    //         'Authorization': this.access_token
            
    //       // <-- Specifying the Content-Type
            
    //     }),
    //    // body: JSON.stringify({ product_id: this.state.dataSource.shopify_product_id }) 
    

    // }).then(response => response.json())
    //       .then((responseJson) => {
    //         console.log('getting data from fetch',responseJson.data.seasons)
    //           setTimeout(() => {
    //               this.setState({
    //                   loading: false,
    //                  dataSource: responseJson.data.seasons
    //               })
    //           }, 2000)
      
    //       }).catch(function (error) {
    //         console.log("-------- error ------- "+error);
    //         alert("session Expired Please logout");
    //         this.props.navigation.navigate('Auth');
    //      });
      

    //      const url1 = apiscreen.base_url + apiscreen.GetProfile;
    //      console.log("url:"+url1);
    //      fetch(url1 ,
    //        {
    //          method: 'POST',
    //          headers: new Headers({
    //            'Content-Type': 'application/json',
    //            'Authorization': this.access_token
               
    //          // <-- Specifying the Content-Type
               
    //        }),
    //       // body: JSON.stringify({ product_id: this.state.dataSource.shopify_product_id }) 
       
   
    //    }).then(response => response.json())
    //          .then((responseJson) => {
    //            console.log('getting data from fetch',responseJson.data.user.name)
    //              setTimeout(() => {
    //                  this.setState({
    //                      loading: false,
    //                     profile: responseJson.data.user.name
    //                  })
    //              }, 2000)
         
    //          }).catch(function (error) {
    //            console.log("-------- error ------- "+error);
    //            alert("session Expired Please logout");
    //            this.props.navigation.navigate('Auth');
    //         });



    //     }

      

      }

      refresh() {

    //   this.props.CartItems;
    //  this.props.getmonth();
      this.componentDidMount();
   
    }


    _refresh = async() => {
      this.setState({loading: true})
     const login = await AsyncStorage.getItem('login');

     if (login !== null) {
      console.log("apppp",login)
        let data = JSON.parse(login);
        this.access_token = "Bearer "+ data.access_token
        console.log("******",this.access_token);

    

      return new Promise((resolve) => {
        setTimeout(()=>{resolve()}, 2000)

        this.setState({  Loading:false })
        const url = apiscreen.base_url + apiscreen.GetSeason;
        console.log("url:"+url);
        fetch(url ,
          {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': this.access_token
              
            // <-- Specifying the Content-Type
              
          }),
         // body: JSON.stringify({ product_id: this.state.dataSource.shopify_product_id }) 
      
  
      }).then(response => response.json())
            .then((responseJson) => {
              console.log('getting data from fetch',responseJson.data.seasons)
                setTimeout(() => {
                    this.setState({
                        loading: false,
                       dataSource: responseJson.data.seasons
                    })
                }, 2000)
        
            }).catch(function (error) {
              console.log("-------- error ------- "+error);
              alert("session Expired Please Login");
              this.props.navigation.navigate('LoginScreen');
           });
           
    

      });
    }
    }


      _logout = () => {

        AsyncStorage.removeItem('login');
        this.props.navigation.replace('Auth1');
      }

    render(){
     
      

      let colors = ['#ECFBC4', '#FFF9C9', '#F7DFD3', '#B8F5F6'];

        return(
            <ImageBackground style={{ flex: 1, width:'100%',height:'100%'  }} source={require('../../assets/images/screen2.jpg')} >
                     {(this.state.loading) &&
             <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>
     <ActivityIndicator 
     
     color="#00ff00"
           
            style={{
              backgroundColor: "rgba(1,195,181,.8)",
              height: 80,
              width: 80,
            
              zIndex: 999,
              borderRadius: 15
            }}
            size="small"
         //   color="#0000ff"
             />
             </View>
    }
   

            <View style={{flexDirection:'row',width:'100%',}}>
                <View style={{width:'50%'}}>
                  {/* <Text style={{padding:10}}>Welcome: {this.state.profile}</Text> */}
                     <Text style={{padding:10}}>Welcome: {this.props.username}........</Text>
                  <TouchableOpacity
                        onPress={() => this._logout()}
                      >
                        <Text style={{padding:10}}>Logout</Text>

                      </TouchableOpacity>
                  </View>
                     <View style={{marginTop: 0,width:'50%',alignItems:'flex-end',paddingRight:10}}>
                        <ShoppingCartIcon navigation={this.props.navigation}/>
                    
                    </View>
             </View> 
           
             <PTRView onRefresh={this._refresh} > 
                    <View style={{flexDirection:'row',marginTop:0,padding:10}}>

                     
                    <FlatList
                        columnWrapperStyle={{justifyContent:'space-between', }}
                        data={this.props.Allseason.SeasonReducer.season}
                        keyExtractor={(item, index) => index}
                        horizontal={false}
                        numColumns={2}
                        renderItem={({ item, index }) => (
            <TouchableOpacity style={{width:'48%', height: hp("30%"),backgroundColor:colors[index % colors.length],borderRadius:20,paddingBottom:20,marginBottom:10}}
                          onPress={() => this.props.navigation.navigate('Months',
                          {
                            seasonname : item.name,
                            seasonid:item.id,
                            onGoBack: () => this.refresh() 
                          }
                          )}
         >
    
      <Image style={{ resizeMode:'contain',alignSelf:'center',width:'80%',height:'80%'}}
   source={{ uri: item.image }}
    />
     <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',fontSize:18,width:100,alignSelf:'center'}}>{item.name}</Text>    
    
        </TouchableOpacity>
      )}
    />


                        {/* <TouchableOpacity style={{width:'48%',height:250,backgroundColor:'#ECFBC4',borderRadius:20,paddingBottom:20}}
                        onPress={() => this.props.navigation.navigate('Months')}
                        >
                    
                      <Image style={{ resizeMode:'contain',alignSelf:'center',width:'80%',height:'80%'}}
                    source={require('../../assets/images/02.png')}
                    />
                     <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',fontSize:18,width:100,alignSelf:'center'}}>Spring Season</Text>    
                    
                        </TouchableOpacity>

                        <TouchableOpacity  style={{marginLeft:15,width:'48%',height:250,backgroundColor:'#FFF9C9',borderRadius:20,paddingBottom:20}}>
                        <Image style={{ resizeMode:'contain',alignSelf:'center',width:'80%',height:'80%'}}
                    source={require('../../assets/images/01.png')}
                    />
                     <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',fontSize:18,width:100,alignSelf:'center'}}>Summer Season</Text>    
                     </TouchableOpacity>   

                    </View>




                    <View style={{flexDirection:'row',marginTop:0,padding:10}}>

                    <TouchableOpacity  style={{width:'48%',height:250,backgroundColor:'#F7DFD3',borderRadius:20,paddingBottom:20}}>
                        <Image style={{ resizeMode:'contain',alignSelf:'center',width:'80%',height:'80%'}}
                    source={require('../../assets/images/03.png')}
                    />
                     <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',fontSize:18,width:100,alignSelf:'center'}}>Autumn Season</Text>    
                        </TouchableOpacity >

                        <TouchableOpacity  style={{marginLeft:15,width:'48%',height:250,backgroundColor:'#B8F5F6',borderRadius:20,paddingBottom:20}}>
                        <Image style={{ resizeMode:'contain',alignSelf:'center',width:'80%',height:'80%'}}
                    source={require('../../assets/images/04.png')}
                    />
                     <Text style={{fontFamily: "FredokaOne-Regular" ,textAlign:'center',fontSize:18,width:100,alignSelf:'center'}}>Winter Season</Text>    
                     </TouchableOpacity >    */}

                    </View>
                    </PTRView>  
            
           </ImageBackground> 
        )
    }
}


const mapStateToProps = (getseason) => {
  return {

    Allseason: getseason,
    token:getseason.SeasonReducer.token,
    username:getseason.SeasonReducer.user.name
     
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//      getmonth: () => dispatch(getmonth()),    
//   }
// }

export default connect( mapStateToProps,{getseason,USerProfile}, null)(Season);


const styles = StyleSheet.create({

container:{ 
  flex:1,
    
    
}

})