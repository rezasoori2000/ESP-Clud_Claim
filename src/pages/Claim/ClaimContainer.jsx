import React, { Fragment } from 'react';
import axios from 'axios';
import Login from './Login';
import WorkTypes from './WorkTypes';
import JobItems from './JobItems';
import Summary from './Summary';
import Jobs from './Jobs';
import config from '../../config';
import Loginlogics from '../../components/logics/Login';
import ClaimLogic from '../../components/logics/ClaimLogic';
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
            claimingUser:'',
            page: 0,
            loading: false,
            worktypeId: 0,
            jobId:0,
            jobItems: [],
            mainJobItems: [],
            changedClaimingItems:[]
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
        this.props.changeStep(1);
    }
    componentDidMount() {

    }

    /* #region  Login Methods */

    handleLogin = (id) => {
        const workersList = this.state.workersList;
        const worker = workersList.filter(x => x.OId === id)[0];
        if (worker.IsLoggedIn) {
            const page = 1;

            this.goToJobsPage(page, id);
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
                    claimingUser:worker.Name,
                    workersList
                });
            }).catch((err) => {
                alert(err);
            });

        }
        this.props.changeStep(2);
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
            this.props.changeStep(1);
            
        }).catch((err) => {
            alert(err);
        });
    }

    searchNames = (event) => {
        this.setState({
            ...this.state,
            workersList: Loginlogics.searchNames(event, this.state.mainWorkersList)
        });
    }
    /* #endregion */

    /* #region  WorkType */

    searchWorkTypes = (event) => {
        var txt = event.target.value;
        var workTypes = event.target.value.length > 0 ?
            this.state.mainWorkTypes.filter(t => t.Name.toLowerCase().includes(txt.toLowerCase())) :
            this.state.mainWorkTypes;
        this.setState({
            ...this.state,
            workTypes
        });
    }

    handleWorkTypeClick = async (worktypeId) => {
        this.setState({
            ...this.state,
            loading: true
        });
        const response = ClaimLogic.getJobItemsFromApi(this.state.jobId, worktypeId);
        response.then((r) => {
            var data = JSON.parse(r.data);
            this.setState({
                ...this.state,
                jobItems: data,
                mainJobItems: data,
                page: 3,
                loading: false,
                worktypeId: worktypeId,
            });
        });

        this.props.changeStep(4);
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

    /*#region Job*/
    goToJobsPage = (page, claimingOId) => {

        this.setState({
            ...this.state,
            loading: true,
        });

        const response = ClaimLogic.getJobsOfWorkerFromApi(claimingOId);
        response.then((r) => {
            const values = JSON.parse(r.data);
            this.setState({
                ...this.state,
                jobs: values.Item1,
                mainJobs: values.Item1,
                workTypes:values.Item2,
                mainWorkTypes:values.Item2,
                loading: false,
                claimingOId,
                page
            });

        });
    }
    handleBack = (pageId) => {
        this.setState({
            page: pageId
        });
        this.props.changeStep(pageId+1);
    }
    handleJobClick = (jobId) => {
        this.setState({
            ...this.state,
            jobId,
            page: 2
        });
        this.props.changeStep(3);
    }
    /* #endregion */

    /*#region jobItem*/

    handleSaveClaim=(changedClaimingItems)=>{
        this.setState({
            ...this.state,
            changedClaimingItems,
            page: 4
        });
        this.props.changeStep(5);
    }
    /* #endregion */
    render() {
        const renderConditionaly = () => {

            if (this.state.loading) {
                return (<Loading />)
            }
            switch (this.state.page) {
                case 0: {
                    return <Login items={this.state.workersList}
                        searchNames={this.searchNames}
                        handleLogin={this.handleLogin} />
                }
                case 1: {
                    return <Jobs claimingOId={this.state.claimingOId}
                        searchJobs={this.searchJobs}
                        jobs={this.state.jobs}
                        handleJobClick={this.handleJobClick}
                        handleLogOut={this.handleLogOut} />
                }
                case 2: {
                    return <WorkTypes claimingOId={this.state.claimingOId}
                        searchWorkTypes={this.searchWorkTypes}
                        workTypes={this.state.workTypes}
                        handleBack={this.handleBack}
                        handleWorkTypeClick={this.handleWorkTypeClick} />
                }

                case 3: {
                    return <JobItems claimingOId={this.state.claimingOId}
                        searchJobs={this.searchJobs}
                        items={this.state.mainJobItems}
                        handleBack={this.handleBack}
                        handleSave={this.handleSaveClaim}
                    />
                }
                case 4: {
                    return <Summary claimingOId={this.state.claimingOId}
                        claimingName={this.state.mainWorkersList.find(x=>x.OId==this.state.claimingOId).Name}
                        worktypeName={this.state.mainWorkTypes.find(x=>x.OId==this.state.worktypeId).Name}
                        jobName={this.state.mainJobs.find(x=>x.OId==this.state.jobId).Title}
                        claimingItems={this.state.changedClaimingItems}
                        handleBack={this.handleBack}
                        handleSave={this.handleSaveClaim}
                    />
                }
                default: return (<div></div>)
            }
        }
        return (
            <Fragment>
                {
                    renderConditionaly()
                }
            </Fragment>
        )
    }
}
export default CalimContainer;