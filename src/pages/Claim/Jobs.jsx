import React, { Fragment, useState } from "react";
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
import ClaimLogic from "../../components/logics/ClaimLogic";
import Loading from "../loading";
import Hidden from "@material-ui/core/Hidden";
export default function Jobs(props) {
  const classes = gridSearchStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [note, setNote] = useState([]);
  const [activeButton, setactiveButton] = useState("prod");
  const [jobs, setJobs] = useState(props.jobs);
  const [preJobs, setPreJobs] = useState([]);
  const [postJobs, setPostJobs] = useState([]);
  const [siteJobs, setSiteJobs] = useState([]);
  const [loadedJobs, setLoadedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal, setsearchVal] = useState("");

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
    setJobs(filterJobs);
  }
  function clearSearch() {
    setsearchVal("");
    setJobs(props.jobs);
  }
  function handlePreProduction() {
    setsearchVal("");
    setLoading(true);
    setactiveButton("pre");
    if (!loadedJobs.includes("pre")) {
      ClaimLogic.getJobsOfWorkerFromApi(props.claimingOId, 2)
        .then((r) => {
          const values = JSON.parse(r.data);
          setPreJobs(values.Item1);
          setJobs(values.Item1);
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
      setJobs(preJobs);
    }
  }
  function handlePostProduction() {
    setsearchVal("");
    setLoading(true);
    setactiveButton("post");
    if (!loadedJobs.includes("post")) {
      ClaimLogic.getJobsOfWorkerFromApi(props.claimingOId, 4)
        .then((r) => {
          const values = JSON.parse(r.data);
          setPostJobs(values.Item1);
          setJobs(values.Item1);
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
      setJobs(postJobs);
    }
  }
  function handleSiteWork() {
    setsearchVal("");
    setLoading(true);
    setactiveButton("site");
    if (!loadedJobs.includes("site")) {
      ClaimLogic.getJobsOfWorkerFromApi(props.claimingOId, 4, true)
        .then((r) => {
          const values = JSON.parse(r.data);
          setSiteJobs(values.Item1);
          setJobs(values.Item1);
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
      setJobs(siteJobs);
    }
  }
  function handleProduction() {
    setsearchVal("");
    setJobs(props.jobs);
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
                Jobs <hr />
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
                  startIcon={<SubdirectoryArrowLeftOutlinedIcon />}
                  size="small"
                  onClick={() => handleSiteWork()}
                  fullWidth
                >
                  Site&nbsp;Work.
                </Button>
              </Grid>
            </AccordionDetails>
            <Grid container spacing={1}>
              <Grid ml={0} item lg={12} sm={12} xs={12} md={12}>
                <hr />
              </Grid>
              {loading && <Loading />}
              {!loading &&
                jobs &&
                jobs
                  .sort(function (a, b) {
                    return a.JobStageOrder - b.JobStageOrder;
                  })
                  .filter(
                    (x) =>
                      (activeButton == "post" &&
                        x.JobStageName == "postproduction") ||
                      (activeButton == "pre" &&
                        x.JobStageName == "preproduction") ||
                      (activeButton == "prod" &&
                        x.JobStageName == "production") ||
                      (activeButton == "site" && x.JobStageName == "SiteWork")
                  )
                  .filter(
                    (x) =>
                      (activeButton != "site" && x.WorkTypes.length > 0) ||
                      activeButton == "site"
                  )
                  .map((e) => (
                    <Grid
                      item
                      lg={jobs.length > 48 ? 1 : 2}
                      sm={6}
                      xs={12}
                      key={e.OId}
                      className={classes.bolding}
                    >
                      <Box
                        borderRadius="5%"
                        p={1}
                        key={e.OId}
                        boxShadow={4}
                        color="white"
                        className={classes.boxBolding}
                        style={{ paddingLeft: "30px", paddingRight: "30px" }}
                        bgcolor={
                          e.JobStageName == "production"
                            ? "#9abf47"
                            : e.JobStageName == "preproduction"
                            ? "#b3b31b"
                            : e.JobStageName == "postproduction"
                            ? "#b4bebf"
                            : "white"
                        }
                        spacing={3}
                        style={{
                          width: "100%",
                          height: "100%",
                          fontSize: "0.8rem",
                          textAlign: "center",
                        }}
                        onClick={() => {
                          props.handleJobClick(e.OId);
                        }}
                      >
                        <Grid container style={{ color: "black" }}>
                          <Hidden only={["sm", "md", "xl", "lg"]}>
                            <Grid item lg={4} xs={4} sm={4} md={4}>
                              {e.Note !== "" && e.Note.length > 0 && (
                                <IconButton
                                  color="inherit"
                                  onClick={(w) => {
                                    // alert(e.Note);
                                    setNote(e.Note);
                                    setOpenDialog(true);
                                    w.stopPropagation();
                                  }}
                                >
                                  <CommentIcon />
                                </IconButton>
                              )}
                            </Grid>
                            <Grid item lg={4} xs={4} sm={4} md={4}>
                              <span style={{ fontSize: "large" }}>
                                {e.Code}
                              </span>
                            </Grid>

                            <Grid item lg={4} xs={4} sm={4} md={4}>
                              <CircularProgressWithLabel value={e.Progress} />
                            </Grid>
                          </Hidden>
                          <Hidden only={["xs"]}>
                            <Grid
                              item
                              lg={6}
                              xs={6}
                              sm={6}
                              md={6}
                              style={{ backgroundColor: "#718d35" }}
                            >
                              {e.Note !== "" && e.Note.length > 0 && (
                                <IconButton
                                  color="inherit"
                                  onClick={(w) => {
                                    // alert(e.Note);
                                    setNote(e.Note);
                                    setOpenDialog(true);
                                    w.stopPropagation();
                                  }}
                                >
                                  <CommentIcon />
                                </IconButton>
                              )}
                            </Grid>

                            <Grid
                              item
                              lg={6}
                              xs={6}
                              sm={6}
                              md={6}
                              style={{ backgroundColor: "#718d35" }}
                            >
                              <CircularProgressWithLabel value={e.Progress} />
                            </Grid>
                            <Grid item lg={12} xs={12} sm={12} md={12}>
                              <hr />
                            </Grid>
                            <Grid item lg={12} xs={12} sm={12} md={12}>
                              <Grid item lg={12} xs={12} sm={12} md={12}>
                                <span style={{ fontSize: "large" }}>
                                  {e.Code}
                                </span>
                              </Grid>
                            </Grid>
                          </Hidden>

                          <Grid item lg={12} xs={12} sm={12} md={12}>
                            <hr />
                          </Grid>

                          <div style={{ fontSize: "small" }}>
                            {e.Title.substring(0, 150)}
                          </div>

                          {/* <Grid item lg={6} xs={6} sm={6} md={6}>
                            <CircularProgressWithLabel value={e.Progress} />
                          </Grid> */}
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
            </Grid>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4" component="div">
                Admin Jobs
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
