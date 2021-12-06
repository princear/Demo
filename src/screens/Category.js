import React, { Component } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity,FlatList, BackHandler,ActivityIndicator,Linking,StyleSheet } from "react-native";
import { apiscreen } from '../Api/apiscreen';
import AsyncStorage from "@react-native-community/async-storage";
import ShoppingCartIcon from './ShoppingCartIcon';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
        isloading:false,
        datasource:[]

        }
    
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        
      }

      componentDidMount = async () => {


        this.setState({

            isloading: true,
        })

       
        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);
  
        if (login !== null) {
            let data = JSON.parse(login);
            this.access_token = "Bearer "+ data.access_token
            console.log(this.access_token);
     
        const url = apiscreen.base_url + apiscreen.Getfood;
        console.log("url:"+url);
        fetch(url ,
          {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': this.access_token
            // <-- Specifying the Content-Type
              
          }),
         
      
  
      }).then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch',responseJson.data.foods)
                setTimeout(() => {
                    this.setState({
                        isloading: false,
                       dataSource:responseJson.data.foods
                    })
                }, 2000)
        
            })
            .catch(error => console.log(error))
        
          }
  

      }


      componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    
      }
    
      handleBackButtonClick() {
    
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
        return true;
    }

      goBack = () => {
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
    }


    refresh() {

     
      this.componentDidMount();
   
    }


    render(){

        const { navigation } = this.props;  
        const seasonname = this.props.route.params.seasonname;
        const Mid = this.props.route.params.Mid;
        const Mname = this.props.route.params.Mname;

        let colors = ['#FEE4BF', '#EEFDC6', '#FEBDBB'];   
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
            
              zIndex: 999,
              borderRadius: 15
            }}
            size="small"
            color="#0000ff"
             />
             </View>


    }

<View style={{flexDirection:'row',width:'100%',}}>
                  <View style={{width:'50%'}}>
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
                
                <TouchableOpacity
                style={{ marginTop: 0, width: 50, height: 50, justifyContent: 'center',marginLeft:10}}
                onPress={() =>this.goBack()}
               >
                <Image style={{ height:50,resizeMode:'contain',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/back.png')}
                    />
              </TouchableOpacity>
                
                <View style={{height:60,marginTop:0}}>
                <ImageBackground style={{height:65,paddingBottom:10,resizeMode:'cover',justifyContent:'center' }}
                          source={require('../../assets/images/headerBG.png')}>
                    <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:50,marginTop:10,paddingTop:5,paddingBottom:5}}>
                            <Text style={{fontFamily: "FredokaOne-Regular",fontSize:14,textTransform:'uppercase'}}>{seasonname}</Text>
                           

                    </View>
                       </ImageBackground>
                    
                </View>

                {/* <View style={{marginTop:20}}>
                    <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:14,textAlign:'center'}}>select the month</Text>
                 </View> */}

                 <View style={{marginTop:20}}>

                 <FlatList
     
     data={this.state.dataSource}
     keyExtractor={(item, index) => index}
     horizontal={false}
   
     renderItem={({ item, index }) => (
       <TouchableOpacity style={{height:120,backgroundColor:colors[index % colors.length],margin:10,borderRadius:10}}
       onPress={()=> {this.props.navigation.navigate('ChooseColor',
       {
        seasonname : seasonname,
        Mid:Mid,
        Mname:Mname,
        cid:item.id,
        cname:item.name,
        onGoBack:() => this.refresh()

       }
       )}}
       >
           <Text style={{fontFamily: "FredokaOne-Regular",fontSize:30,padding:20,zIndex:1}}>{item.name}</Text>
           <Text style={{paddingRight:10,height:80,textTransform:"uppercase",fontFamily: "FredokaOne-Regular",color:'#FCD2AA',fontSize:80,textAlign:'right',alignSelf:'flex-end',position:'absolute',bottom:0,paddingBottom:0}} >{item.name}</Text>
       </TouchableOpacity>
     )}
   />    


                   {/* <TouchableOpacity style={{height:110,backgroundColor:'#F0FFE0',margin:10,borderRadius:10}}
                   onPress={()=> {this.props.navigation.navigate('ChooseColor')}}
                   >
                       <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:40,padding:40}}>fruit</Text>
                       <Text style={{zIndex:-1,paddingRight:0,textTransform:"uppercase",fontFamily: "FredokaOne-Regular",color:'#EBF5DD',fontSize:100,textAlign:'right',alignSelf:'flex-end',position:'absolute',top:0,paddingBottom:0}} >fruit</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={{height:120,backgroundColor:'#E4F6CC',margin:10,borderRadius:10}}>
                       <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:40,padding:40}}>vegetable</Text>
                       <Text style={{zIndex:-1,paddingRight:0,textTransform:"uppercase",fontFamily: "FredokaOne-Regular",color:'#EAF9D7',fontSize:100,textAlign:'right',alignSelf:'flex-end',position:'absolute',top:0,paddingBottom:0}} >vegetable</Text>
                   </TouchableOpacity>

                   <View style={{height:120,backgroundColor:'#D1E3B9',margin:10,borderRadius:10}}>
                       <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:40,padding:40}}>food</Text>
                       <Text style={{zIndex:-1,paddingRight:0,textTransform:"uppercase",fontFamily: "FredokaOne-Regular",color:'#DBEACB',fontSize:100,textAlign:'right',alignSelf:'flex-end',position:'absolute',top:0,paddingBottom:0}} >food</Text>
                   </View>   */}
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