import AsyncStorage from '@react-native-community/async-storage';

const API_URL =  'https://aard24.com/backend/api/get_season_list';

const getApiKey = async () => {
    return await AsyncStorage.getItem('login');
  };


  export const Backend = {
  async  Getseason() {
    const token = await getApiKey();
        let data = JSON.parse(token);
        console.log('>>>>>>>>>>>>>>>>>>>>>>',data);
        this.access_token = "Bearer "+ data.access_token

        console.log('from backend',this.access_token);

        await fetch(API_URL,{

            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': this.access_token
                
            }      

        }) .then(function(response) {
            return response.data;
          })
          .catch(error => {
            console.error(error);
            // handleRequestError(error);
            return 'error';
          });
      


    //   return axios
    //     .get('/api/v1/salaries')
    //     .then(function(response) {
    //       return response.data;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       // handleRequestError(error);
    //       return 'error';
    //     });
    },
};  