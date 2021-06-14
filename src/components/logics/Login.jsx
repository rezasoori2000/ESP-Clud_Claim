import React from 'react';
import axios from 'axios';
import config from '../../config'

class Login extends React.Component {

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

    claimUser = (OId, mainWorkTypes, WorkersList) => {
        const worker = WorkersList.filter(x => x.OId === OId)[0];
        const workerWorkTypIds = worker.Skills.map((s) => { return s.WorkTypeId; });
        const workerWorkTypes = mainWorkTypes.filter(x => workerWorkTypIds.some((w) => { return w == x.OId }));
        return {
            claimingOId: OId,
            workTypes: workerWorkTypes,
            page: 1
        };
    }

    searchNames = (event, mainWorkersList) => {

        var txt = event.target.value;
        return event.target.value.length > 0 ?
            mainWorkersList.filter(t => t.Fullname.toLowerCase().includes(txt.toLowerCase())) :
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
const Loginlogics = new Login();
export default Loginlogics;