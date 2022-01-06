import { USER_LOGIN,SAVE_TOKEN } from './types';
import {apiscreen} from '../../Api/apiscreen'
import AsyncStorage from "@react-native-community/async-storage";
import { Alert, ActivityIndicator } from "react-native";

const API_URL =  apiscreen.base_url + apiscreen.login;


export const LoginUser = (email,password,navigation) => {
console.log('insidelogin>>>',email,password);
    return async (dispatch, getState) => {


       
        await fetch(API_URL,{

              method:'POST',
              headers:{
                  'Content-Type':'application/json',
                 // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWFyZDI0LmNvbVwvYmFja2VuZFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzOTA0ODIzMCwiZXhwIjoxNjM5MDUxODMwLCJuYmYiOjE2MzkwNDgyMzAsImp0aSI6IkZMSlQ1WDRwOHVLOTdBbTciLCJzdWIiOjMzLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.2X3RuoXoVfYfphbLpL_e7hotZGRQppiPfs_XYkh_hh4'
                  
              },  
              
              body: JSON.stringify(
                {
              
                  email :email,
                  password:password,
                  
                })
          }).then(response => response.json())
          .then((responseJson) => {

            if(responseJson.status == '1'){
              console.log("Innside userAction ",responseJson.data);
                      
             AsyncStorage.setItem("login",JSON.stringify(responseJson.data));
              dispatch({

              type: SAVE_TOKEN,
              token: responseJson.data,

            });  

         
           //this.props.navigation.goBack(null);
            navigation.navigate('AuthCheck');

            // return dispatch({

            //   type: USER_LOGIN,
            //   payload: responseJson,

            // }); 

          }
                            else{

                                Alert.alert('Invalid Credentials');
                             }


        });
      };



}




