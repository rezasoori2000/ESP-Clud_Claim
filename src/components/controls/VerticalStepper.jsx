import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#3a3d57",
    color: "#fff!important",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Start",
    "Login",
    "Job Selection",
    "WorkType Selection",
    "Claiming",
    "Finish",
  ];
}

function getStepContent(index, p) {
  return "";
  switch (index) {
    case 0:
      return "";
    case 1:
      return "";
    case 2:
      return ``;
    default:
      return "";
  }
}
function getLabel(label, text) {
  if (text && text.length > 1) return `(${text})`;
  //return label;
}
function getLabels(p, label, index, adminJon) {
  switch (index) {
    case 1:
      return getLabel(label, p.texts[0]);
    case 2:
      return getLabel(label, p.texts[1]);
    case 3:
      return getLabel(label, p.texts[2]);
    default:
      return "";
  }
}

const VerticalStepper = (props) => {
  const classes = useStyles();

  const steps = getSteps();

  return (
    props.step > 0 && (
      <div className={classes.root}>
        <Stepper
          activeStep={props.step - 1}
          orientation="vertical"
          className={classes.root}
        >
          {steps.map(
            (label, index) =>
              !(props.isAdmin && index === 3) && (
                <Step key={label}>
                  <StepLabel>
                    <Typography style={{ color: "white" }}>
                      {label}
                      <br />
                      <span> {getLabels(props, label, index)}</span>
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography></Typography>
                    <div className={classes.actionsContainer}>
                      <div></div>
                    </div>
                  </StepContent>
                </Step>
              )
          )}
        </Stepper>
        {props.step - 1 === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
          </Paper>
        )}
      </div>
    )
  );
};

export default VerticalStepper;
