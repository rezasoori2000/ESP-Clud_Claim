import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
//import { reducer as formReducer } from 'redux-form'

import adminSettingsReducer from './adminSettingsReducer'


const reducer = combineReducers({

  adminSettings: adminSettingsReducer,

})

export default reducer