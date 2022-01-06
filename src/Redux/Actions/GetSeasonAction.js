export const GET_SEASON = 'GET_SEASON';
export const GET_USER = 'GET_USER';
import AsyncStorage from '@react-native-community/async-storage';
import { apiscreen } from '../../Api/apiscreen';

//const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const API_URL = apiscreen.base_url + apiscreen.GetSeason;

const profile = apiscreen.base_url + apiscreen.GetProfile;

const getApiKey = async () => {
  return await  await AsyncStorage.getItem('login');
};


export const getseason = (navigation) => {
    
    console.log('seasonsssssssssssss');
    return async (dispatch, getState) => {
      const login = await getApiKey();

       console.log('//////',login);
       if (login !== null) {
       let data = JSON.parse(login);
       authtoken = "Bearer "+ data.access_token
       console.log("******",authtoken);

      await fetch(API_URL,{

            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': authtoken
               // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWFyZDI0LmNvbVwvYmFja2VuZFwvYXBpXC9sb2dpbiIsImlhdCI6MTY0MDAwNTg5NCwiZXhwIjoxNjQwMDA5NDk0LCJuYmYiOjE2NDAwMDU4OTQsImp0aSI6InBMaHYzTnFOcEQwSktGTnoiLCJzdWIiOjMzLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.NcucBPPUT0Z61FlloO4EAryVyFyYU96ELZXGfpWKMws'
                
            }      

        }).then(response => response.json())
        .then((responseJson) => {
          
            console.log(responseJson,'dfssssssssssssssss?????????????????')

            if(responseJson.status == "Token is Expired")
            {
              AsyncStorage.removeItem('login');
              navigation.navigate('Auth1');
            }
            else{
              return dispatch({
                type: GET_SEASON,
                payload:responseJson.data.seasons
      
              
              });

            }
    


      });
    }
  
  }

 
  };


  export const USerProfile = (navigation) => {
    
    console.log('usersssssssssssssssssssssss');
    return async (dispatch, getState) => {
      const login = await getApiKey();

       console.log('//////',login);
       if (login !== null) {
       let data = JSON.parse(login);
       authtoken = "Bearer "+ data.access_token
       console.log("******",authtoken);

      await fetch(profile,{

            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': authtoken
            
                
            }      

        }).then(response => response.json())
        .then((responseJson) => {
          
            console.log(responseJson.status,'userssssssssssssss?????????????????')

        if(responseJson.status == "Token is Expired")
        {
          AsyncStorage.removeItem('login');
         navigation.navigate('Auth1');
        }
        else{
          return dispatch({
            type: GET_USER,
            payload:responseJson.data.user
  
          
          });
        }
      


      });
    }
   
  }
  };


