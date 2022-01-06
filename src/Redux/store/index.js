


import ReduxThunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux'
import CartItems from '../reducers/CartItems'
// import SeasonReducer from '../reducers/SeasonReducer';
import UserReducer from '../reducers/UserReducer';
import reducers from '../reducers';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;

//export default store = createStore(CartItems);