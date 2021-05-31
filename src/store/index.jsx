
import thunk from 'redux-thunk';
import {createStore, compose, applyMiddleware} from 'redux';
import {GET_ADMIN_SETTINGS} from './actions/adminSettings';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer=(state,action)=>{
    if (action.type==GET_ADMIN_SETTINGS)
    return {
        ...state,
           adminSettings:action.payload
       };
       
    
    return state;
}
const initialState={
adminSettings:{},
adminSettingsChanged:false
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(reducer,
    initialState,
    composeWithDevTools(  applyMiddleware(thunk)))
    ;


export default store;