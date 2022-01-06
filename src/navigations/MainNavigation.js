import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import home from '../screens/Home';
import Season from '../screens/Season';
import Months from '../screens/Months'
import Category from '../screens/Category'
import ChooseColor from '../screens/ChooseColor'
import ProductList  from "../screens/ProductList";
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from "../screens/RegisterScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/SettingsScreen'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colordemo from "../screens/colordemo";
import AuthCheck from '../screens/AuthCheck'
import ForgetPassword from '../screens/ForgetPassword' 
import ResetPassword from '../screens/ResetPassword';
import { Provider } from 'react-redux';
import store from '../Redux/store'
import Basket from '../screens/Basket';
import ShoppingCartIcon from '../screens/ShoppingCartIcon';
import Nodata from '../screens/Nodata';
import { LogBox } from 'react-native';
import RecipeDetail from '../screens/RecipeDetail';

LogBox.ignoreAllLogs();

enableScreens();

const HomeStack = createStackNavigator();

function SignInScreen1(){
    
    return (
        // <NavigationContainer>
        <HomeStack.Navigator >
            <HomeStack.Screen
        
          name="Season" 
          component={Season}
          options={{
              title: 'Seaons',
              headerStyle: {
                  backgroundColor: '#e85b3d',
              },
              headerTintColor: '#fff',
              headerShown:false,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }}
      /> 

      <HomeStack.Screen
          name="Months"
          component={Months}
          options={{
              title: 'Months',
              headerStyle: {
                  backgroundColor: '#e85b3d',
              },
              headerTintColor: '#fff',
              headerShown:false,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }}
      />


       <HomeStack.Screen
          name="Category"
          component={Category}
          options={{
              title: 'Category',
              headerStyle: {
                  backgroundColor: '#e85b3d',
              },
              headerTintColor: '#fff',
              headerShown:false,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }}
      />    
       <HomeStack.Screen
          name="RecipeDetail"
          component={RecipeDetail}
          options={{
              title: 'RecipeDetail',
              headerStyle: {
                  backgroundColor: '#e85b3d',
              },
              headerTintColor: '#fff',
              headerShown:false,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }}
      />    

      <HomeStack.Screen
              name="ChooseColor"
              component={ChooseColor}
              options={{
                  title: 'ChooseColor',
                  headerShown:false,
                  headerStyle: {
                      backgroundColor: '#e85b3d',
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
              }}
          /> 
         

         <HomeStack.Screen
              name="ProductList"
              component={ProductList}
              options={{
                  title: 'ProductList',
                  headerShown:false,
                  headerStyle: {
                      backgroundColor: '#e85b3d',
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
              }}
          />


<HomeStack.Screen
              name="Nodata"
              component={Nodata}
              options={{
                  title: 'Nodata',
                  headerShown:false,
                  headerStyle: {
                      backgroundColor: '#e85b3d',
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                  fontWeight: 'bold',
                  },
              }}
          />


<HomeStack.Screen
              name="Basket"
              component={Basket}
              options={{
                  title: 'Basket',
                  headerShown:false,
                  headerStyle: {
                      backgroundColor: '#e85b3d',
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
              }}
          />

<HomeStack.Screen
              name="ShoppingCartIcon"
              component={ShoppingCartIcon}
              options={{
                  title: 'ShoppingCartIcon',
                  headerShown:false,
                  headerStyle: {
                      backgroundColor: '#e85b3d',
                  },
                  headerTintColor: '#fff',
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
              }}
          />

        
        

        </HomeStack.Navigator>
    )
}

const Stack = createStackNavigator();



    function SignInScreen() {
        return (
            // <NavigationContainer>
            
            <Stack.Navigator initialRouteName="AuthCheck">
      <Stack.Screen
                    name="home"
                    component={home}
                    options={{
                        
                        title: 'home',
                        headerShown:false,
                        headerStyle: {
                        backgroundColor: '#e85b3d',
                        },

                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="AuthCheck"
                    component={AuthCheck}
                    options={{
                        title: 'AuthCheck',
                        headerShown:false,
                        headerStyle: {
                            backgroundColor: '#e85b3d',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />       

              
                  <Stack.Screen
                    name="LogInScreen"
                    component={LogInScreen}
                    options={{
                        title: 'LogInScreen',
                        headerShown:false,
                        headerStyle: {
                            backgroundColor: '#e85b3d',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                /> 

            <Stack.Screen
                    name="ForgetPassword"
                    component={ForgetPassword}
                    options={{
                        title: 'ForgetPassword',
                        headerShown:false,
                        headerStyle: {
                            backgroundColor: '#e85b3d',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                /> 

<Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{
                        title: 'ResetPassword',
                        headerShown:false,
                        headerStyle: {
                            backgroundColor: '#e85b3d',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                /> 


                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{
                        title: 'RegisterScreen',
                        headerShown:false,
                        headerStyle: {
                            backgroundColor: '#e85b3d',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />  
             
                    
             

            </Stack.Navigator>
        )
    
    
    }



    
    function SignInScreen2() {
        return (
            // <NavigationContainer>
            
            <Stack.Navigator >
      <Stack.Screen
                    name="home"
                    component={home}
                    options={{
                        
                        title: 'home',
                        headerShown:false,
                        headerStyle: {
                        backgroundColor: '#e85b3d',
                        },

                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                    }}
                />

<Stack.Screen
                    name="LogInScreen"
                    component={LogInScreen}
                    options={{
                        title: 'LogInScreen',
                        headerShown:false,
                        headerStyle: {
                            backgroundColor: '#e85b3d',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                /> 

<Stack.Screen
                    name="AuthCheck"
                    component={AuthCheck}
                    options={{
                        title: 'AuthCheck',
                        headerShown:false,
                        headerStyle: {
                            backgroundColor: '#e85b3d',
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />       



</Stack.Navigator>
        )
    
    
    }


    function MyTabBar({ state, descriptors, navigation }) {
        
        return (
            <LinearGradient start={{x: 0, y: 0.25}} end={{x: 1, y: 0.75}}  colors={['#EDD4EA','#E3D6F0' ,'#CAE7F5']}  style={{position:'absolute',bottom:0,left:0,right:0, flexDirection: 'row', height: 60, borderRadius: 50, justifyContent: "center", alignItems: "center", paddingLeft: 15, paddingRight: 15, margin: 10 }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;


                let showlabel = "";
                let iconNm = "";
                if (label == "Dashboard") {
                    showlabel = "Dashboard";
                    iconNm = require('../../assets/images/dash.png');
                }

                if (label == "Settings") {
                    showlabel = "Settings";
                    iconNm = require('../../assets/images/setting.png');
                }

                // if (label == "bell") {
                //     showlabel = "Notification";
                //     iconNm= label;
                // }

                // if (label == "envelope") {
                //     showlabel = "Contact us";
                //     iconNm = label
                // }
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 8, paddingTop: 8 }}
                        key={route.key}
                    >
                         {/* <Icon size={24} name={iconNm} color={isFocused ? '#FFFFFF' : '#d3d3d3'} />  */}
                         <View style={{flexDirection:'row'}}>
                         <Image source={iconNm} style={{resizeMode:'center',width:25,height:25}}/>

                   
                        <Text style={{ alignSelf: 'center', color: isFocused ? '#000' : '#0008', fontSize: 13,fontWeight:'bold' }}>
                            {showlabel}
                        </Text>
                        </View>  
                    </TouchableOpacity>
                );
            })}
        </LinearGradient>
        );
      }

    const Tab = createBottomTabNavigator();
    function TabNavigator() {
        return (
          <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Dashboard" component={SignInScreen1} />
             <Tab.Screen name="Settings" component={SettingsScreen} /> 
          </Tab.Navigator>
        );
      }
    

      export default function MainNavigation() {
        return (
   <Provider store ={store}>
        <NavigationContainer>
            <Stack.Navigator headerMode={false} >
               <Stack.Screen name="Auth" component={SignInScreen} />   
               <Stack.Screen name="Auth1" component={SignInScreen2} /> 
               <Stack.Screen name="Home" component={TabNavigator} 
               
                options={{
                    title: 'Tabs',
                    headerShown:false,
                    headerStyle: {
                        backgroundColor: '#e85b3d',
                    },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
              />
               
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
};





