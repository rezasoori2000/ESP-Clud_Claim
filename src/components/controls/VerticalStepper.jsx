import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  return ['Start','Login','Job Selection','WorkType Selection','Claiming','Finish'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return '';
    case 1:
      return '';
    case 2:
      return ``;
    default:
      return '';
  }
}

 const VerticalStepper = (props) => {
  const classes = useStyles();

  const steps = getSteps();


  return (
    
     props.step>0 &&
    <div className={classes.root}>
      <Stepper activeStep={props.step-1} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>

                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {props.step-1 === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>

        </Paper>
      )}
    </div>
  );
}

export default VerticalStepper;