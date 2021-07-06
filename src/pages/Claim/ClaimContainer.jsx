import React, { Fragment } from "react";
import Login from "./Login";
import WorkTypes from "./WorkTypes";
import JobItems from "./JobItems";
import Summary from "./Summary";
import Jobs from "./Jobs";
import Loginlogics from "../../components/logics/Login";
import ClaimLogic from "../../components/logics/ClaimLogic";
import Loading from "../loading.js";
import FormDialog from "../../components/controls/FormDialog";

class CalimContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      workersList: [],
      settings: null,
      mainWorkersList: [],
      workTypes: [],
      mainWorkTypes: [],
      jobs: [],
      mainJobs: [],
      adminJobs: [],
      mainAdminJobs: [],
      claimingOId: 0,
      claimingUser: "",
      page: 0,
      loading: false,
      worktypeId: 0,
      jobId: 0,
      adminWorkType: null,
      jobItems: [],
      mainJobItems: [],
      changedClaimingItems: [],
      canClaimWholeJob: false,
      claimingFullJob: false,
      dialogOpen: false,
      dialogHeader: "",
      dialogText: "",
      dialogSave: null,
    };
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      loading: true,
    });

    Loginlogics.getListOfWorkersFromApi().then((response) =>
      this.setState({
        ...this.state,
        workersList: response,
        mainWorkersList: response,
        loading: false,
        settings: this.props.settings,
      })
    );
    this.props.changeStep(1);
  }
  componentDidMount() {}

  /* #region  Login Methods */
  onCommentSave = (text) => {
    this.setState({ dialogOpen: false });
    if (text) this.saveLoginInAPI(this.state.claimingOId, text);
  };
  handleLogin = (sid, isOnLeave) => {
    if (isOnLeave) {
      this.setState({
        ...this.state,

        dialogOpen: true,
        dialogHeader: "Cannot Login",
        dialogText:
          "You are currenly on leave.Please, log in during your working hours",
        dialogSave: this.onCommentSave,
        alert: true,
      });
      return false;
    }
    const id = parseInt(sid);

    const workersList = this.state.workersList;
    const worker = workersList.filter((x) => x.OId === id)[0];

    if (worker.IsLoggedIn) {
      const page = 1;

      this.goToJobsPage(page, id);
    } else {
      let comment = "";

      if (
        Loginlogics.checkWorkerLateLogin(
          worker,
          this.state.settings.TrackLateLogin,
          this.state.settings.LateAllowance
        )
      ) {
        this.setState({
          ...this.state,
          claimingOId: id,
          dialogOpen: true,
          dialogHeader: "Late Login",
          dialogText: "Please, specify the reason to late log in.",
          dialogSave: this.onCommentSave,
          alert: false,
        });
      } else {
        this.saveLoginInAPI(id, comment);
      }
    }
  };
  saveLoginInAPI = (id, comment) => {
    Loginlogics.saveLoginInAPI(id, comment)
      .then((r) => {
        if (!JSON.parse(r.data).Successful) {
          alert(r.Message);
          return;
        }

        const workersList = this.state.workersList;
        const worker = workersList.filter((x) => x.OId === id)[0];
        worker.IsLoggedIn = true;
        var inx = workersList.findIndex((x) => x.OId === id);
        if (inx !== -1) {
          workersList[inx] = worker;
        }

        this.setState({
          ...this.state,
          claimingOId: id,
          claimingUser: worker.Name,
          workersList,
        });
      })
      .catch((err) => {
        alert(err);
      });

    this.props.changeStep(2);
  };
  handleLogOut = () => {
    const id = this.state.claimingOId;
    const workersList = this.state.workersList;
    const worker = workersList.filter((x) => x.OId === id)[0];
    const comment = "NOT impelemented yet";
    var response = Loginlogics.saveLogoutAPI(id, comment);
    response
      .then((r) => {
        if (!JSON.parse(r.data).Successful) {
          alert(r.Message);
          return;
        }
        worker.IsLoggedIn = false;
        var inx = workersList.findIndex((x) => x.OId === id);
        if (inx !== -1) {
          workersList[inx] = worker;
        }
        this.setState({
          ...this.state,
          page: 0,
          workersList,
        });
        this.props.changeStep(1);
      })
      .catch((err) => {
        alert(err);
      });
  };

  searchNames = (event) => {
    this.setState({
      ...this.state,
      workersList: Loginlogics.searchNames(event, this.state.mainWorkersList),
    });
  };
  /* #endregion */

  /* #region  WorkType */

  searchWorkTypes = (event) => {
    var txt = event.target.value;
    var workTypes =
      event.target.value.length > 0
        ? this.state.mainWorkTypes.filter((t) =>
            t.Name.toLowerCase().includes(txt.toLowerCase())
          )
        : this.state.mainWorkTypes;
    this.setState({
      ...this.state,
      workTypes,
    });
  };

  handleWorkTypeClick = async (worktypeId) => {
    this.setState({
      ...this.state,
      loading: true,
    });
    const response = ClaimLogic.getJobItemsFromApi(
      this.state.jobId,
      worktypeId
    );
    response.then((r) => {
      var data = JSON.parse(r.data);
      this.setState({
        ...this.state,
        jobItems: data.jobItems,
        mainJobItems: data.jobItems,
        canClaimWholeJob: data.canClaimWholeJob,
        page: 3,
        loading: false,
        worktypeId: worktypeId,
      });
    });

    this.props.changeStep(4);
  };

  searchJobs = (event) => {
    var txt = event.target.value;
    var jobs =
      event.target.value.length > 0
        ? this.state.mainJobs.filter(
            (t) =>
              t.Title.toLowerCase().includes(txt.toLowerCase()) ||
              t.Code.includes(txt)
          )
        : this.state.mainJobs;

    var adminJobs =
      event.target.value.length > 0
        ? this.state.mainAdminJobs.filter((t) =>
            t.Name.toLowerCase().includes(txt.toLowerCase())
          )
        : this.state.mainAdminJobs;

    this.setState({
      ...this.state,
      jobs,
      adminJobs,
    });
  };
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
        adminJobs: values.Item2,
        mainAdminJobs: values.Item2,
        loading: false,
        claimingOId,
        page,
      });
    });
  };
  handleBack = (pageId) => {
    this.setState({
      page: pageId,
    });
    this.props.changeStep(pageId + 1);
  };
  handleJobClick = (jobId, isAdmin = false) => {
    if (isAdmin) {
      const selectedAdminJob = this.state.adminJobs.find(
        (x) => x.OId === jobId
      );
      this.setState({
        ...this.state,
        adminWorkType: selectedAdminJob,
        page: 4,
      });
      this.props.changeStep(5);
    } else {
      const selectedJob = this.state.jobs.find((x) => x.OId === jobId);
      this.setState({
        ...this.state,
        jobId,
        workTypes: selectedJob.WorkTypes,
        mainWorkTypes: selectedJob.WorkTypes,
        page: 2,
      });
      this.props.changeStep(3);
    }
  };
  /* #endregion */

  /*#region jobItem*/

  handleSaveClaim = (changedClaimingItems, fullJob) => {
    if (fullJob) {
      this.setState({
        ...this.state,
        claimingFullJob: true,
        page: 4,
      });
    } else {
      this.setState({
        ...this.state,
        changedClaimingItems,
        page: 4,
      });
    }
    this.props.changeStep(5);
  };

  handleSubmitClaim = (comment, isAdmin = false) => {
    this.setState({
      ...this.state,
      loading: true,
    });

    if (!isAdmin) {
      if (this.state.claimingFullJob) {
        const response = ClaimLogic.submitFullJobClaimInAPI(
          this.state.claimingOId,
          this.state.jobId,
          this.state.worktypeId,
          comment
        );

        response.then((e) => {
          this.setState({
            ...this.state,
            loading: false,
            page: 0,
          });
          this.props.changeStep(1);
        });
      } else {
        const response = ClaimLogic.submitClaimInAPI(
          this.state.claimingOId,
          this.state.jobId,
          this.state.jobItems.filter(
            (x) => x.Progress100 !== x.Main_Progress100
          ),
          comment
        );

        response.then((e) => {
          this.setState({
            ...this.state,
            loading: false,
            page: 0,
          });
          this.props.changeStep(1);
        });
      }
    } else {
      const response = ClaimLogic.submitAdminJobClaimInAPI(
        this.state.claimingOId,
        this.state.adminWorkType.OId,
        comment
      );

      response.then((e) => {
        this.setState({
          ...this.state,
          loading: false,
          page: 0,
        });
        this.props.changeStep(1);
      });
    }
  };

  handleFullSubmitClaim = (comment, isAdmin = false) => {};
  /* #endregion */
  render() {
    const renderConditionaly = () => {
      if (this.state.loading) {
        return <Loading />;
      }
      switch (this.state.page) {
        case 0: {
          return (
            <Login
              items={this.state.workersList}
              searchNames={this.searchNames}
              handleLogin={this.handleLogin}
              settings={this.state.settings}
            />
          );
        }
        case 1: {
          return (
            <Jobs
              claimingOId={this.state.claimingOId}
              searchJobs={this.searchJobs}
              jobs={this.state.jobs}
              adminJobs={this.state.adminJobs}
              handleJobClick={this.handleJobClick}
              handleBack={this.handleBack}
              handleLogOut={this.handleLogOut}
            />
          );
        }
        case 2: {
          return (
            <WorkTypes
              claimingOId={this.state.claimingOId}
              searchWorkTypes={this.searchWorkTypes}
              workTypes={this.state.workTypes}
              handleBack={this.handleBack}
              handleWorkTypeClick={this.handleWorkTypeClick}
            />
          );
        }

        case 3: {
          return (
            <JobItems
              claimingOId={this.state.claimingOId}
              searchJobs={this.searchJobs}
              items={this.state.mainJobItems}
              handleBack={this.handleBack}
              handleSave={this.handleSaveClaim}
              canClaimWholeJob={this.state.canClaimWholeJob}
            />
          );
        }
        case 4: {
          return (
            <Summary
              claimingOId={this.state.claimingOId}
              claimingName={
                this.state.mainWorkersList.find(
                  (x) => x.OId === this.state.claimingOId
                ).Name
              }
              worktypeName={
                this.state.adminWorkType
                  ? "Admin Work"
                  : this.state.mainWorkTypes.find(
                      (x) => x.OId === this.state.worktypeId
                    ).Name
              }
              jobName={
                this.state.adminWorkType
                  ? this.state.adminWorkType.Name
                  : this.state.mainJobs.find((x) => x.OId === this.state.jobId)
                      .Title
              }
              claimingItems={this.state.changedClaimingItems}
              isFullJobClaim={this.state.claimingFullJob}
              isAdimJob={this.state.adminWorkType !== null}
              handleBack={this.handleBack}
              handleSubmit={this.handleSubmitClaim}
            />
          );
        }
        default:
          return <div></div>;
      }
    };
    return (
      <Fragment>
        <FormDialog
          header={this.state.dialogHeader}
          text={this.state.dialogText}
          placeholer="Please describe"
          open={this.state.dialogOpen}
          onCommentSave={this.state.dialogSave}
          alert={this.state.alert}
        />
        ;{renderConditionaly()}
      </Fragment>
    );
  }
}
export default CalimContainer;
