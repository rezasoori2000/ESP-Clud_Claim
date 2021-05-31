
import axios from 'axios';
export const GET_ADMIN_SETTINGS='GET_ADMIN_SETTINGS';


const getAdminSettings=()=>async(dispatch,getState)=>{
   var response={};
    if (Object.entries(getState().adminSettings).length===0 || getState().adminSettingsChanged){
        const res=await axios.get(`http://localhost:51804/api/adminSettings`);
        response=JSON.parse(res.data);
    }
        else
        response=getState().adminSettings;

    dispatch({
        type:GET_ADMIN_SETTINGS,
        payload:response 
    });
};
  
export default getAdminSettings; 
