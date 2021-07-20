import React, { useState } from "react";
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

const useStyles = makeStyles({
  btn: {
    marginRight: "20px",
    marginLeft: "20px",
  },
  textarea: {
    display: "block",
    width: "100%",
    overflow: "hidden",
    resize: "both",
    minHight: "40px",
    lineHeight: "20px",
  },
});

export default function Summary(props) {
  const [comment, setComment] = useState("");
  const classes = useStyles();
  const timeConvert = (n) => {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours).toString();
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes).toString();
    return (
      (rhours.length == 1 ? "0" + rhours : rhours) +
      ":" +
      (rminutes.length == 1 ? "0" + rminutes : rminutes)
    );
  };
  return (
    <Fragment>
      <div style={{ textAlign: "right" }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            props.handleBack(props.isFullJob ? 2 : props.isAdminJob ? 1 : 3);
          }}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
      </div>
      <Card className={classes.root}>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.btn}
            startIcon={<SaveIcon />}
            onClick={() => props.handleSubmit(comment, props.isAdminJob)}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.btn}
            startIcon={<MeetingRoomIcon />}
            onClick={() => props.handleSubmit(comment, props.isAdminJob, true)}
          >
            Submit/Logout
          </Button>
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
                      <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
                        Worker
                      </Typography>
                    }
                    secondary={
                      <Typography style={{ fontSize: "1.5rem" }}>
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
                        <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
                          Work Type
                        </Typography>
                      }
                      secondary={
                        <Typography style={{ fontSize: "1.5rem" }}>
                          {props.worktypeName}
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DirectionsWalkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
                        JOB
                      </Typography>
                    }
                    secondary={
                      <Typography style={{ fontSize: "1.5rem" }}>
                        {props.jobName}
                        {props.isAdminJob && (
                          <div>
                            <span>(</span>
                            {timeConvert(props.totalClaiminMinutes)}
                            <span>)</span>
                          </div>
                        )}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                {props.isFullJob && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DoneAllIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" style={{ fontSize: "2rem" }}>
                          Claiming Full Job
                          {
                            <div>
                              <span>(</span>
                              {timeConvert(props.totalClaiminMinutes)}
                              <span>)</span>
                            </div>
                          }
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
                {!(props.isAdminJob || props.isFullJob) && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DoneAllIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
                          Claiming
                        </Typography>
                      }
                      secondary={props.claimingItems
                        .filter((x) => x.Progress100 !== x.Main_Progress100)
                        .map((e) => (
                          <Typography style={{ fontSize: "1.5rem" }}>
                            {e.Name}: ({e.Main_Progress100}% to:
                            {e.Progress100}% {")  ("}
                            {timeConvert(
                              props.totalClaiminMinutes /
                                props.claimingItems.filter(
                                  (x) => x.Progress100 !== x.Main_Progress100
                                ).length
                            )}
                            {")"}
                          </Typography>
                        ))}
                    />
                  </ListItem>
                )}
              </List>
            </Grid>
            <Grid item lg={5} sm={12} xs={12}>
              <TextareaAutosize
                aria-label="minimum height"
                style={{ fontSize: "30px" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={classes.textarea}
                rowsMin={30}
                placeholder="Comment"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.btn}
            startIcon={<SaveIcon />}
            onClick={() => props.handleSubmit(comment, props.isAdminJob)}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.btn}
            startIcon={<MeetingRoomIcon />}
            onClick={() => props.handleSubmit(comment, props.isAdminJob)}
          >
            Submit/Logout
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
}
