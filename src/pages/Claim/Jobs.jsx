import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import gridSearchStyles from "../../components/controls/Styles";
import { Button, IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import FullScreenDialog from "../../components/controls/FullScreenDialog";
import ArrowBack from "@material-ui/icons/ArrowBack";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import CircularProgressWithLabel from "../../components/controls/CircularProgressWithLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

export default function Jobs(props) {
  const classes = gridSearchStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [note, setNote] = useState([]);

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
              <InputLabel htmlFor="input-with-icon-adornment">
                Search
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                onChange={props.searchJobs}
              />
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
          <Accordion defaultExpanded="true">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4" component="div">
                Production
                <hr />
              </Typography>
            </AccordionSummary>

            <AccordionDetails></AccordionDetails>
            <Grid container spacing={1}>
              {props.jobs &&
                props.jobs
                  .sort(function (a, b) {
                    return a.JobStageOrder - b.JobStageOrder;
                  })
                  .map((e) => (
                    <Grid
                      item
                      lg={props.jobs.length > 48 ? 1 : 2}
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
                          <Grid
                            item
                            lg={12}
                            xs={12}
                            sm={12}
                            md={12}
                            // style={{
                            //   backgroundColor:
                            //     e.JobStageName == "postproduction"
                            //       ? "#dce2e2"
                            //       : "#bfe668",
                            // }}
                          >
                            <span style={{ fontSize: "large" }}> {e.Code}</span>
                          </Grid>
                          <Grid item lg={12} xs={12} sm={12} md={12}>
                            <hr />
                          </Grid>
                          <Grid item lg={6} xs={6} sm={6} md={6}>
                            {e.Note !== "" && e.Note.length > 0 && (
                              <IconButton color="inherit">
                                <CommentIcon
                                  onClick={(w) => {
                                    // alert(e.Note);
                                    setNote(e.Note);
                                    setOpenDialog(true);
                                    w.stopPropagation();
                                  }}
                                />
                              </IconButton>
                            )}
                          </Grid>

                          <Grid item lg={6} xs={6} sm={6} md={6}>
                            <CircularProgressWithLabel value={e.Progress} />
                          </Grid>
                        </Grid>
                        <hr />
                        <div style={{ fontSize: "smaller" }}>{e.Title}</div>
                      </Box>
                    </Grid>
                  ))}
            </Grid>
          </Accordion>
          <Accordion defaultExpanded="true">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h4" component="div">
                Admin <hr />
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
