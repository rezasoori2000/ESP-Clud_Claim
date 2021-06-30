import React from 'react';
import axios from 'axios';
import config from '../../config'


class LoginLogic extends React.Component {

    getListOfWorkersFromApi = async () => {
        var response = {};
        try {
            var data = await axios.get(`${config.apiUrl}/Workers/GetListOfWorkers`);
            response = JSON.parse(data.data);
            return response;
        }
        catch (err) {
            alert(`Error in calling ESP (Get Workers List) API- ${err}`);
        }
    }



    searchNames = (event, mainWorkersList) => {

        var txt = event.target.value;
        return event.target.value.length > 0 ?
            mainWorkersList.filter(t => t.Name.toLowerCase().includes(txt.toLowerCase())) :
            mainWorkersList;
    }

    saveLoginInAPI = async (id, comment) => {
        var response = {};
        var value = { 'OId': id, 'Code': comment }
        var data = JSON.stringify(value);
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            response = await axios.post(`${config.apiUrl}Workers/PostLoginWorker`, data, {
                headers: headers
            });
            return response;
        }
        catch (err) {
            alert(`Error in calling ESP (Login) API- ${err}`);
        }
    }

    saveLogoutAPI = async (id, comment) => {
        var response = {};
        var value = { 'OId': id, 'Code': comment }
        var data = JSON.stringify(value);
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            response = await axios.post(`${config.apiUrl}Workers/PostLogoutWorker`, data, {
                headers: headers
            });
            return response;
        }
        catch (err) {
            alert(`Error in calling ESP (Logout) API- ${err}`);
        }
    }

    render() {
        return (<din></din>)
    }
}
//module.exports={_:LoginLogics};
const Loginlogics = new LoginLogic();
export default Loginlogics;