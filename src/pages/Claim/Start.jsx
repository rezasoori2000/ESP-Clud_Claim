import React, { useEffect } from "react";
import "../../App.css";
import { Button, Grid, Hidden } from "@material-ui/core";
export default function Start(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Hidden only={["xs", "sm"]}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <div>
              <h1
                style={{
                  color: "grey",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "35%",
                }}
              >
                Claim&nbsp;Job
              </h1>
              <Button
                id="btnStart"
                name="btnStart"
                className="click"
                style={{
                  backgroundImage: `url(\"${props.mainRoute}start.png\")`,
                  backgroundColor: "#fff",
                  backgroundPosition: "center",
                  // hover: {
                  //  ,
                  //   transform: "scale(0.6)",
                  //   transitionDuration: "0.5s",
                  // },
                  backgroundRepeat: "no-repeat",
                  paddingTop: "-30px",

                  width: "430px",
                  height: "240px",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "38px",
                  fontSize: "40px",
                }}
                onClick={props.start}
              ></Button>
            </div>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden only={["xl", "lg", "md"]}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <div>
              <h1
                style={{
                  color: "grey",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "35%",
                }}
              >
                Claim&nbsp;Job
              </h1>
              <Button
                id="btnStart"
                name="btnStart"
                className="click"
                style={{
                  backgroundImage: `url(\"${props.mainRoute}start.png\")`,
                  backgroundColor: "#fff",
                  backgroundPosition: "center",
                  // hover: {
                  //  ,
                  //   transform: "scale(0.6)",
                  //   transitionDuration: "0.5s",
                  // },
                  backgroundRepeat: "no-repeat",
                  paddingTop: "-30px",

                  width: "300px",
                  height: "240px",

                  display: "flex",
                  justifyContent: "left",
                  alignItems: "left",
                  borderRadius: "38px",
                  fontSize: "40px",
                }}
                onClick={props.start}
              ></Button>
            </div>
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
}
