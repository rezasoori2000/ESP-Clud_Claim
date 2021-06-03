import { GET_ADMIN_SETTINGS, UPDATE_ADMIN_SETTINGS } from '../actions/adminSettingsAction';

const adminSettingsReducer = (state, action) => {

    switch (action.type) {
        case GET_ADMIN_SETTINGS:
            return {
                ...state,
                adminSettings: action.payload
            };
        case UPDATE_ADMIN_SETTINGS:
            return {
                ...state,
                adminSettings: action.payload
            };

        default:
            return state;
    }
}
export default adminSettingsReducer;