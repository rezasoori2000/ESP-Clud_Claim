import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import SearchIcon from "@mui/icons-material/Search";

import CancelIcon from "@mui/icons-material/Cancel";

import gridSearchStyles from "../../components/controls/Styles";
import { Button, IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import FullScreenDialog from "../../components/controls/FullScreenDialog";
import ArrowBack from "@material-ui/icons/ArrowBack";
import InputBase from "@mui/material/InputBase";
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
import Loading from "../loading";
import Hidden from "@material-ui/core/Hidden";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

export default function Jobs(props) {
  const classes = gridSearchStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [note, setNote] = useState([]);
  const [activeButton, setactiveButton] = useState(
    props.IsSitWorkGroup ? "site" : "prod"
  );
  const [primaryJobs, setPrimaryJobs] = useState([]);
  const [secondaryJobs, setSecondaryJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [preJobs, setPreJobs] = useState([]);
  const [postJobs, setPostJobs] = useState([]);
  const [siteJobs, setSiteJobs] = useState([]);
  const [loadedJobs, setLoadedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setsearchVal] = useState("");

  function divideJobs(jobs) {
    var pj = [];
    var sj = [];
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
    }
    setJobs(jobs);
  }
  useEffect(() => {
    {
      divideJobs(props.jobs);
    }
  }, []);
  function searchJobs(event) {
    var txt = event.target.value;
    setsearchVal(txt);
    var filterJobs =
      event.target.value.length > 0
        ? props.jobs.filter(
            (t) =>
              t.Title.toLowerCase().includes(txt.toLowerCase()) ||
              t.Code.includes(txt)
          )
        : props.jobs;
    divideJobs(filterJobs);
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
  function handlePreProduction() {
    setsearchVal("");
    setLoading(true);
    setactiveButton("pre");
    if (!loadedJobs.includes("pre")) {
      ClaimLogic.getJobsOfWorkerFromApi(props.apiRoute, props.claimingOId, 2)
        .then((r) => {
          const values = JSON.parse(r.data);
          setPreJobs(values.Item1);
          divideJobs(values.Item1);
          loadedJobs.push("pre");
          setLoadedJobs(loadedJobs);
          props.handleJobLoaded(values.Item1);
          setLoading(false);
        })
        .catch((err) => {
          alert("Error in retrieve Jobs list");
        });
    } else {
      setLoading(false);
      divideJobs(preJobs);
    }
  }
  function handlePostProduction() {
    setsearchVal("");
    setLoading(true);
    setactiveButton("post");
    if (!loadedJobs.includes("post")) {
      ClaimLogic.getJobsOfWorkerFromApi(props.apiRoute, props.claimingOId, 4)
        .then((r) => {
          const values = JSON.parse(r.data);
          setPostJobs(values.Item1);
          divideJobs(values.Item1);
          loadedJobs.push("post");
          setLoadedJobs(loadedJobs);
          props.handleJobLoaded(values.Item1);
          setLoading(false);
        })
        .catch((err) => {
          alert("Error in retrieve Jobs list");
        });
    } else {
      setLoading(false);
      divideJobs(postJobs);
    }
  }
  function handleSiteWork() {
    setsearchVal("");
    setLoading(true);
    setactiveButton("site");
    if (!loadedJobs.includes("site")) {
      ClaimLogic.getJobsOfWorkerFromApi(
        props.apiRoute,
        props.claimingOId,
        4,
        true
      )
        .then((r) => {
          const values = JSON.parse(r.data);
          setSiteJobs(values.Item1);
          divideJobs(values.Item1);
          loadedJobs.push("site");
          setLoadedJobs(loadedJobs);
          props.handleJobLoaded(values.Item1);
          setLoading(false);
        })
        .catch((err) => {
          alert("Error in retrieve Jobs list");
        });
    } else {
      setLoading(false);
      divideJobs(siteJobs);
    }
  }
  function handleProduction() {
    setsearchVal("");
    setLoading(true);
    if (!loadedJobs.includes("prod")) {
      ClaimLogic.getJobsOfWorkerFromApi(
        props.apiRoute,
        props.claimingOId,
        3,
        false
      )
        .then((r) => {
          const values = JSON.parse(r.data);
          setSiteJobs(values.Item1);
          divideJobs(values.Item1);
          loadedJobs.push("prod");
          setLoadedJobs(loadedJobs);
          props.handleJobLoaded(values.Item1);
          setLoading(false);
        })
        .catch((err) => {
          alert("Error in retrieve Jobs list");
        });
    } else {
      setLoading(false);
      divideJobs(siteJobs);
    }
    divideJobs(props.jobs);
    setactiveButton("prod");
  }

  return (
    <Fragment>
      <Card style={{ backgroundColor: "#ebedf1" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid ml={0} item lg={1} sm={4} xs={3}>
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
            <Grid item lg={7} sm={4} xs={5}>
              <span style={{ fontSize: "18px", marginTop: "30px" }}>
                <b>Job&nbsp;Selection</b>
              </span>
            </Grid>
            <Hidden only={["xl", "lg", "md"]}>
              <Grid
                ml={0}
                item
                lg={1}
                sm={4}
                xs={4}
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
            </Hidden>
            <Grid item lg={3} sm={12} xs={12}>
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
            <Hidden only={["sm", "xs"]}>
              <Grid ml={0} item lg={1} sm={1} style={{ textAlign: "right" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => props.handleLogOut(props.claimingOId)}
                  startIcon={<MeetingRoomIcon />}
                >
                  Logout
                </Button>
              </Grid>
            </Hidden>
          </Grid>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4" component="div">
                Jobs {props.menuIsOpen ? "" : "(" + props.claimingName + ")"}{" "}
                <hr />
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Grid ml={0} item lg={2} sm={0} xs={0}></Grid>
              <Grid
                ml={0}
                item
                lg={2}
                sm={3}
                xs={3}
                style={{ textAlign: "right" }}
              >
                {!props.showPreProduction && (
                  <Button
                    variant={activeButton == "pre" ? "contained" : "outlined"}
                    style={{
                      color: activeButton == "pre" ? "white" : "black",
                      backgroundColor:
                        activeButton == "pre" ? "#196dc4" : "white",
                    }}
                    size="small"
                    onClick={() => handlePreProduction()}
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
                  variant={activeButton == "prod" ? "contained" : "outlined"}
                  style={{
                    color: activeButton == "prod" ? "white" : "black",
                    backgroundColor:
                      activeButton == "prod" ? "#196dc4" : "white",
                  }}
                  size="small"
                  onClick={() => handleProduction()}
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
                {!props.showPostProduction && (
                  <Button
                    variant={activeButton == "post" ? "contained" : "outlined"}
                    style={{
                      color: activeButton == "post" ? "white" : "black",
                      backgroundColor:
                        activeButton == "post" ? "#196dc4" : "white",
                    }}
                    startIcon={<SubdirectoryArrowLeftOutlinedIcon />}
                    size="small"
                    onClick={() => handlePostProduction()}
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
                  variant={activeButton == "site" ? "contained" : "outlined"}
                  style={{
                    color: activeButton == "site" ? "white" : "black",
                    backgroundColor:
                      activeButton == "site" ? "#196dc4" : "white",
                  }}
                  startIcon={<HomeWorkIcon />}
                  size="small"
                  onClick={() => handleSiteWork()}
                  fullWidth
                >
                  Site&nbsp;Work.
                </Button>
              </Grid>
            </AccordionDetails>
            {props.divideJobs && (
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
                {props.menuIsOpen ? "" : "(" + props.claimingName + ")"} <hr />
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
                      key={e.OId}
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
