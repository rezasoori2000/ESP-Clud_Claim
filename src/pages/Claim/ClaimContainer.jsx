import React, { Fragment } from 'react';
import axios from 'axios';
import Login from './Login';
import WorkTypes from './WorkTypes';
import config from '../../config';

class CalimContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedinWorkers: [],
            workersList: [],
            mainWorkersList: [],
            workTypes:[],
            mainWorkTypes:[],
            claimingOId: 0,
            page: 0
        };
        const pages = [<Login items={this.state.workersList} searchNames={this.searchNames} handleLogin={this.handleLogin} />, <WorkTypes />];
    }


    componentWillMount() {
        this.getListOfWorkersFromApi();
    }
    componentDidMount(){
        this.getWorkTypesFromApi();
    }
    getWorkTypesFromApi = async () => {
        var response = {};
        try {
            var data = await axios.get(`${config.apiUrl}/Claim/GetWorkTypes`);
            response = JSON.parse(data.data);
            this.setState({
                ...this.state,
                workTypes: response,
                mainWorkTypes:response
            });
        }
        catch (err) {
            alert(`Error in calling ESP API (Get work types)- ${err}`);
        }
    }
    getListOfWorkersFromApi = async () => {
        var response = {};
        try {
            var data = await axios.get(`${config.apiUrl}/Workers/GetListOfWorkers`);
            response = JSON.parse(data.data);
            this.setState({
                ...this.state,
                workersList: response,
                mainWorkersList: response,
            });
        }
        catch (err) {
            alert(`Error in calling ESP (Get Workers List) API- ${err}`);
        }
    }

    handleLogin = (id) => {
        const workersList = this.state.workersList;
        const worker = workersList.filter(x => x.OId === id)[0];
        if (worker.LoggedIn.Hours > 0) {
            this.claimUser(worker.OId);
        } else {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            worker.LoggedIn = { Hours: today.getHours(), Minutes: today.getMinutes(), Seconds: today.getSeconds() };
            var inx = workersList.findIndex(x => x.OId === id);
            if (inx !== -1) {
                workersList[inx] = worker;
            }
            this.setState({
                ...this.state,
                workersList
            });
        }
    }
    claimUser = (OId) => {
        console.log(OId);
        this.setState({
            ...this.state,
            claimingOId:OId,
            page: 1
        });
    }

    searchNames = (event) => {

        var txt = event.target.value;
        var workersList = event.target.value.length > 0 ?
            this.state.mainWorkersList.filter(t => t.Fullname.toLowerCase().includes(txt.toLowerCase())) :
            this.state.mainWorkersList
            ;
        this.setState({
            ...this.state,
            workersList

        });
    }

    searchWorkTypes = (event) => {
        var txt = event.target.value;
        var workTypes = event.target.value.length > 0 ?
            this.state.mainWorkTypes.filter(t => t.Fullname.toLowerCase().includes(txt.toLowerCase())) :
            this.state.mainWorkTypes
            ;
        this.setState({
            ...this.state,
            workTypes
        });
    }
    render() {
        const renderConditionaly = () => {
            if (this.state.workersList && this.state.page == 0) {
                return <Login items={this.state.workersList} searchNames={this.searchNames} handleLogin={this.handleLogin} />
            } else if (this.state.page == 1) {
                return <WorkTypes claimingOId={this.state.claimingOId} searchWorkTypes={this.searchWorkTypes}  workTypes={this.state.workTypes}/>
            }

        }
        return (
            <Fragment>
                {renderConditionaly()}
            </Fragment>
        )
    }
}
export default CalimContainer;