import React from "react";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgressWithLabel from "../../components/controls/CircularProgressWithLabel";
import Loading from "../loading";
import Hidden from "@material-ui/core/Hidden";

export default function DividedJobs(props) {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h4" component="div">
          {props.label}
          {props.menuIsOpen ? "" : "(" + props.claimingName + ")"}{" "}
        </Typography>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
      <Grid container spacing={1}>
        <Grid ml={0} item lg={12} sm={12} xs={12} md={12}>
          <hr />
        </Grid>
        {props.loading && <Loading mainRoute={props.mainRoute} />}
        {!props.loading &&
          props.jobs &&
          props.jobs
            .sort(function (a, b) {
              return a.JobStageOrder - b.JobStageOrder;
            })
            .filter(
              (x) =>
                (props.activeButton === "post" &&
                  x.JobStageName === "postproduction") ||
                (props.activeButton === "pre" &&
                  x.JobStageName === "preproduction") ||
                (props.activeButton === "prod" &&
                  x.JobStageName === "production") ||
                (props.activeButton === "site" && x.JobStageName === "SiteWork")
            )
            .filter(
              (x) =>
                (props.activeButton !== "site" && x.WorkTypes.length > 0) ||
                props.activeButton === "site"
            )
            .filter((x) => x.WorkTypes.some((w) => w.Progress < 100))

            .map((e) => (
              <Grid
                item
                lg={props.jobs.length > 48 ? 1 : 2}
                sm={6}
                xs={12}
                key={e.OId}
                className={props.classes.bolding}
              >
                <Box
                  borderRadius="5%"
                  p={1}
                  boxShadow={4}
                  color="white"
                  className={props.classes.boxBolding}
                  style={{
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    width: "100%",
                    height: "100%",
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                  bgcolor={
                    e.JobStageName === "production"
                      ? "#9abf47"
                      : e.JobStageName === "preproduction"
                      ? "#b3b31b"
                      : e.JobStageName === "postproduction"
                      ? "#b4bebf"
                      : "white"
                  }
                  spacing={3}
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
                              props.setNote(e.Note);
                              props.setOpenDialog(true);
                              w.stopPropagation();
                            }}
                          >
                            <CommentIcon />
                          </IconButton>
                        )}
                      </Grid>
                      <Grid item lg={4} xs={4} sm={4} md={4}>
                        <span style={{ fontSize: "large" }}>{e.Code}</span>
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
                              props.setNote(e.Note);
                              props.setOpenDialog(true);
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
                          <span style={{ fontSize: "large" }}>{e.Code}</span>
                        </Grid>
                      </Grid>
                    </Hidden>

                    <Grid item lg={12} xs={12} sm={12} md={12}>
                      <hr />
                    </Grid>
                    <Grid item lg={12} xs={12} sm={12} md={12}>
                      <div style={{ fontSize: "small" }}> {e.Title}</div>
                    </Grid>
                    {/* <Grid item lg={6} xs={6} sm={6} md={6}>
              <CircularProgressWithLabel value={e.Progress} />
            </Grid> */}
                  </Grid>
                </Box>
              </Grid>
            ))}
      </Grid>
    </Accordion>
  );
}
