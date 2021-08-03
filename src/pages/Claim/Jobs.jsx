import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import gridSearchStyles from "../../components/controls/Styles";
import { Button, IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import CircularProgressWithLabel from "../../components/controls/CircularProgressWithLabel";

export default function Jobs(props) {
  const classes = gridSearchStyles();

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid ml={0} item lg={11} sm={10} xs={8} style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            size="large"
            style={{ backgroundColor: "#85858880" }}
            onClick={() => {
              props.handleBack(0);
            }}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        </Grid>
        <Grid ml={0} item lg={1} sm={2} xs={4} style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => props.handleLogOut(props.claimingOId)}
            startIcon={<MeetingRoomIcon />}
            style={{ backgroundColor: "#85858880" }}
          >
            logout
          </Button>
          {/* <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} startIcon={<MeetingRoomIcon />} onClick={props.handleLogOut}>Logout</Button> */}
        </Grid>
        <Grid item lg={12} sm={12} xs={12}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={props.searchJobs}
            />
          </div>
        </Grid>
      </Grid>
      <Accordion defaultExpanded="true">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Production</Typography>
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
                  lg={2}
                  sm={6}
                  xs={12}
                  key={e.OId}
                  className={classes.bolding}
                >
                  <Box
                    p={4}
                    key={e.OId}
                    boxShadow={4}
                    color="white"
                    bgcolor={
                      e.JobStageName == "production"
                        ? "#548c63"
                        : e.JobStageName == "preproduction"
                        ? "#b3b31b"
                        : e.JobStageName == "postproduction"
                        ? "#adadad"
                        : "white"
                    }
                    spacing={3}
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: "1.3rem",
                      textAlign: "center",
                    }}
                  >
                    <Grid container style={{ color: "black" }}>
                      <Grid item lg={4} xs={4} sm={4} md={4}>
                        {e.Note !== "" && (
                          <IconButton
                            color="primary"
                            aria-label="add to shopping cart"
                          >
                            <CommentIcon
                              onClick={() => {
                                alert(e.Note);
                              }}
                            />
                          </IconButton>
                        )}
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        xs={4}
                        sm={4}
                        md={4}
                        onClick={() => {
                          props.handleJobClick(e.OId);
                        }}
                      >
                        {e.Code}
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        xs={4}
                        sm={4}
                        md={4}
                        onClick={() => {
                          props.handleJobClick(e.OId);
                        }}
                      >
                        <CircularProgressWithLabel value={e.Progress} />
                      </Grid>
                    </Grid>
                    <hr />
                    <div
                      style={{ fontSize: "smaller" }}
                      onClick={() => {
                        props.handleJobClick(e.OId);
                      }}
                    >
                      {e.Title}
                    </div>
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
          <Typography>Admin</Typography>
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
                  p={4}
                  key={e.OId}
                  boxShadow={4}
                  color="black"
                  spacing={3}
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "1.3rem",
                    textAlign: "center",
                    backgroundColor: "#c2c2c2",
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
  );
}
