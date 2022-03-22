import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import BuildIcon from "@material-ui/icons/Build";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Helper from "../../components/logics/Helper";
import Hidden from "@material-ui/core/Hidden";
import Barchart from "../../components/controls/Barchart";

const useStyles = makeStyles({
  btn: {
    marginRight: "20px",
    marginLeft: "20px",
    backgroundColor: "white",
    color: "#196dc4",
  },
  textarea: {
    display: "block",
    width: "100%",
    overflow: "hidden",
    resize: "both",
    minHight: "40px",
    lineHeight: "20px",
  },
  root: { backgroundColor: "#fff" },
});

export default function Summary(props) {
  const [comment, setComment] = useState("");
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      props.goBackToStart(4);
    }, 60000);
  });
  var num = 0;
  var avgStd = 0;
  var changedItems = props.claimingItems.filter(
    (x) => x.Progress100 !== x.Main_Progress100
  ).length;

  const totalminute =
    props.totalPhyCalimgMinutes / (props.jobLevel ? 1 : changedItems);
  const chartData = [];
  function space(n) {
    var s = "";
    for (var i = 0; i < n; i++) s += String.fromCharCode(0);
    return s;
  }
  return (
    <Fragment>
      {window.scrollTo(0, 0)}

      <Card className={classes.root}>
        <Grid container spacing={3} style={{ margin: "30px" }}>
          <Grid item lg={1} sm={2} xs={4}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                props.handleBack(
                  props.isFullJob ? 2 : props.isAdminJob ? 1 : 3
                );
              }}
              startIcon={<ArrowBack />}
            ></Button>
          </Grid>
          <Grid item lg={10} sm={10} xs={8}>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              <b>Claim</b>
            </span>
          </Grid>
        </Grid>
        <hr />
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            className={classes.btn}
            startIcon={<SaveIcon />}
            onClick={() => props.handleSubmit(comment, props.isAdminJob)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            size="small"
            className={classes.btn}
            style={{ color: "white", backgroundColor: "#196dc4" }}
            startIcon={<MeetingRoomIcon />}
            onClick={() => props.handleSubmit(comment, props.isAdminJob, true)}
          >
            Save & Logout
          </Button>
        </CardActions>
        <CardActions>
          <Grid container spacing={3}>
            <Grid item lg={9} sm={12} xs={12}>
              <DirectionsWalkIcon />
              <span style={{ fontSize: "1rem" }}>
                {" "}
                <b>Job: </b> {props.jobName}
              </span>
            </Grid>
          </Grid>
        </CardActions>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={12} xs={12}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccessibilityNewIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" style={{ fontSize: "1rem" }}>
                        Worker
                      </Typography>
                    }
                    secondary={
                      <Typography style={{ fontSize: "1rem" }}>
                        {props.claimingName}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                {!props.isFullJob && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BuildIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography variant="h6" style={{ fontSize: "1rem" }}>
                          Work Type
                        </Typography>
                      }
                      secondary={
                        <Typography style={{ fontSize: "1rem" }}>
                          {props.worktypeName}
                        </Typography>
                      }
                    />
                  </ListItem>
                )}

                <Divider variant="inset" component="li" />
                {/* {props.isFullJob && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DoneAllIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" style={{ fontSize: "1rem" }}>
                          Claiming Full Job
                          {
                            <div>
                              <span>(</span>
                              {Helper.timeConvert(props.totalPhyCalimgMinutes)}
                              <span>)</span>
                            </div>
                          }
                        </Typography>
                      }
                    />
                  </ListItem>
                )} */}
                {!props.isAdminJob && props.jobLevel && (
                  // const avgPrg=props.claimingItems.map((e) => (e.
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DoneAllIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" style={{ fontSize: "1rem" }}>
                          Claiming
                        </Typography>
                      }
                      secondary={
                        <Fragment>
                          <Typography style={{ fontSize: "1rem" }}>
                            {props.mainPercent}% to:
                            {props.groupPercent}% {" took: "}
                            {Helper.timeConvert(totalminute)}
                            {" - Std: "}
                            {Helper.timeConvert(
                              (props.claimingItems.reduce(
                                (a, v) => (a = a + v.StdTime),
                                0
                              ) *
                                (props.groupPercent - props.mainPercent)) /
                                6000
                            )}
                          </Typography>
                        </Fragment>
                      }
                    />
                  </ListItem>
                )}
                {!props.isAdminJob && !props.jobLevel && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DoneAllIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" style={{ fontSize: "1rem" }}>
                          Claiming
                        </Typography>
                      }
                      secondary={props.claimingItems
                        .filter((x) => x.Progress100 !== x.Main_Progress100)
                        .map((e) => (
                          <Fragment>
                            <Typography key={e.id} style={{ fontSize: "1rem" }}>
                              {e.Name}: ({e.Main_Progress100}% to:
                              {e.Progress100}% {") took: "}
                              {Helper.timeConvert(totalminute)}
                              {" - Std: "}
                              {Helper.timeConvert(
                                (e.StdTime *
                                  (e.Progress100 - e.Main_Progress100)) /
                                  6000
                              )}
                            </Typography>

                            <span style={{ fontSize: "0.0rem" }}>
                              {
                                (num =
                                  chartData.filter((x) => x.name == e.Name)
                                    .length + 1)
                              }
                              {!props.jobLevel &&
                                chartData.push({
                                  id: e.OId,
                                  name: e.Name,
                                  country:
                                    num > 1 ? e.Name + space(num) : e.Name,
                                  actual: totalminute,
                                  std:
                                    (e.StdTime *
                                      (e.Progress100 - e.Main_Progress100)) /
                                    6000,
                                })}
                            </span>
                          </Fragment>
                        ))}
                    />
                  </ListItem>
                )}
              </List>
              {props.jobLevel && (
                <span style={{ fontSize: "0.0rem" }}>
                  {chartData.push({
                    country: props.worktypeName,
                    actual: totalminute,
                    std:
                      (props.claimingItems.reduce(
                        (a, v) => (a = a + v.StdTime),
                        0
                      ) *
                        (props.groupPercent - props.mainPercent)) /
                      6000,
                  })}
                </span>
              )}
              {props.settings.PSEnableIndividual && (
                <Barchart Columns={chartData} Title="Performance" />
              )}
              {/* <Hidden only={["xs"]}>
                 <Barchart Columns={data} Title="Performance" /> 
              </Hidden> */}
            </Grid>
            <Grid item lg={5} sm={12} xs={12}>
              <TextareaAutosize
                aria-label="minimum height"
                style={{ fontSize: "20px" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={classes.textarea}
                rowsMin={20}
                placeholder="Comment"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            className={classes.btn}
            startIcon={<SaveIcon />}
            onClick={() => props.handleSubmit(comment, props.isAdminJob)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            size="small"
            className={classes.btn}
            style={{ color: "white", backgroundColor: "#196dc4" }}
            startIcon={<MeetingRoomIcon />}
            onClick={() => props.handleSubmit(comment, props.isAdminJob, true)}
          >
            Save & Logout
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
}
