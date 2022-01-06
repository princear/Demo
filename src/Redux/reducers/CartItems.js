// import { GET_SEASON } from "../Actions/GetSeasonAction";


const initialstate ={
        cart : [],
      //  months:[]
}

const CartItems =(state = [], action)=>{

   
    switch(action.type) {
        
            case 'ADD_TO_CART':
                console.log('add');
    
            return [ ...state, action.payload]
                              
            case 'REMOVE_FROM_CART':
                return state.filter(CartItems=>CartItems.id !== action.payload.id)

             case 'CLEAR_CART':

                 console.log('CLEAR_REDUCER');
                 return (state=[]);
                  

                //  case GET_SEASON:
                //     console.log('aaaaaaaaaaaaaaaaaaaa');
        
                // return{...state, months:action.payload }      
                

               
    }

    return state
}

export default CartItems;