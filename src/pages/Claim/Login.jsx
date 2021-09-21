import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DoneIcon from "@material-ui/icons/Done";
import FaceIcon from "@material-ui/icons/Face";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import gridSearchStyles from "../../components/controls/Styles";
import { BlurCircular } from "@material-ui/icons";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Login(props) {
  const classes = gridSearchStyles();
  return (
    <Fragment style={{ backgroundColor: "#ebedf1!important" }}>
      <div className={classes.search}>
        <Grid container spacing={1} style={{ backgroundColor: "#ebedf1" }}>
          <Grid
            item
            lg={6}
            sm={6}
            xs={12}
            style={{ fontSize: "24px", paddingTop: "30px" }}
          >
            <span
              style={{ fontSize: "24px", padding: "30px", marginTop: "30px" }}
            >
              <b> Login</b>
            </span>
          </Grid>
          <Grid item lg={6} sm={6} xs={12} style={{ marginTop: "20px" }}>
            <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={props.searchNames}
            />
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        spacing={0}
        style={{ marginTop: 10, backgroundColor: "#ebedf1" }}
      >
        {props.items &&
          props.items.map((e) => (
            <Grid
              item
              lg={2}
              sm={6}
              xs={12}
              key={e.OId}
              style={{ padding: "15px" }}
              className={classes.bolding}
            >
              <Box
                borderRadius="5%"
                p={2}
                key={e.OId}
                className={classes.boxBolding}
                boxShadow={2}
                color="black"
                bgcolor={
                  e.IsOnLeave ? "#b4bebf" : e.IsLoggedIn ? "#9abf47" : "white"
                }
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
                onClick={() => {
                  props.handleLogin(e.OId, e.IsOnLeave);
                }}
              >
                {/* {e.IsLoggedIn && (
                  <div>
                    <DoneIcon />
                    <FaceIcon />{" "}
                  </div>
                )} */}
                {e.Name + (e.IsOnLeave ? "(on leave)" : "")}
              </Box>
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
}
