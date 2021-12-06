import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,Image,Button,ImageBackground, Alert
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { connect } from 'react-redux'
import {  ScrollView, TouchableOpacity,FlatList } from "react-native";
import ShoppingCartIcon from './ShoppingCartIcon';



const products = products;


class Basket extends Component {


  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: "Cart",
      headerTitleStyle: {
        color: "#31A45A"
      },
      headerStyle: {
        backgroundColor: "#fff"
      },
    
     
    };
  };

  constructor(props){
    super(props);
    this.state={
      //quantity : 1,
      //products,
      lastRefresh: Date(Date.now()).toString(),
    }

   

    handleRemoveProduct = (item) => {
      console.log(item);
      this.props.removeItem(item);
    }

    
    
    }

   componentDidMount(){

    this.setState({ lastRefresh: Date(Date.now()).toString() })
   }
   

  renderProducts = (products,remove) => {

    console.log(products)
    
    return products && products.map((item, index) => {
        return (
            <View key={index} style={{ padding: 0 }}>

    
  <View
    style={{
      height: wp("15%"),
      width: wp("100%"),
      backgroundColor: "white",
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 14,
    
      borderBottomWidth:1,
      borderColor:'#e5e5e5',
     
    }}
  >
    
   
    <View
      style={{
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      {/* imageInfo */}
      <View
        style={{
          flex: 3,
          justifyContent: "space-around"
        }}
      >
     
      <Text>   {item.name}</Text>
     
      
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
     
         
        </View>
         <TouchableOpacity style={{backgroundColor:'',position:'absolute',right:0,top:0, width: wp("20%"),}} key={item.id}  onPress={() => handleRemoveProduct(item)} >
         <Image source={require('../../assets/images/del.png')} style={{width:25,height:25}}/>
          </TouchableOpacity> 
      </View>
    
     
    </View>
    
  </View>

 
    </View>
          
        )
    })
}
  

    getrecipe = (items) => {
      this.setState({
   
        loading: true,
    
    })

     this.props.navigation.navigate("Nodata",{
        itemid: items

     })
    }



    render() {
      const products = this.props.cartItems;
      let id =[];
      let newval;
      products && products.map((item, index) => {
        id +=item.id+",";
        newval = id.replace(/,\s*$/, "");
        
        })
    
     

     //   console.log(this.props.cartItems)
     navigation = this.props.navigate;
        return (
          <ImageBackground style={{ flex: 1, width:'100%',bottom:0,height:'100%',top:0,position:'absolute'  }} source={require('../../assets/images/07.png')} >

            <View style={styles.container}>
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
                       
                    {this.props.cartItems.length > 0 ?
                      <View 
                      style={{
                          flex:1
                      }}
                      >
                          <ScrollView> 
                   {this.renderProducts(this.props.cartItems)} 
                   {/* <Products
                        onPress={this.props.removeItem}
                        products={this.props.cartItems} />  */}
                        </ScrollView>
               
             
                    <View
                      style={{
                        backgroundColor:'',
                       paddingTop: wp("10%"),
                  
                      }}
                    >
                     
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
                          onPress={() => this.getrecipe(newval)}
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
                        View Recipes
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* <View style={{padding:10,backgroundColor:'#63CBA7'}}>
                    <Text style={{textAlign:'center',fontSize:12,color:'#fff'}}>COPYRIGHT EASTSONS' ALL RIGHTS RESERVED</Text>
                      </View> */}

                    </View>


                   
                    : 
                    <View style={{flex:1,alignItems:'center', justifyContent: 'center',}}>

                        <Text style={{fontSize:18}}>No ingredients in your Basket</Text>
                    </View> 
                }    
                    
                  </View>
</ImageBackground>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state,
       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Basket);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
});


