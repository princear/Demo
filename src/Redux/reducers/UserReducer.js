
import { SAVE_TOKEN } from "../Actions/types";

const initialstate ={
       // userdata:[],
        token:null
}

const UserReducer =(state = initialstate, action)=>{

    console.log('userreducersssssssssssss',action.token,action.type,state)


    // switch (action.type) {

    //     case SAVE_TOKEN:
    //         return {...state, token: action.token};


    //     // case USER_LOGIN:
    //     //     {
    //     //         return{
    //     //             ...state,
    //     //              userdata:action.payload   
    //     //         }
    //     //     }
            
    //      //   break;
    
    //     default:
    //         break;
    // }


}

export default UserReducer;