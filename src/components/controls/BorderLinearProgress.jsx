import * as React from "react";
import { styled } from "@mui/material/styles";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)((props) => ({
  height: props.height,
  borderRadius: 5,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: props.backColor,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: props.barcolor,
  },
}));

export default function LineProgressBars(props) {
  return (
    <BorderLinearProgress
      variant="determinate"
      value={props.value}
      height={props.height}
      backColor={props.backColor}
      barcolor={props.barcolor}
      valueBuffer={24}
    />
  );
}
