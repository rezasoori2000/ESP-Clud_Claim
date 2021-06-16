import React from 'react';
import axios from 'axios';
import config from '../../config'

class ClaimLogic extends React.Component {

    getJobItemsFromApi = async (jobId, worktypeId) => {
        var response = {};
        var value = { 'jobId': jobId, 'worktypeId': worktypeId }
        var data = JSON.stringify(value);
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            response = await axios.get(`${config.apiUrl}Claim/GetJobItems`, {params:{jobId,worktypeId}});
            return response;
        }
        catch (err) {
            alert(`Error in calling ESP (Claim / Get Job items) API- ${err}`);
        }
    }

    render() {
        return (<din></din>)
    }
}
//module.exports={_:LoginLogics};
const Loginlogics = new ClaimLogic();
export default Loginlogics;