import axios from 'axios';
import config from '../../config/index'

export const GET_ADMIN_SETTINGS='GET_ADMIN_SETTINGS';
export const UPDATE_ADMIN_SETTINGS='UPDATE_ADMIN_SETTINGS';


const get_API_AdminSettings=()=>async(dispatch,getState)=>{
    
    var response={};
    if (Object.entries(getState().adminSettings).length===0 || getState().adminSettingsChanged){
        const res=await axios.get(`${config.apiUrl}adminSettings`);
        response=JSON.parse(res.data);
    }
        else
        response=getState().adminSettings;

        dispatch({
        type:GET_ADMIN_SETTINGS,
        payload:response 
    });
};

export const update_AdminSettings_State=(event)=>(dispatch,getState)=>{

    const payload=getState().adminSettings;
    
    //console.log(event.target.name+'  '+event.target.value);
  //  console.log('state:' +state);
  payload[event.target.name]=event.target.value;
  dispatch({
    type:UPDATE_ADMIN_SETTINGS,
    payload:payload
});
}

export default get_API_AdminSettings; 
