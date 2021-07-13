import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DoneIcon from "@material-ui/icons/Done";
import FaceIcon from "@material-ui/icons/Face";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import gridSearchStyles from "../../components/controls/Styles";

export default function Login(props) {
  const classes = gridSearchStyles();
  return (
    <Fragment>
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
          onChange={props.searchNames}
        />
      </div>
      <Grid container spacing={1}>
        {props.items &&
          props.items.map((e) => (
            <Grid
              item
              lg={2}
              sm={6}
              xs={12}
              key={e.OId}
              className={classes.bolding}
            >
              <Box
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
                overlayStyle={{ backgroundColor: "transparent" }}
                p={4}
                key={e.OId}
                boxShadow={4}
                color="black"
                bgcolor={
                  e.IsOnLeave ? "#9e9e9e" : e.IsLoggedIn ? "#3F51B5" : "#dadabc"
                }
                spacing={3}
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "1.3rem",
                  textAlign: "center",
                }}
                onClick={() => {
                  props.handleLogin(e.OId, e.IsOnLeave);
                }}
              >
                {e.IsLoggedIn && (
                  <div>
                    <DoneIcon />
                    <FaceIcon />{" "}
                  </div>
                )}
                {e.Name + (e.IsOnLeave ? "(on leave)" : "")}
              </Box>
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
}
