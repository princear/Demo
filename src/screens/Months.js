import React, { Component } from 'react';
import { View, Image, ImageBackground, Text,BackHandler, TouchableOpacity,FlatList, Linking,StyleSheet,ActivityIndicator } from "react-native";
import { apiscreen } from '../Api/apiscreen';
import AsyncStorage from "@react-native-community/async-storage";
import ShoppingCartIcon from './ShoppingCartIcon';
import PTRView from 'react-native-pull-to-refresh';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";


export default class Months extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading:false,
            dataSource:[]
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        
      }



      componentDidMount = async () => {


        this.setState({

            isloading: true,
        })

        //const { navigation } = this.props;  
       
        const seasonid = this.props.route.params.seasonid; 
        const login = await AsyncStorage.getItem('login');

        console.log("dashboard>>>>>>>>>>>>>>", seasonid);
  
        if (login !== null) {
            let data = JSON.parse(login);
            this.access_token = "Bearer "+ data.access_token
            console.log(this.access_token,seasonid);
     
        const url = apiscreen.base_url + apiscreen.GetMonths;
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
              

             season_id :seasonid,
           
              
            })
      
  
      }).then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch',responseJson.data.months)
                setTimeout(() => {
                    this.setState({
                        isloading: false,
                       dataSource:responseJson.data.months
                    })
                }, 2000)
        
               
            })
            .catch(error => console.log(error))
        
          }
  


      }

      UNSAFE_componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    UNSAFE_componentWillMount() {
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



    _refresh = async() => {
      this.setState({isloading: true})
      const { navigation } = this.props;  
       
     const seasonid = this.props.route.params.seasonid; 
     const login = await AsyncStorage.getItem('login');

     if (login !== null) {
      console.log("apppp",login)
        let data = JSON.parse(login);
        this.access_token = "Bearer "+ data.access_token
        console.log("******",this.access_token);

    

      return new Promise((resolve) => {
        setTimeout(()=>{resolve()}, 2000)

       
        const url = apiscreen.base_url + apiscreen.GetMonths;
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
              

             season_id :seasonid,
           
              
            })
      
  
      }).then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch',responseJson.data.months)
                setTimeout(() => {
                    this.setState({
                        isloading: false,
                       dataSource:responseJson.data.months
                    })
                }, 2000)
            }).catch(error => console.log(error))

      });
    }
    }


    render(){
        const { navigation } = this.props;  
        const seasonname = this.props.route.params.seasonname;

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
                style={{ marginTop: 0, width: 50, height: 50,marginLeft:10 }}
                onPress={() => this.goBack()}
               >
                <Image style={{ height:50,resizeMode:'contain',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/back.png')}
                    />
              </TouchableOpacity>
                
                <View style={{height:60,marginTop:0}}>
                <ImageBackground style={{height:65,paddingBottom:10,resizeMode:'cover',justifyContent:'center' }}
                          source={require('../../assets/images/headerBG.png')}
                   
                   >
                    <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:50,marginTop:10,paddingTop:5,paddingBottom:5}}>
                            <Text style={{fontFamily: "FredokaOne-Regular",fontSize:14,textTransform:'uppercase'}}>{seasonname}</Text>
                           

                    </View>
                       </ImageBackground>
                    
                </View>

                <View style={{marginTop:20}}>
                    <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:14,textAlign:'center'}}>select the month</Text>
                 </View>
                 <PTRView onRefresh={this._refresh} >
                 <View style={{marginTop:1}}>

               
                 <FlatList
     
      data={this.state.dataSource}
      keyExtractor={(item, index) => index}
      horizontal={false}
    
      renderItem={({ item, index }) => (
        <TouchableOpacity style={{height:120,backgroundColor:colors[index % colors.length],margin:10,borderRadius:10}}
        onPress={()=> this.props.navigation.navigate('Category',{
            seasonname : seasonname,
            Mid:item.id,
            Mname:item.name,
            onGoBack:()=> this.refresh()
        })}
        >
            <Text style={{fontFamily: "FredokaOne-Regular",fontSize:30,padding:20,zIndex:1}}>{item.name}</Text>
            <Text style={{paddingRight:10,height:80,textTransform:"uppercase",fontFamily: "FredokaOne-Regular",color:'#FCD2AA',fontSize:80,textAlign:'right',alignSelf:'flex-end',position:'absolute',bottom:0,paddingBottom:0}} >{item.name}</Text>
        </TouchableOpacity>
      )}
    />    
   
                
                 </View>
                 </PTRView>
            </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({

container:{ 
  flex:1,
    
    
}

})