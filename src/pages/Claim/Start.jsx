import React from "react";
import "../../App.css";
import { Button, Grid } from "@material-ui/core";
export default function Start(props) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Button
          id="btnStart"
          name="btnStart"
          className="click"
          style={{
            backgroundImage: `url(\"${props.mainRoute}StartButton.png\")`,
            // hover: {
            //  ,
            //   transform: "scale(0.6)",
            //   transitionDuration: "0.5s",
            // },
            backgroundRepeat: "no-repeat",
            width: "385px",
            height: "385px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={props.start}
        ></Button>
      </Grid>
    </Grid>
  );
}
