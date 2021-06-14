import React, { Fragment } from 'react';
import axios from 'axios';
import Login from './Login';
import WorkTypes from './WorkTypes';
import Jobs from './Jobs';
import config from '../../config';
import Loginlogics from '../../components/logics/Login';
import Loading from '../loading.js';

class CalimContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            workersList: [],
            mainWorkersList: [],
            workTypes: [],
            mainWorkTypes: [],
            jobs: [],
            mainJobs: [],
            claimingOId: 0,
            page: 0,
            loading: false
        };

    }


    componentWillMount() {
        this.setState({
            ...this.state,
            loading: true
        });

        Loginlogics.getListOfWorkersFromApi().then((response) =>
            this.setState({
                ...this.state,
                workersList: response,
                mainWorkersList: response,
                loading: false
            })
        );
        this.getWorkTypesFromApi();
    }
    componentDidMount() {

    }



    /* #region  Login Methods */


    handleLogin = (id) => {
        const workersList = this.state.workersList;
        const worker = workersList.filter(x => x.OId === id)[0];
        if (worker.IsLoggedIn) {
            const result = Loginlogics.claimUser(worker.OId, this.state.mainWorkTypes, this.state.workersList);
            this.setState({
                ...this.state,
                page: result.page,
                claimingOId: result.claimingOId,
                workTypes: result.workTypes
            });
        } else {
            const comment = 'NOT impelemented yet';
            var response = Loginlogics.saveLoginInAPI(id, comment);
            response.then((r) => {
                if (!JSON.parse(r.data).Successful) {
                    alert(r.Message);
                    return;
                }
                worker.IsLoggedIn = true;
                var inx = workersList.findIndex(x => x.OId === id);
                if (inx !== -1) {
                    workersList[inx] = worker;
                }
                this.setState({
                    ...this.state,
                    claimingOId: id,
                    workersList
                });
            }).catch((err) => {
                alert(err);
            });

        }
    }

    handleLogOut = () => {
        const id = this.state.claimingOId;
        const workersList = this.state.workersList;
        const worker = workersList.filter(x => x.OId === id)[0];
        const comment = 'NOT impelemented yet';
        var response = Loginlogics.saveLogoutAPI(id, comment);
        response.then((r) => {
            if (!JSON.parse(r.data).Successful) {
                alert(r.Message);
                return;
            }
            worker.IsLoggedIn = false;
            var inx = workersList.findIndex(x => x.OId === id);
            if (inx !== -1) {
                workersList[inx] = worker;
            }
            this.setState({
                ...this.state,
                page: 0,
                workersList
            });
        }).catch((err) => {
            alert(err);
        });

    }

    searchNames(event) {
        this.setState({
            ...this.state,
            workersList: Loginlogics.searchName(event, this.state.mainWorkersList)
        });
    }
    /* #endregion */

    /* #region  WorkType */

    getWorkTypesFromApi = async () => {
        var response = {};
        this.setState({
            ...this.state,
            loading: true
        });
        await axios.get(`${config.apiUrl}/Claim/GetWorkTypes`).then((data) => {
            response = JSON.parse(data.data);
            this.setState({
                ...this.state,
                workTypes: response,
                mainWorkTypes: response,
                loading: false
            });
        }).catch((err) => {

            alert(`Error in calling ESP API (Get work types)- ${err}`);
        });

    }
    searchWorkTypes = (event) => {
        var txt = event.target.value;
        var workTypes = event.target.value.length > 0 ?
            this.state.mainWorkTypes.filter(t => t.Name.toLowerCase().includes(txt.toLowerCase())) :
            this.state.mainWorkTypes
            ;
        this.setState({
            ...this.state,
            workTypes
        });
    }

    handleWorkTypeClick = async (id) => {
        var response = {};

        try {
            var data = await axios.get(`${config.apiUrl}/Claim/GetJobs?id=${id}`);
            response = JSON.parse(data.data);
            this.setState({
                ...this.state,
                jobs: response,
                mainJobs: response,
                page: 2
            });
        }
        catch (err) {
            alert(`Error in calling ESP API (Get Jobs)- ${err}`);
        }
    }

    handleJobClick = () => {

    }

    searchJobs = (event) => {
        var txt = event.target.value;
        var jobs = event.target.value.length > 0 ?
            this.state.mainJobs.filter(t =>
                t.Title.toLowerCase().includes(txt.toLowerCase()) ||
                t.Code.includes(txt))
            :
            this.state.mainJobs;
        this.setState({
            ...this.state,
            jobs,
        });
    }
    /* #endregion */

    render() {
        const renderConditionaly = () => {
            
            if (this.state.loading) {
                return (<Loading />)
            }
            switch (this.state.page) {
                case 0: {
                    return <Login items={this.state.workersList} searchNames={this.searchNames} handleLogin={this.handleLogin} />
                    break;
                }
                case 1: {
                    return <WorkTypes claimingOId={this.state.claimingOId}
                        searchWorkTypes={this.searchWorkTypes}
                        workTypes={this.state.workTypes}
                        handleLogOut={this.handleLogOut}
                        handleWorkTypeClick={this.handleWorkTypeClick} />
                    break;
                }
                case 2: {
                    return <Jobs claimingOId={this.state.claimingOId}
                        searchJobs={this.searchJobs}
                        jobs={this.state.jobs}
                        handleJobClick={this.handleJobClick} />
                    break;
                }
                default: return (<div></div>)
            }
        }
        return (
            !this.state.loading &&
            <Fragment>
                {
                    renderConditionaly()
                }
            </Fragment>
        )
    }
}
export default CalimContainer;