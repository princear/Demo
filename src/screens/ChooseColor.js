import React, { Component } from 'react';
import {Button, View, Image, ImageBackground,FlatList ,ActivityIndicator,Text,Dimensions,BackHandler, TouchableOpacity, Linking,StyleSheet, Alert } from "react-native";
import Modal from 'react-native-modal';
import { PieChart } from 'react-native-svg-charts'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import { apiscreen } from '../Api/apiscreen';
import ShoppingCartIcon from './ShoppingCartIcon'
import { connect } from 'react-redux'

 class ChooseColor extends Component {

    

  constructor(props){
    super(props);
    this.state = {
        selectedSlice: {
            label: '',
            value: '',
        },

        isPrivate: false,
        isVisible: true,
        labelWidth: 0,
        dataSource:[]
    }
    
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
      state = {
        height: 0,
        width: 0,
    }

    componentDidMount = async () => {

      const cname = this.props.route.params.cname;
      const Mname = this.props.route.params.Mname;
      const MonthId = this.props.route.params.Mid;
      const CatId = this.props.route.params.cid;

      console.log(MonthId,Mname,CatId,cname);

      this.setState({

        isloading: true,
        modelfalse:false
    })

   
    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);

    if (login !== null) {
        let data = JSON.parse(login);
        this.access_token = "Bearer "+ data.access_token
        console.log(this.access_token);
 
    const url = apiscreen.base_url + apiscreen.GetMonthlyList;
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
          

          category_id : CatId,
          month_id : MonthId
       
          
        })
  
  

  }).then(response => response.json())
        .then((responseJson) => {
            console.log('getting data from fetch>>>>>>>>>>>>>>>>>>',responseJson.data.products)
            setTimeout(() => {
                this.setState({
                    isloading: false,
                   dataSource:responseJson.data.products
                })
            }, 2000)
    
        })
        .catch(error => console.log(error))
    
      }

    }
    
    UNSAFE_componentWillMount() {

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



  OPen_Popup() {
    console.log('addd')
    this.setState({
        isPrivate: true,
        isloading:true
    })

    setTimeout(() => {
      this.setState({
       
        isloading:false
    })
    }, 2000);
  }


  modelfalse = () => {
    
    this.setState({ isPrivate: false })


    }
    handleRemoveProduct = (item) => {
      console.log(item);
      this.props.removeItem(item);
    }


    EmptyListMessage = () =>{
         
      return <View style={{flex:1,justifyContent:'center'}}>
         
               <Text style={{textAlign:'center',alignSelf:'center',marginTop:hp('30%')}}>No Data Found...</Text>
        </View>
    }

      
    render(){

      

      const isItemExist = (itemToFindId) => {
        console.log('choosecolor',this.props.cartItems)
       
        return this.props.cartItems.findIndex(item => item.id === itemToFindId) === -1;
      
       }


      const { navigation } = this.props;  
      const seasonname = this.props.route.params.seasonname;

      const Mid = this.props.route.params.Mid;
      const cid = this.props.route.params.cid;
      const cname = this.props.route.params.cname;
      const Mname = this.props.route.params.Mname;
      const {labelWidth, selectedSlice} = this.state;
      const {label, value} = selectedSlice;
      const keys = ['Red', 'Orange', 'Yellow', 'Green', 'Blue','Purple','White'];
      const values = [35, 30, 30, 30, 30,30,30];
      const colors = ['#FFA89E', '#FED583', '#FFF184', '#C2E39C', '#A9E7FC','#C6A7FE','#fff'];
      const data = keys.map((key, index) => {
          return {
              key,
              labelRadius:keys[index],
              value: values[index],
              svg: {fill: colors[index]},
              arc: {outerRadius: label === key ? '95%' : '85%', padAngle: 0},
              
              
              onPress: () => { this.props.navigation.navigate('ProductList',
                {
                  selectedSlice: key,
                  seasonname:seasonname,
                  Mid:Mid,
                  Mname:Mname,
                  cname:cname,
                  cid:cid,
                  colorid:index + 1
                } //{label: key, value: values[index]}}
              ), this.setState({selectedSlice: {label: key, value: values[index]}}); console.log(key, index)}
          }
      })

      const {width, height} = Dimensions.get('window');
        return(

          

            <ImageBackground style={{ flex: 1, width:'100%',bottom:0,top:0,bottom:-40,position:'absolute'  }} source={require('../../assets/images/bgbtmrain.png')} >
           
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
                style={{ marginTop: 10, width: 50, height: 50, justifyContent: 'center',paddingLeft:10 }}
                onPress={() => this.goBack()}
               >
                <Image style={{ height:50,resizeMode:'contain',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/back.png')}
                    />
              </TouchableOpacity>
                  {/* <TouchableOpacity
                        onPress={() => this._logout()}
                      >
                        <Text style={{padding:10}}>Logout</Text>
                      </TouchableOpacity> */}
              </View>
                     <View style={{marginTop: 0,width:'50%',alignItems:'flex-end',paddingRight:10}}>
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
                    <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:14,textAlign:'center'}}>select color</Text>
                 </View>
               

                {/* <Text style={{position:'absolute',top:hp("35%"),right:wp("30%"),zIndex:1}}>Red</Text>
                <Text style={{position:'absolute',top:height * .50,right:width * .15,zIndex:1}}>Orange</Text>
                <Text style={{position:'absolute',top:'63%',right:'20%',zIndex:1}}>Yellow</Text>
                <Text style={{position:'absolute',top:'67%',right:'47%',zIndex:1}}>Green</Text>
                <Text style={{position:'absolute',top:'60%',left:'15%',zIndex:1}}>LightBlue</Text>
                <Text style={{position:'absolute',top:'45%',left:'15%',zIndex:1}}>Purple</Text>
                <Text style={{position:'absolute',top:hp('35%'),left:'30%',zIndex:1}}>Violet</Text> */}
                 <View style={{ justifyContent: 'center',position:'relative'}}>
                 {/* <Text style={{position:'absolute',top:hp("15%"),right:wp("30%"),zIndex:1}}>Red</Text>
                <Text style={{position:'absolute',top:hp("25"),right:wp("15"),zIndex:1}}>Orange</Text>
                <Text style={{position:'absolute',top:hp('40%'),right:wp('20%'),zIndex:1}}>Yellow</Text>
                <Text style={{position:'absolute',top:hp('45%'),right:wp('47%'),zIndex:1}}>Green</Text>
                <Text style={{position:'absolute',top:hp('40%'),left:wp('18%'),zIndex:1}}>LightBlue</Text>
                <Text style={{position:'absolute',top:hp('25%'),left:wp('15%'),zIndex:1}}>Purple</Text>
                <Text style={{position:'absolute',top:hp('12%'),left:wp('32%'),zIndex:1}}>White</Text> */}
              <PieChart
                  style={{ height:hp("60%"),width:wp("100%"),justifyContent:'center', }}
                  outerRadius={ '100%' }
                  innerRadius={ '20%' }
                  data={data}
                 
              />

              <ImageBackground 
               source={require('../../assets/images/spread.png')}
              style={styles.catcircle}
            >

             <TouchableOpacity style={{flex:1,justifyContent:'center',paddingTop:20}}
            onPress={()=> this.OPen_Popup()}
             >
                <Text style={{textAlign:'center',fontFamily: "FredokaOne-Regular",fontSize:26}}>EAT</Text>
                <Text style={{textTransform:'uppercase',textAlign:'center',fontFamily: "FredokaOne-Regular",fontSize:10,paddingTop:10}} >{Mname} {'\n'} {cname}</Text>

              </TouchableOpacity>
              
              </ImageBackground>
              {/* <Text
                  onLayout={({ nativeEvent: { layout: { width }}}) => {
                  this.setState({ labelWidth: width});
              }}
                  style={{
                  position: 'absolute',
                  left: deviceWidth / 2 - labelWidth / 2,
                  textAlign: 'center'
              }}>
                   {`${label} \n ${value}`} 
              </Text> */}
          </View>
       
              {/* <ImageBackground 
               source={require('../../assets/images/spread.png')}
              style={styles.catcircle}
            
              >
             <TouchableOpacity style={{flex:1,justifyContent:'center',paddingTop:20}}
             onPress={()=>{Alert.alert('Press Center')}}
             >
                <Text style={{textAlign:'center',fontFamily: "FredokaOne-Regular",fontSize:26}}>EAT</Text>
                <Text style={{textTransform:'uppercase',textAlign:'center',fontFamily: "FredokaOne-Regular",fontSize:12,paddingTop:10}} >April Fruits</Text>
              </TouchableOpacity>
              </ImageBackground> */}
            
             {/* <View style={styles.circle}>
               
              
               <TouchableOpacity style={styles.list}
               onPress={()=>{Alert.alert('Press Purple')}}
               >
                    <Text style={{color:'#7149BB',fontFamily: "FredokaOne-Regular",fontSize:20,transform:[{rotate:'-90deg'}]}}>Purple</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.list1}
               onPress={()=>{this.props.navigation.navigate('ProductList')}}
               >
                  <Text style={{color:'#CD8986',fontFamily: "FredokaOne-Regular",transform:[{rotate:'-90deg'}],fontSize:20,marginTop:25,marginLeft:0}}>Red</Text>
                </TouchableOpacity>
               
               <TouchableOpacity style={styles.list2}
               onPress={()=>{Alert.alert('Press Orange')}}
               >
               <Text style={{marginRight:0,marginTop:25,color:'#C79C46',fontFamily: "FredokaOne-Regular",fontSize:20,transform:[{rotate:'-90deg'}]}}>Orange</Text>
               </TouchableOpacity> 
               <TouchableOpacity style={styles.list3}
               onPress={()=>{Alert.alert('Press Blue')}}
               >
               <Text style={{color:'#2B4992',fontFamily: "FredokaOne-Regular",fontSize:20,transform:[{rotate:'-90deg'}]}}>Blue</Text>
               </TouchableOpacity>   
               
               
              

             </View>
         */}

         
{this.state.isPrivate == true && (

<Modal isVisible={this.state.isVisible}>


    <View style={{ backgroundColor: '#fff', height: hp('90%'),paddingBottom:10 }}>

{/*       
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
    */}
        <View style={styles.head1}>

        <View style={{flexDirection:'row',width:'100%',}}>
                  <View style={{width:'50%'}}>
                  
                <TouchableOpacity
                style={{marginTop: 30, width: 50, height: 50, justifyContent: 'center',paddingLeft:10 }}
                onPress={() => this.modelfalse()}
               >
                 
                <Image style={{ height:50,resizeMode:'contain',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/back.png')}
                />

              </TouchableOpacity>
              </View>
                     {/* <View style={{marginTop: 30,width:'50%',alignItems:'flex-end',paddingRight:10}}>
                      <ShoppingCartIcon navigation={this.props.navigation}/>
                    
                    </View> */}
             </View>  


            {/* <View style={{width:wp('10%')}}>
                <TouchableOpacity
                    onPress={() => this.modelfalse()}
                    style={styles.closemodalStyle}>
                     <Image style={{ height:50,resizeMode:'contain',alignSelf:'center',width:100 }}
                    source={require('../../assets/images/back.png')}
                    />
                </TouchableOpacity>
            </View> */}
            <View>
                <Text style={{textTransform:'uppercase',fontFamily: "FredokaOne-Regular",fontSize:14, width:wp('80%'),textAlign:"center", color: '#141821' }}>Product list</Text>
            </View>
            {(() => { 

if(this.state.dataSource.length > 0)

{
  return(
<FlatList
     
     data={this.state.dataSource}
     keyExtractor={(item, index) => index}
     horizontal={false}
     //ListEmptyComponent={this.EmptyListMessage}
     
     renderItem={({ item, index }) => (
     
       <TouchableOpacity style={{height:120,backgroundColor:colors[index % colors.length],margin:10,borderRadius:10}}
      //  onPress={()=> this.props.navigation.navigate('Category',{
      //      seasonname : seasonname,
      //      Mid:item.id,
      //      Mname:item.name,
      //      onGoBack:()=> this.refresh()
      //  })}
     
      onPress={() =>this.props.addItemToCart({
                        
        name:item.name,
        id:item.id
      
      })} 
      disabled={isItemExist(item.id) ? false : true }  
     
       >
           <Text style={{fontFamily: "FredokaOne-Regular",fontSize:30,padding:20,zIndex:1}}>{item.name}</Text>
         
           {/* <Text style={{paddingRight:10,height:80,textTransform:"uppercase",fontFamily: "FredokaOne-Regular",color:'#FCD2AA',fontSize:80,textAlign:'right',alignSelf:'flex-end',position:'absolute',bottom:0,paddingBottom:0}} >{item.name}</Text>
       */}
     
     {isItemExist(item.id) ?
     
     <View style={{marginRight:10}}>
     <Text style={{fontSize:18,backgroundColor:'#daf9e9',paddingTop:5,width:40,height:36,alignContent:'center',borderRadius:20,textAlign:'center',justifyContent:'center',alignContent:'flex-end',alignSelf:'flex-end'}}>+</Text>
     </View>      
            :
     
     <TouchableOpacity style={{}} key={item.id}  onPress={() => this.handleRemoveProduct(item)} >
       
         <Image style={{ width:30,height:36,alignContent:'flex-end',alignSelf:'flex-end',marginRight:10 }}
              source={require('../../assets/images/tick.png')}
          />
     
     </TouchableOpacity>
          
          }
       </TouchableOpacity>
     )}
     
     
     
     />   
  )
}

else{

  return (
  
  <View style={{justifyContent:'center'}}>
         
               <Text style={{textAlign:'center',alignSelf:'center',marginTop:hp('30%')}}>No Data Found...</Text>
        </View>
  )}
            })()}
           

 
         
          
          
          


       
      
      
      
        </View>
                 
                      </View>
                  </Modal>

                  )}

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


export default connect(mapStateToProps, mapDispatchToProps)(ChooseColor);

const styles = StyleSheet.create({

container:{ 
  flex:1,
    
    
},
catcircle:{
  position:'absolute',
  borderWidth:1,
  borderColor:'#000',
  backgroundColor:'white',
  width:120,
  height:120,
  top:'33%',
 
  borderRadius:120/2,
  alignSelf:'center',
  justifyContent:'center',
  overflow:'hidden',
  paddingTop:0,
  margin:10,
  zIndex:1,
  
  bottom:0
},
circle:{
  position:'relative',
  //borderWidth:1,
  //borderColor:'red',
  width:380,
  height:380,
  borderRadius:380/2,
  alignSelf:'center',
  overflow:'hidden',
  padding:0,
  margin:20,
  top:10
  //backgroundColor:'green'


},
list:{
position:'absolute',
top:0,
right:0,
width:'50%',
height:'50%',
overflow:'hidden',
backgroundColor:'#C8A7FE',
transform:[{translateX:-190},{rotate:'90deg'}],
},
list1:{
  position:'absolute',
  top:0,
  right:0,
  width:'50%',
  height:'50%',
  overflow:'hidden',
  backgroundColor:'#FEBDB7',
  transform:[{translateX:0},{rotate:'90deg'}]
  },

  list2:{
    position:'absolute',
    top:0,
    right:0,
    width:'50%',
    height:'50%',
    overflow:'hidden',
    backgroundColor:'#FFD686',
    transform:[{translateY:190},{rotate:'90deg'}]
    },
  
    list3:{
      position:'absolute',
      bottom:0,
      left:0,
      width:'50%',
      height:'50%',
      overflow:'hidden',
      backgroundColor:'#97AFEF',
      transform:[{translateY:0},{rotate:'90deg'}]
      },
       
// data:{
// position:'absolute',
// left:'-100%',
// width:'200%',
// height:'200%',
// textAlign:'center',
// transform: [{skewY: '60deg'},{rotate: '15deg'}], 
// padding:20 
// }

})