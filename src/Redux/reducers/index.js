import {combineReducers} from 'redux';
import CartItems from '../reducers/CartItems'
import SeasonReducer from '../reducers/SeasonReducer';
import UserReducer from '../reducers/UserReducer'

export default combineReducers({
    CartItems,
    SeasonReducer,
   // UserReducer
  
});
