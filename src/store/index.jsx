
import thunk from 'redux-thunk';
import { createStore,  applyMiddleware } from 'redux';
import { GET_ADMIN_SETTINGS, UPDATE_ADMIN_SETTINGS } from './actions/adminSettingsAction';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = (state, action) => {
    if (action.type === GET_ADMIN_SETTINGS)
        return {
            ...state,
            adminSettings: action.payload
        };
    if (action.type === UPDATE_ADMIN_SETTINGS) {
        
        state.adminSettings['ServerAddress']="kirrrrrrrrrrr";
        return {
            ...state,
            adminSettings: action.payload
        }
    }

    return state;
}
const initialState = {
    adminSettings: {},
    adminSettingsChanged: false
};

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)))
    ;


export default store;
