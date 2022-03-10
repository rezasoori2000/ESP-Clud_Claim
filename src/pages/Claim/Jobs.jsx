import React, { Fragment, useState, useEffect, forwardRef } from "react";
import Grid from "@material-ui/core/Grid";

import SearchIcon from "@mui/icons-material/Search";

import CancelIcon from "@mui/icons-material/Cancel";

import gridSearchStyles from "../../components/controls/Styles";
import { Button, IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import FullScreenDialog from "../../components/controls/FullScreenDialog";
import ArrowBack from "@material-ui/icons/ArrowBack";
import InputBase from "@mui/material/InputBase";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SettingsIcon from "@mui/icons-material/Settings";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import SubdirectoryArrowLeftOutlinedIcon from "@mui/icons-material/SubdirectoryArrowLeftOutlined";

import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";

import CircularProgressWithLabel from "../../components/controls/CircularProgressWithLabel";
import DividedJobs from "./DividedJobs";
import ClaimLogic from "../../components/logics/ClaimLogic";
import Barchart from "../../components/controls/Barchart";
import Hidden from "@material-ui/core/Hidden";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Jobs(props) {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const classes = gridSearchStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [note, setNote] = useState([]);
  const [activeButton, setactiveButton] = useState(
    props.IsSitWorkGroup ? "site" : "prod"
  );

  const [jobs, setJobs] = useState(props.jobs);
  const [isLoading, setisLoading] = useState(true);
  const [preJobs, setPreJobs] = useState([]);
  const [postJobs, setPostJobs] = useState([]);
  const [siteJobs, setSiteJobs] = useState([]);
  const [loadedJobs, setLoadedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setsearchVal] = useState("");
  const [perfstat, setPerfstat] = useState(false);
  const [perfstatReady, setPerfstatReady] = useState(true);
  const [dateFrom, setDateFrom] = useState(new Date().addDays(-7));
  const [dateTo, setDateTo] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  const [primaryJobs, setPrimaryJobs] = useState([]);
  const [secondaryJobs, setSecondaryJobs] = useState([]);
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <OutlinedInput
      sx={{ ml: 1, flex: 1 }}
      onClick={onClick}
      ref={ref}
      value={value}
    />
  ));
  useEffect(() => {
    divideJobs(props.jobs);
  }, []);
  async function getPerfStatAPI(fromBtn) {
    if (fromBtn && perfstat) {
      setPerfstat(false);
      return;
    }
    try {
      var result = await ClaimLogic.GetPerfStatByAPI(
        props.claimingOId,
        dateFrom.toLocaleDateString("en-US"),
        dateTo.toLocaleDateString("en-US"),
        props.apiRoute
      );
      var data = JSON.parse(result.data);
      var result = [];
      result.push({
        country: data.PointName,
        name: data.PointName,
        actual: data.Actual,
        std: data.Std,
      });
      setChartData(result);

      setPerfstat(true);
      setPerfstatReady(true);
    } catch (ex) {
      if (ex.response)
        alert(`Error in calling Get performance stat. API- ${ex.response}`);
      else alert(`Error in calling Get performance stat. API- ${ex.message}`);
    }
  }
  function divideJobs(jobs) {
    var pj = [];
    var sj = [];
    setPrimaryJobs([]);
    setSecondaryJobs([]);
    setJobs([]);
    if (props.divideJobs) {
      for (let i = 0; i < jobs.length; i++) {
        const j = jobs[i];

        var wtIds = j.WorkTypes.filter((x) => x.Progress < 100).map(
          (w) => w.OId
        );
        const intersct = wtIds.filter((value) =>
          props.primaryWorktypeIds.includes(value)
        );
        if (intersct.length > 0) {
          pj.push(j);
        } else sj.push(j);
      }
      setPrimaryJobs(pj);
      setSecondaryJobs(sj);
    } else {
      setJobs(jobs);
    }
  }

  function searchJobs(event) {
    var txt = event.target.value;
    setsearchVal(txt);

    if (props.divideJobs) {
      setPrimaryJobs(
        event.target.value.length > 0
          ? primaryJobs.filter(
              (t) =>
                t.Title.toLowerCase().includes(txt.toLowerCase()) ||
                t.Code.includes(txt)
            )
          : primaryJobs
      );

      setSecondaryJobs(
        event.target.value.length > 0
          ? secondaryJobs.filter(
              (t) =>
                t.Title.toLowerCase().includes(txt.toLowerCase()) ||
                t.Code.includes(txt)
            )
          : secondaryJobs
      );
    } else {
      var filterJobs =
        event.target.value.length > 0
          ? jobs.filter(
              (t) =>
                t.Title.toLowerCase().includes(txt.toLowerCase()) ||
                t.Code.includes(txt)
            )
          : jobs;
      divideJobs(filterJobs);
    }
  }
  function chunkSubstr(str, size) {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }

    return chunks;
  }
  function clearSearch() {
    setsearchVal("");
    divideJobs([]);
    divideJobs(props.jobs);
  }

  function handleJobsButtonClicked(section) {
    var jobType =
      section === "post"
        ? 4
        : section === "pre"
        ? 2
        : section === "prod"
        ? 3
        : section === "site"
        ? 4
        : 3;

    divideJobs([]);
    setsearchVal("");
    setLoading(true);
    ClaimLogic.getJobsOfWorkerFromApi(
      props.apiRoute,
      props.claimingOId,
      jobType,
      section === "site"
    )
      .then((r) => {
        const values = JSON.parse(r.data);
        setSiteJobs(values.Item1);
        divideJobs(values.Item1);
        loadedJobs.push(section);
        setLoadedJobs(loadedJobs);
        props.handleJobLoaded(values.Item1);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error in retrieve Jobs list");
      });
    setactiveButton(section);
  }

  return (
    <Fragment>
      <Card style={{ backgroundColor: "#ebedf1" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item ml={0} lg={1} sm={2} xs={2}>
              <Button
                variant="outlined"
                size="small"
                style={{ textAlign: "right" }}
                onClick={() => {
                  props.handleBack(0);
                }}
                startIcon={<ArrowBack />}
              ></Button>
            </Grid>
            <Grid item lg={2} sm={9} xs={9}>
              <span style={{ fontSize: "18px", marginTop: "30px" }}>
                <b>Job&nbsp;Selection</b>
              </span>
            </Grid>
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                variant="outlined"
                value={searchVal}
                onChange={searchJobs}
              />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
                onClick={() => clearSearch()}
              >
                <CancelIcon />
              </IconButton>
            </Grid>

            <Grid
              item
              ml={0}
              lg={2}
              sm={6}
              md={6}
              xs={6}
              style={{ textAlign: "right" }}
            >
              {props.settings.PSEnableIndividual && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => getPerfStatAPI(true)}
                >
                  Performance
                </Button>
              )}
            </Grid>

            <Grid
              item
              ml={0}
              lg={2}
              md={6}
              sm={6}
              xs={6}
              style={{ textAlign: "right" }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => props.handleLogOut(props.claimingOId)}
                startIcon={<MeetingRoomIcon />}
              >
                Logout
              </Button>
            </Grid>
          </Grid>

          {!perfstat && (
            <Fragment>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h4" component="div">
                    Jobs{" "}
                    {props.menuIsOpen ? "" : "(" + props.claimingName + ")"}{" "}
                    <hr />
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid ml={1} item lg={2} sm={1} xs={1}></Grid>
                  <Grid
                    ml={0}
                    item
                    lg={2}
                    sm={3}
                    xs={3}
                    style={{ textAlign: "right" }}
                  >
                    {!props.settings.HidePreProductionJobs && (
                      <Button
                        variant={
                          activeButton == "pre" ? "contained" : "outlined"
                        }
                        style={{
                          color: activeButton == "pre" ? "white" : "black",
                          backgroundColor:
                            activeButton == "pre" ? "#196dc4" : "white",
                        }}
                        size="small"
                        onClick={() => handleJobsButtonClicked("pre")}
                        startIcon={<CallMadeOutlinedIcon />}
                        fullWidth
                      >
                        Pre&nbsp;Prod.
                      </Button>
                    )}
                  </Grid>
                  <Grid
                    ml={0}
                    item
                    lg={2}
                    sm={3}
                    xs={3}
                    style={{ textAlign: "right" }}
                  >
                    <Button
                      variant={
                        activeButton == "prod" ? "contained" : "outlined"
                      }
                      style={{
                        color: activeButton == "prod" ? "white" : "black",
                        backgroundColor:
                          activeButton == "prod" ? "#196dc4" : "white",
                      }}
                      size="small"
                      onClick={() => handleJobsButtonClicked("prod")}
                      startIcon={<SettingsIcon />}
                      fullWidth
                    >
                      <span>
                        &nbsp;&nbsp;&nbsp;Prod.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                    </Button>
                  </Grid>
                  <Grid
                    ml={0}
                    item
                    lg={2}
                    sm={3}
                    xs={3}
                    style={{ textAlign: "right" }}
                  >
                    {!props.settings.HidePostProductionJobs && (
                      <Button
                        variant={
                          activeButton == "post" ? "contained" : "outlined"
                        }
                        style={{
                          color: activeButton == "post" ? "white" : "black",
                          backgroundColor:
                            activeButton == "post" ? "#196dc4" : "white",
                        }}
                        startIcon={<SubdirectoryArrowLeftOutlinedIcon />}
                        size="small"
                        onClick={() => handleJobsButtonClicked("post")}
                        fullWidth
                      >
                        Post&nbsp;Prod.
                      </Button>
                    )}
                  </Grid>
                  <Grid
                    ml={0}
                    item
                    lg={2}
                    sm={3}
                    xs={3}
                    style={{ textAlign: "right" }}
                  >
                    <Button
                      variant={
                        activeButton == "site" ? "contained" : "outlined"
                      }
                      style={{
                        color: activeButton == "site" ? "white" : "black",
                        backgroundColor:
                          activeButton == "site" ? "#196dc4" : "white",
                      }}
                      startIcon={<HomeWorkIcon />}
                      size="small"
                      onClick={() => handleJobsButtonClicked("site")}
                      fullWidth
                    >
                      Site&nbsp;Work.
                    </Button>
                  </Grid>
                </AccordionDetails>
                {props.settings.DividJobs && (
                  <div>
                    <DividedJobs
                      label="Primary Jobs"
                      menuIsOpen={props.menuIsOpen}
                      claimingName={props.claimingName}
                      loading={loading}
                      jobs={primaryJobs}
                      handleJobClick={props.handleJobClick}
                      setNote={setNote}
                      setOpenDialog={setOpenDialog}
                      classes={classes}
                      activeButton={activeButton}
                      mainRoute={props.mainRoute}
                    />
                    <DividedJobs
                      label="Secondary Jobs"
                      menuIsOpen={props.menuIsOpen}
                      claimingName={props.claimingName}
                      loading={loading}
                      jobs={secondaryJobs}
                      handleJobClick={props.handleJobClick}
                      setNote={setNote}
                      setOpenDialog={setOpenDialog}
                      classes={classes}
                      activeButton={activeButton}
                      mainRoute={props.mainRoute}
                    />
                  </div>
                )}
                {!props.divideJobs && (
                  <DividedJobs
                    label="Jobs"
                    menuIsOpen={props.menuIsOpen}
                    claimingName={props.claimingName}
                    loading={loading}
                    jobs={jobs}
                    handleJobClick={props.handleJobClick}
                    setNote={setNote}
                    setOpenDialog={setOpenDialog}
                    classes={classes}
                    activeButton={activeButton}
                    mainRoute={props.mainRoute}
                  />
                )}
              </Accordion>

              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h4" component="div">
                    Admin Jobs{" "}
                    {props.menuIsOpen ? "" : "(" + props.claimingName + ")"}{" "}
                    <hr />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
                <Grid container spacing={1}>
                  {props.jobs &&
                    props.adminJobs.map((e) => (
                      <Grid
                        item
                        lg={2}
                        sm={6}
                        xs={12}
                        key={e.OId}
                        className={classes.bolding}
                      >
                        <Box
                          borderRadius="5%"
                          p={4}
                          boxShadow={4}
                          color="black"
                          spacing={3}
                          style={{
                            width: "100%",
                            height: "100%",
                            fontSize: "0.9rem",
                            textAlign: "center",
                            backgroundColor: "#efefef",
                          }}
                          onClick={() => {
                            props.handleJobClick(e.OId, true);
                          }}
                        >
                          <div>{e.Name}</div>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Accordion>
            </Fragment>
          )}
          {perfstat && (
            <div>
              <Grid
                container
                style={{
                  marginBottom: "20px",
                  marginTop: "40px",
                  textAlign: "right",
                }}
              >
                <Grid item lg={12} sm={12} xs={12}>
                  <hr />
                </Grid>
                <Grid item lg={8} sm={4} xs={12} style={{ marginTop: "30px" }}>
                  <Button
                    variant="contained"
                    onClick={() => getPerfStatAPI(false)}
                  >
                    Show
                  </Button>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <div>
                    <label>From</label>
                    <DatePicker
                      style={{ zIndex: "10000" }}
                      selected={dateFrom}
                      onChange={(e) => setDateFrom(e)}
                      customInput={<ExampleCustomInput />}
                    />
                  </div>
                </Grid>
                <Grid item lg={2} sm={4} xs={6}>
                  <div>
                    <label className="datePickerLabel">To</label>
                    <DatePicker
                      customInput={<ExampleCustomInput />}
                      selected={dateTo}
                      onChange={(e) => setDateTo(e)}
                      style={{ zIndex: "10000" }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Barchart Columns={chartData} Title="Performance" />
            </div>
          )}
          <FullScreenDialog
            header="Job Notes"
            uls={note}
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
}
