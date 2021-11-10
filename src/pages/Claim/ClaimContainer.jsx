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
      workTypeName: "",
      jobId: 0,
      isAdminJob: false,
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
      totalClaiminMinutes: 0,
      LabelText: [],
      isFullJob: false,
      logoutClicked: false,
      totalProgress: 0,
      finishedItems: [],
      logoutChecked: false,
    };
  }

  componentWillMount() {
    this.setState(
      {
        ...this.state,
        loading: true,
      },
      () => {
        this.loadWorkersList();
      }
    );
  }

  componentDidMount() {}

  /* #region Claim From PB */
  getPBJobItems = (jid, wid) => {
    this.setState({
      ...this.state,
      loading: true,
    });

    var labelText = this.state.LabelText;
    ClaimLogic.getJobItemsFromApi(jid, wid, this.state.claimingOId).then(
      (r) => {
        var data = JSON.parse(r.data);
        labelText.push(data.WorkType.Name);
        this.setState(
          {
            ...this.state,
            jobId: jid,
            jobLevel: data.WorkType.JobLevel,
            workTypeName: data.WorkType.Name,
            jobItems: data.jobItems,
            mainJobItems: data.jobItems,
            finishedItems: data.finishedItems,
            canClaimWholeJob: data.canClaimWholeJob,
            totalClaiminMinutes: data.totalPhyCalimMinutes,
            totalProgress: data.totalProgress,
            page: 3,
            loading: false,
            worktypeId: wid,
            LabelText: labelText,
            JobTitle: data.JobTitle,
          },
          () => {
            this.props.changeStep(5, labelText, this.state.isAdminJob);
          }
        );
      }
    );
  };
  /* #region Claim From PB */

  /* #region  Login Methods */
  loadWorkersList = () => {
    try {
      Loginlogics.getListOfWorkersFromApi(this.props.workerId)
        .then((r) => {
          const response = JSON.parse(r.data);
          this.setState(
            {
              ...this.state,
              workersList: response,
              mainWorkersList: response,
              loading: false,
              settings: this.props.settings,
              LabelText: [],
            },
            () => {
              this.props.changeStep(2, [], this.state.isAdminJob);
              if (this.props.workerId !== 0) {
                var worker = response.find((x) => x.OId == this.props.workerId);
                if (worker && worker.IsLoggedIn) {
                  this.loggedInWorkerClick(worker);
                }
              }
            }
          );
        })
        .catch((err) => {
          alert("Error in fetching Workers list ");
        });
    } catch (err) {
      console.log(err);
      alert("Error in fetching Workers list ");
    }
  };

  onCommentSave = async (text, login = true) => {
    if (text)
      if (login) await this.saveLoginInAPI(this.state.claimingOId, text);
      else await this.saveLogoutAPI(this.state.claimingOId, text);
    this.setState(
      {
        ...this.state,
        dialogOpen: false,
      },
      () => {
        if (this.props.logout) window.location = "/ProductionBoard";
        else window.location = "";
      }
    );
  };

  loggedInWorkerClick = (worker) => {
    const page = 1;
    const labelText = [];
    labelText.push(worker.Name);
    this.setState(
      {
        ...this.state,
        LabelText: labelText,
        claimingUser: worker.Name,
        claimingOId: worker.OId,
      },
      () => {
        if (this.props.fromPB) {
          this.getPBJobItems(this.props.jobId, this.props.workTypeId);
        } else {
          this.props.changeStep(3, labelText, this.state.isAdminJob);
          this.goToJobsPage(page, worker.OId);
        }
      }
    );
  };
  handleLogin = (sid, isOnLeave, logout) => {
    if (logout || this.props.logout) {
      this.handleLogOut(sid);

      return;
    }
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
    this.props.setClaimingId(id);
    if (worker.IsLoggedIn) {
      this.loggedInWorkerClick(worker);
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
          claimingUser: worker.Name,
          dialogOpen: true,
          logoutClicked: false,
          dialogHeader: "Late Login",
          dialogText: "Please, specify the reason to late log in.",
          dialogSave: this.onCommentSave,
          alert: false,
          LabelText: [worker.Name],
        });
      } else {
        this.saveLoginInAPI(id, comment);
      }
    }
  };
  saveLoginInAPI = async (id, comment) => {
    const workersList = this.state.workersList;
    const worker = workersList.filter((x) => x.OId === id)[0];
    var labelText = [];
    await Loginlogics.saveLoginInAPI(id, comment)
      .then((r) => {
        if (!JSON.parse(r.data).Successful) {
          alert(r.Message);
          return;
        }

        worker.IsLoggedIn = true;
        var inx = workersList.findIndex((x) => x.OId === id);

        if (inx !== -1) {
          workersList[inx] = worker;
        }

        labelText.push(worker.Name);
        this.setState(
          {
            ...this.state,
            claimingOId: id,
            claimingUser: worker.Name,
            workersList,
            LabelText: labelText,
          },
          () => {
            if (this.props.fromPB) {
              this.getPBJobItems(this.props.jobId, this.props.workTypeId);
            } else {
              this.props.changeStep(3, labelText, this.state.isAdminJob);
            }
          }
        );
      })
      .catch((err) => {
        alert(err);
      });
  };
  handleLogOut = async (id, comment) => {
    const workersList = this.state.workersList;
    const worker = workersList.filter((x) => x.OId === id)[0];
    if (
      Loginlogics.checkWorkerEarlyLeave(
        worker,
        this.state.settings.TrackEarlyLeave,
        this.state.settings.EarlyLeaveAllowance
      )
    ) {
      this.setState({
        ...this.state,
        claimingOId: id,
        claimingUser: worker.Name,
        dialogOpen: true,
        logoutClicked: true,
        dialogHeader: "Early Leave",
        dialogText: "Please, specify the reason to early leaving.",
        dialogSave: this.onCommentSave,
        alert: false,
        LabelText: [worker.Name],
      });
    } else {
      var response = await this.saveLogoutAPI(id, comment);
      if (this.props.logout) window.location = "/ProductionBoard";
      else window.location = "";
    }
  };

  handleJobLoaded = (newJobs) => {
    var stateJobs = this.state.jobs;
    var mainStateJobs = this.state.mainJobs;
    stateJobs.push(...newJobs);
    //   mainStateJobs.push(...newJobs);

    this.setState(
      {
        ...this.state,
        jobs: stateJobs,
        mainJobs: mainStateJobs,
      },
      () => {
        return true;
      }
    );
  };
  saveLogoutAPI = async (id, comment) => {
    const workersList = this.state.workersList;
    const worker = workersList.filter((x) => x.OId === id)[0];

    var response = await Loginlogics.saveLogoutAPI(id, comment)
      .then((r) => {
        var obj = JSON.parse(r.data);
        if (!obj.Successful) {
          alert(obj.Message);
          return false;
        }
        worker.IsLoggedIn = false;
        var inx = workersList.findIndex((x) => x.OId === id);
        if (inx !== -1) {
          workersList[inx] = worker;
        }
        this.setState(
          {
            ...this.state,
            page: 0,
            workersList,
            dialogOpen: false,
          },
          () => {
            this.props.changeStep(2, [], this.state.isAdminJob);
          }
        );
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

  clearSearchWorkTypes = () => {
    this.setState({
      ...this.state,
      workTypes: this.state.mainWorkTypes,
    });
  };
  handleWorkTypeClick = async (worktypeId) => {
    this.setState({
      ...this.state,
      loading: true,
    });
    const workType = this.state.mainWorkTypes.find((x) => x.OId == worktypeId);
    var labelText = this.state.LabelText;
    ClaimLogic.getJobItemsFromApi(
      this.state.jobId,
      worktypeId,
      this.state.claimingOId
    ).then((r) => {
      var data = JSON.parse(r.data);
      labelText.push(workType.Name);
      this.setState(
        {
          ...this.state,
          jobLevel: workType.JobLevel,
          jobItems: data.jobItems,
          mainJobItems: data.jobItems,
          finishedItems: data.finishedItems,
          canClaimWholeJob: data.canClaimWholeJob,
          totalClaiminMinutes: data.totalPhyCalimMinutes,
          totalProgress: data.totalProgress,
          page: 3,
          loading: false,
          worktypeId: worktypeId,
          LabelText: labelText,
        },
        () => {
          this.props.changeStep(5, labelText, this.state.isAdminJob);
        }
      );
    });
  };

  /* #endregion */

  /*#region Job*/

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

  handleFullJob = () => {
    var labelText = this.state.LabelText;
    labelText.push("Full Job");
    this.setState(
      {
        ...this.state,
        page: 4,
        isFullJob: true,
        LabelText: labelText,
      },
      () => {
        this.props.changeStep(6, labelText, this.state.isAdminJob);
      }
    );
  };
  goToJobsPage = (page, claimingOId) => {
    this.setState({
      ...this.state,
      loading: true,
    });

    ClaimLogic.getJobsOfWorkerFromApi(claimingOId, 3)
      .then((r) => {
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
      })
      .catch((err) => {
        alert("Error in retrieve Jobs list");
      });
  };
  handleBack = (pageId) => {
    var labelText = this.state.LabelText;
    switch (pageId) {
      case 0:
        labelText = [];
        break;
      case 1:
        labelText = labelText.slice(0, 1);
        break;
      case 2:
        labelText = labelText.slice(0, 2);
        break;
    }

    this.setState(
      {
        ...this.state,
        page: pageId,
        LabelText: labelText,
        jobs: this.state.mainJobs,
        jobItems: this.state.mainJobItems,
        adminJobs: this.state.mainAdminJobs,
        workersList: this.state.mainWorkersList,
        workTypes: this.state.mainWorkTypes,
      },
      () => {
        this.props.changeStep(
          pageId + 2,
          this.state.LabelText,
          this.state.isAdminJob
        );
      }
    );
  };
  handleJobClick = (jobId, isAdmin = false) => {
    if (isAdmin) {
      const selectedAdminJob = this.state.adminJobs.find(
        (x) => x.OId === jobId
      );
      var labelText = this.state.LabelText;

      labelText.push(selectedAdminJob.Name);
      labelText[2] = "";
      this.setState(
        {
          ...this.state,
          adminWorkType: selectedAdminJob,
          page: 4,
          isAdminJob: isAdmin,
          LabelText: labelText,
        },
        () => {
          this.props.changeStep(6, labelText, this.state.isAdminJob);
        }
      );
    } else {
      const jobs = this.state.jobs;
      const selectedJob = jobs.find((x) => x.OId === jobId);
      var labelText = this.state.LabelText;
      labelText.push(selectedJob.Code);

      this.setState(
        {
          ...this.state,
          jobId,
          // workTypes: selectedJob.WorkTypes.filter((x) => x.HasJobItems),
          // mainWorkTypes: selectedJob.WorkTypes.filter((x) => x.HasJobItems),
          workTypes: selectedJob.WorkTypes,
          mainWorkTypes: selectedJob.WorkTypes,
          selectedJobCode: selectedJob.Code,
          page: 2,
          isAdminJob: false,
          LabelText: labelText,
        },
        () => {
          this.props.changeStep(4, labelText, this.state.isAdminJob);
        }
      );
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
      this.setState(
        {
          ...this.state,
          changedClaimingItems,
          page: 4,
        },
        () => {
          this.props.changeStep(5, this.state.LabelText, this.state.isAdminJob);
        }
      );
    }
  };

  handleSubmitClaim = (comment, isAdmin = false, logout = false) => {
    this.setState({
      ...this.state,
      loading: true,
    });

    if (!isAdmin) {
      if (this.state.isFullJob) {
        ClaimLogic.submitFullJobClaimInAPI(
          this.state.claimingOId,
          this.state.jobId,
          comment
        ).then((e) => {
          this.setState(
            {
              ...this.state,
              loading: false,
              page: this.props.role == "a" || this.props.public ? 0 : 1,
              LabelText: [],
            },
            () => {
              if (this.props.role == "a" || this.props.public)
                this.props.changeStep(1, [], this.state.isAdminJob);
              else this.props.changeStep(2, [], this.state.isAdminJob);
            }
          );
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
          this.setState(
            {
              ...this.state,
              loading: false,
              page: 0,
              LabelText: [],
            },
            () => {
              if (this.props.fromPB)
                this.props.history.push("/productionBoard");
              else {
                if (this.props.role == "a" || this.props.public)
                  this.props.changeStep(1, [], this.state.isAdminJob);
                else this.props.changeStep(2, [], this.state.isAdminJob);
              }
            }
          );
        });
      }
    } else {
      const response = ClaimLogic.submitAdminJobClaimInAPI(
        this.state.claimingOId,
        this.state.adminWorkType.OId,
        comment
      );

      response.then((e) => {
        this.setState(
          {
            ...this.state,
            loading: false,
            page: 0,
            LabelText: [],
          },
          () => {
            if (this.props.role == "a" || this.props.public)
              this.props.changeStep(1, [], this.state.isAdminJob);
            else this.props.changeStep(2, [], this.state.isAdminJob);
          }
        );
      });
    }
    if (logout) this.handleLogOut(this.state.claimingOId, "logout from Claim");
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
              logoutChecked={this.state.logoutChecked}
              loggingOut={this.props.logout}
            />
          );
        }
        case 1: {
          return (
            <Jobs
              claimingOId={this.state.claimingOId}
              searchJobs={this.searchJobs}
              jobs={this.state.mainJobs}
              adminJobs={this.state.adminJobs}
              prejobs={this.state.prejobs}
              postjobs={this.state.postjobs}
              showPreProduction={this.state.settings.HidePreProductionJobs}
              showPostProduction={this.state.settings.HidePostProductionJobs}
              handleJobClick={this.handleJobClick}
              handleBack={this.handleBack}
              handleLogOut={this.handleLogOut}
              handleJobLoaded={this.handleJobLoaded}
            />
          );
        }
        case 2: {
          return (
            <WorkTypes
              claimingOId={this.state.claimingOId}
              settings={this.props.settings}
              workTypes={this.state.workTypes}
              handleBack={this.handleBack}
              handleWorkTypeClick={this.handleWorkTypeClick}
              handleFullJob={this.handleFullJob}
              jobCode={this.state.selectedJobCode}
            />
          );
        }

        case 3: {
          return (
            <JobItems
              claimingOId={this.state.claimingOId}
              searchJobs={this.searchJobs}
              items={this.state.mainJobItems}
              finishedItems={this.state.finishedItems}
              totalProgress={this.state.totalProgress}
              handleBack={this.handleBack}
              handleSave={this.handleSaveClaim}
              settings={this.props.settings}
              canClaimWholeJob={this.state.canClaimWholeJob}
              jobLevel={this.state.jobLevel}
            />
          );
        }
        case 4: {
          return (
            <Summary
              claimingOId={this.state.claimingOId}
              totalClaiminMinutes={this.state.totalClaiminMinutes}
              claimingName={
                this.state.mainWorkersList.find(
                  (x) => x.OId === this.state.claimingOId
                ).Name
              }
              worktypeName={
                this.state.isFullJob
                  ? "Full Job"
                  : this.state.adminWorkType
                  ? "Admin Work"
                  : this.state.workTypeName
              }
              jobName={
                this.state.adminWorkType
                  ? this.state.adminWorkType.Name
                  : this.state.JobTitle
              }
              claimingItems={this.state.changedClaimingItems}
              isAdminJob={this.state.isAdminJob}
              handleBack={this.handleBack}
              isFullJob={this.state.isFullJob}
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
          logout={this.state.logoutClicked}
          header={this.state.dialogHeader}
          text={this.state.dialogText}
          placeholer="Please describe"
          open={this.state.dialogOpen}
          onCommentSave={this.state.dialogSave}
          alert={this.state.alert}
        />
        <div
          style={{
            backgroundColor: "#ebedf1",
            paddingRight: "10px",
            height: "100%",
          }}
        >
          {renderConditionaly()}
        </div>
      </Fragment>
    );
  }
}
export default CalimContainer;
