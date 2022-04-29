import React, { Fragment } from "react";
import Login from "./Login";
import WorkTypes from "./WorkTypes";
import JobItems from "./JobItems";
import Summary from "./Summary";
import Jobs from "./Jobs";
import Start from "./Start";
import Loginlogics from "../../components/logics/Login";
import ClaimLogic from "../../components/logics/ClaimLogic";
import Loading from "../loading.js";
import FormDialog from "../../components/controls/FormDialog";
import { Redirect } from "react-router-dom";

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
      claiminWorker: {},
      page: -1,
      loading: false,
      worktypeId: 0,
      workTypeName: "",
      jobId: 0,
      isAdminJob: false,
      adminWorkType: null,
      jobItems: [],
      mainJobItems: [],
      primaryJobs: [],
      secondaryJobs: [],
      changedClaimingItems: [],
      canClaimWholeJob: false,
      claimingFullJob: false,
      dialogOpen: false,
      dialogHeader: "",
      dialogText: "",
      dialogSave: null,
      totalPhyCalimgMinutes: 0,
      LabelText: [],
      isFullJob: false,
      logoutClicked: false,
      totalProgress: 0,
      finishedItems: [],
      logoutChecked: false,
      groupPercent: 0,
      IsSitWorkGroup: false,
      stage: "",
      doSaving: true,
      holdReturnToStart: false,
      isReturnHasSet: false,
    };
  }

  componentWillMount() {
    // this.setState(
    //   {
    //     ...this.state,
    //     loading: true,
    //   },
    //   () => {
    //     this.loadWorkersList();
    //   }
    // );
    if (this.props.fromPB) {
      this.setState(
        {
          ...this.state,
          loading: true,
        },
        () => {
          this.loadWorkersList(this.props.workTypeId);
        }
      );
    } else {
      this.setState({
        ...this.state,
        page: -1,
      });
    }
  }

  componentDidMount() {}

  /* #region Claim From PB */
  getPBJobItems = async (jid, wid) => {
    this.setState({
      ...this.state,
      loading: true,
    });

    var labelText = this.state.LabelText;
    var r = await ClaimLogic.getJobItemsFromApi(
      jid,
      wid,
      this.state.claimingOId,
      this.props.apiRoute
    );
    var data = JSON.parse(r.data);

    labelText.push(this.props.fromPB ? this.props.jobCode : data.WorkType.Name);
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
        totalPhyCalimgMinutes: data.totalPhyCalimgMinutes,
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
  };
  /* #region Claim From PB */

  /* #region  Login Methods */
  setIsReturnHasSet = (val) => {
    this.setState({ ...this.state, isReturnHasSet: val });
  };
  goBackToStart = (pageId) => {
    if (this.state.page === pageId && !this.state.holdReturnToStart) {
      this.setState({
        ...this.state,
        page: -1,
      });
      this.props.changeStep(1, [], this.state.isAdminJob);
    }
  };
  start = async () => {
    this.setState(
      {
        ...this.state,
        loading: true,
        isReturnHasSet: false,
      },
      () => {
        this.loadWorkersList();
      }
    );
  };
  loadWorkersList = async (workTypeId = 0) => {
    try {
      var r = await Loginlogics.getListOfWorkersFromApi(
        this.props.workerId,
        this.props.apiRoute
      );
      const values = JSON.parse(r.data);
      var response = [];
      if (workTypeId !== 0) {
        values.map((x) => {
          if (x.Skills.some((t) => t.WorkTypeId === workTypeId)) {
            if (x !== undefined) response.push(x);
          }
        });
      } else {
        response = values;
      }
      this.setState(
        {
          ...this.state,
          workersList: response,
          mainWorkersList: response,
          loading: false,
          settings: this.props.settings,
          LabelText: [],
          page: 0,
        },
        () => {
          this.props.changeStep(2, [], this.state.isAdminJob);
          if (this.props.workerId !== 0) {
            var worker = response.find((x) => x.OId === this.props.workerId);
            if (worker && worker.IsLoggedIn) {
              this.loggedInWorkerClick(worker);
            }
          }
        }
      );
    } catch (err) {
      console.log(err);
      alert("Error in fetching Workers list ");
    }
  };

  onCommentSave = async (text, login = true) => {
    if (text)
      if (login)
        await this.saveLoginInAPI(
          this.state.claimingOId,
          text,
          this.props.apiRoute
        );
      else
        await this.saveLogoutAPI(
          this.state.claimingOId,
          text,
          this.props.apiRoute
        );
    this.setState(
      {
        ...this.state,
        dialogOpen: false,
      },
      () => {
        if (this.props.logout) <Redirect to="/ProductionBoard" />;
        else <Redirect to="/" />;
      }
    );
  };

  loggedInWorkerClick = (worker) => {
    const page = 1;
    const labelText = [];
    labelText.push(worker.Name);
    var primaryWorktypeIds = worker.Skills.filter((x) => x.Primary).map(
      (i) => i.WorkTypeId
    );
    var secondaryWorktypeIds = worker.Skills.filter((x) => x.Secondary).map(
      (i) => i.WorkTypeId
    );

    this.setState(
      {
        ...this.state,
        LabelText: labelText,
        claimingUser: worker.Name,
        claimingOId: worker.OId,
        claiminWorker: worker,
        primaryWorktypeIds,
        secondaryWorktypeIds,
        IsSitWorkGroup: worker.Skills.find((x) => x.IsSitework && x.Primary),
        stage: worker.Stage,
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
        holdReturnToStart: true,
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

      var isLate = Loginlogics.checkWorkerLateLogin(
        worker,
        this.state.settings.TrackLateLogin,
        this.state.settings.LateAllowance
      );
      var isNotLoggout = worker.LastDayNotLoggedOut;
      if (isLate && isNotLoggout) {
        this.setState({
          ...this.state,
          claimingOId: id,
          claimingUser: worker.Name,
          dialogOpen: true,
          logoutClicked: false,
          holdReturnToStart: true,
          dialogHeader: "Late Login & Missing logout",
          dialogText:
            " You did not logout yesterday please advise your manager.Also, Please, specify the reason to late log in.",
          dialogSave: this.onCommentSave,
          alert: false,
          LabelText: [worker.Name],
        });
      } else if (isLate) {
        this.setState({
          ...this.state,
          claimingOId: id,
          claimingUser: worker.Name,
          dialogOpen: true,
          logoutClicked: false,
          holdReturnToStart: true,
          dialogHeader: "Late Login",
          dialogText: "Please, specify the reason to late log in.",
          dialogSave: this.onCommentSave,
          alert: false,
          LabelText: [worker.Name],
        });
      } else if (isNotLoggout) {
        this.setState({
          ...this.state,
          claimingOId: id,
          claimingUser: worker.Name,
          holdReturnToStart: true,
          logoutClicked: false,
          dialogHeader: "Missing logout",
          dialogText:
            " You did not logout yesterday please advise your manager",

          doSaving: true,
          alert: true,
          LabelText: [worker.Name],

          dialogOpen: true,
          dialogSave: this.onCommentSave,
        });
        this.saveLoginInAPI(id, comment, this.props.apiRoute);
      } else {
        this.saveLoginInAPI(id, comment, this.props.apiRoute);
      }
    }
  };
  saveLoginInAPI = async (id, comment) => {
    const workersList = this.state.workersList;
    const worker = workersList.filter((x) => x.OId === id)[0];
    var labelText = [];
    var r = await Loginlogics.saveLoginInAPI(id, comment, this.props.apiRoute);

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
        holdReturnToStart: false,
      },
      () => {
        if (this.props.fromPB) {
          this.getPBJobItems(this.props.jobId, this.props.workTypeId);
        } else {
          this.props.changeStep(3, labelText, this.state.isAdminJob);
        }
      }
    );
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
      var response = await this.saveLogoutAPI(id, comment, this.props.apiRoute);
      if (this.props.logout)
        <Redirect to={`${this.props.apiRoute}ProductionBoard`} />;
      else {
        this.setState(
          {
            ...this.state,
            page: -1,
          },
          () => {
            <Redirect to={`${this.props.apiRoute}claim`} />;
          }
        );
      }
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
    var r = await Loginlogics.saveLogoutAPI(id, comment, this.props.apiRoute);

    var obj = JSON.parse(r.data);
    if (!obj.Successful) {
      alert(obj.Message);
      return false;
    }

    const workersList = this.setWorkerLOgout(id);
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
  };
  setWorkerLOgout = (id) => {
    const workersList = this.state.workersList;
    const worker = workersList.filter((x) => x.OId === id)[0];
    worker.IsLoggedIn = false;
    var inx = workersList.findIndex((x) => x.OId === id);
    if (inx !== -1) {
      workersList[inx] = worker;
    }
    return workersList;
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
    const workType = this.state.mainWorkTypes.find((x) => x.OId === worktypeId);
    var labelText = this.state.LabelText;
    var r = await ClaimLogic.getJobItemsFromApi(
      this.state.jobId,
      worktypeId,
      this.state.claimingOId,
      this.props.apiRoute
    );
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
        totalPhyCalimgMinutes: data.totalPhyCalimgMinutes,
        totalProgress: data.totalProgress,
        page: 3,
        loading: false,
        worktypeId: worktypeId,
        LabelText: labelText,
        workTypeName: workType.Name,
      },
      () => {
        this.props.changeStep(5, labelText, this.state.isAdminJob);
      }
    );
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

  goToJobsPage = async (page, claimingOId) => {
    this.setState({
      ...this.state,
      loading: true,
    });
    var jobStage =
      this.state.stage === "prod"
        ? 3
        : this.state.stage === "pre"
        ? 2
        : this.state.stage === "post"
        ? 4
        : 3;
    var r = this.state.IsSitWorkGroup
      ? await ClaimLogic.getJobsOfWorkerFromApi(
          this.props.apiRoute,
          claimingOId,
          jobStage,
          true
        )
      : await ClaimLogic.getJobsOfWorkerFromApi(
          this.props.apiRoute,
          claimingOId,
          jobStage
        );
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
    //this.props.history.push("/productionBoard");
    if (pageId === 2 && this.props.fromPB) {
      pageId = 0;
      labelText = [];
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
          JobTitle: selectedJob.Code,
        },
        () => {
          this.props.changeStep(4, labelText, this.state.isAdminJob);
        }
      );
    }
  };

  /* #endregion */

  /*#region jobItem*/

  handleSaveClaim = (
    changedClaimingItems,
    groupPercent = 0,
    jobLevel = false
  ) => {
    // if (fullJob) {
    //   this.setState({
    //     ...this.state,
    //     claimingFullJob: true,
    //     page: 4,
    //   });
    // } else {
    this.setState(
      {
        ...this.state,
        changedClaimingItems,
        groupPercent,
        page: 4,
      },
      () => {
        this.props.changeStep(5, this.state.LabelText, this.state.isAdminJob);
      }
    );
  };

  handleSubmitClaim = async (comment, isAdmin = false, logout = false) => {
    this.setState({
      ...this.state,
      loading: true,
    });

    if (!isAdmin) {
      if (this.state.isFullJob) {
        var e = await ClaimLogic.submitFullJobClaimInAPI(
          this.state.claimingOId,
          this.state.jobId,
          comment,
          this.props.apiRoute
        );
        this.setState(
          {
            ...this.state,
            loading: false,
            page: this.props.role === "a" || this.props.public ? -1 : 1,
            LabelText: [],
          },
          () => {
            if (this.props.role === "a" || this.props.public)
              this.props.changeStep(1, [], this.state.isAdminJob);
            else this.props.changeStep(2, [], this.state.isAdminJob);
          }
        );
      } else {
        var jobItems =
          this.state.groupPercent > 0
            ? this.state.jobItems
            : this.state.jobItems.filter(
                (x) => x.Progress100 !== x.Main_Progress100
              );
        await ClaimLogic.submitClaimInAPI(
          this.state.claimingOId,
          this.state.jobId,
          jobItems,
          this.state.groupPercent,
          comment,
          logout,
          this.props.apiRoute
        );
        this.setState(
          {
            ...this.state,
            loading: false,
            page: -1,
            LabelText: [],
            workersList: logout
              ? this.setWorkerLOgout(this.state.claimingOId)
              : this.state.workersList,
          },
          () => {
            if (this.props.fromPB)
              this.props.history.push(`${this.props.mainRoute}productionBoard`);
            else {
              if (this.props.role === "a" || this.props.public)
                this.props.changeStep(1, [], this.state.isAdminJob);
              else this.props.changeStep(2, [], this.state.isAdminJob);
            }
          }
        );
      }
    } else {
      var e = await ClaimLogic.submitAdminJobClaimInAPI(
        this.state.claimingOId,
        this.state.adminWorkType.OId,
        comment,
        logout,
        this.props.apiRoute
      );
      this.setState(
        {
          ...this.state,
          loading: false,
          page: -1,
          LabelText: [],
          workersList: logout
            ? this.setWorkerLOgout(this.state.claimingOId)
            : this.state.workersList,
        },
        () => {
          if (this.props.role === "a" || this.props.public)
            this.props.changeStep(1, [], this.state.isAdminJob);
          else this.props.changeStep(2, [], this.state.isAdminJob);
        }
      );
    }
  };

  handleFullSubmitClaim = (comment, isAdmin = false) => {};
  /* #endregion */

  render() {
    const renderConditionaly = () => {
      if (this.state.loading) {
        return <Loading mainRoute={this.props.mainRoute} />;
      }
      switch (this.state.page) {
        case -1: {
          return (
            <Start mainRoute={this.props.mainRoute} start={this.start}></Start>
          );
        }
        case 0: {
          return (
            <Login
              items={this.state.workersList}
              searchNames={this.searchNames}
              handleLogin={this.handleLogin}
              settings={this.state.settings}
              logoutChecked={this.state.logoutChecked}
              loggingOut={this.props.logout}
              fromPB={this.props.fromPB}
              apiRoute={this.props.apiRoute}
              mainRoute={this.props.mainRoute}
              goBackToStart={this.goBackToStart}
              isReturnHasSet={this.state.isReturnHasSet}
              setIsReturnHasSet={this.setIsReturnHasSet}
            />
          );
        }
        case 1: {
          return (
            <Jobs
              claimingOId={this.state.claimingOId}
              claimingName={this.state.claimingUser}
              searchJobs={this.searchJobs}
              jobs={this.state.mainJobs}
              adminJobs={this.state.adminJobs}
              primaryJobs={this.state.primaryJobs}
              secondaryJobs={this.state.secondaryJobs}
              prejobs={this.state.prejobs}
              postjobs={this.state.postjobs}
              settings={this.state.settings}
              handleJobClick={this.handleJobClick}
              handleBack={this.handleBack}
              handleLogOut={this.handleLogOut}
              handleJobLoaded={this.handleJobLoaded}
              menuIsOpen={this.props.menuSize === 240}
              IsSitWorkGroup={this.state.IsSitWorkGroup}
              stage={this.state.stage}
              apiRoute={this.props.apiRoute}
              divideJobs={this.state.settings.DividJobs}
              mainRoute={this.props.mainRoute}
              primaryWorktypeIds={this.state.primaryWorktypeIds}
              goBackToStart={this.goBackToStart}
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
              claimingName={this.state.claimingUser}
              menuIsOpen={this.props.menuSize === 240}
              primaryWorktypeIds={this.state.primaryWorktypeIds}
              secondaryWorktypeIds={this.state.secondaryWorktypeIds}
              apiRoute={this.props.apiRoute}
              goBackToStart={this.goBackToStart}
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
              claimingName={this.state.claimingUser}
              menuIsOpen={this.props.menuSize === 240}
              goBackToStart={this.goBackToStart}
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
              apiRoute={this.props.apiRoute}
            />
          );
        }
        case 4: {
          return (
            <Summary
              claimingOId={this.state.claimingOId}
              totalPhyCalimgMinutes={this.state.totalPhyCalimgMinutes}
              claimingName={
                this.state.mainWorkersList.find(
                  (x) => x.OId === this.state.claimingOId
                ).Name
              }
              goBackToStart={this.goBackToStart}
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
              settings={this.props.settings}
              groupPercent={this.state.groupPercent}
              mainPercent={this.state.totalProgress}
              jobLevel={
                this.state.isAdminJob
                  ? true
                  : this.props.fromPB
                  ? this.props.jobLevel
                  : this.state.mainWorkTypes.find(
                      (x) => x.OId === this.state.worktypeId
                    ).JobLevel
              }
              apiRoute={this.props.apiRoute}
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
          doSaving={this.state.doSaving}
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
