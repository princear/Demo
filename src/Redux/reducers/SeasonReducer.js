import { GET_SEASON } from "../Actions/GetSeasonAction";
import { SAVE_TOKEN } from "../Actions/types";
import { GET_USER } from "../Actions/GetSeasonAction";
import { GET_Token } from "../Actions/types";

const initialstate ={
       
        season:[],
        token:'',
        user:[]
}

const SeasonReducer =(state = initialstate, action)=>{
    console.log('SSSSSSSSSSSSdddddddddddddddddSSSSSSSSSSS',action.payload,action.type,action.token)

    switch(action.type) {

        case GET_Token:
            return {...state, token: action.token};

        case SAVE_TOKEN:
                return {...state, token: action.token};

     
                 case GET_SEASON:
                    console.log('aaaaaaaaaaaaaaaaaaaa');
        

                return{...state, season:action.payload }     
                
                
                case GET_USER:
                    console.log('userrrrrrrrrr');
        

                return{...state, user:action.payload }     
      
             
               
               
    }
     return state;
}

export default SeasonReducer;