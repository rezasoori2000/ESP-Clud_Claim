import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import gridSearchStyles from "../../components/controls/Styles";
import Input from "@material-ui/core/Input";
import { InputLabel } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import Tooltip from "@mui/material/Tooltip";

export default function Login(props) {
  const classes = gridSearchStyles();
  let lastMove = 0;
  const [logout, setLogout] = useState(props.logoutChecked);
  const history = useHistory();
  const personList = props.loggingOut
    ? props.items.filter((x) => x.IsLoggedIn)
    : props.items;

  const returnBack = () => {
    var now = new Date().getTime();

    if (now - 5000 > lastMove) {
      props.goBackToStart(0);
    } else {
      setTimeout(() => {
        returnBack();
      }, 5000);
    }
  };
  function getLabel(e) {
    var name = e.Name + (e.IsOnLeave ? "(on leave)" : "");

    return e.LastClaimTime !== null ? (
      <Tooltip title={`Your last claim/ login was ${e.LastClaimTime} ago`}>
        <span>
          {name}{" "}
          <span style={{ fontSize: "small" }}>
            <br />
            &nbsp;&nbsp;({e.LastClaimTime})
          </span>
        </span>
      </Tooltip>
    ) : (
      <div>{name}</div>
    );
  }
  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      lastMove = new Date().getTime();
    });
    window.scrollTo(0, 0);
    if (!props.isReturnHasSet) {
      props.setIsReturnHasSet(true);
      setTimeout(() => {
        returnBack();
      }, 5000);
    }
  });
  return (
    <div>
      <div className={classes.search}>
        <Grid container spacing={1} style={{ backgroundColor: "#ebedf1" }}>
          {(props.loggingOut || props.fromPB) && (
            <Grid
              item
              lg={1}
              sm={1}
              xs={6}
              style={{ fontSize: "24px", paddingTop: "30px" }}
            >
              <Button
                variant="outlined"
                size="small"
                style={{ textAlign: "right" }}
                onClick={() => {
                  history.push({
                    pathname: `${props.mainRoute}productionBoard`,
                  });
                }}
                startIcon={<ArrowBack />}
              ></Button>
            </Grid>
          )}
          <Grid
            item
            lg={4}
            sm={4}
            xs={6}
            style={{ fontSize: "24px", paddingTop: "30px" }}
          >
            <span
              style={{ fontSize: "24px", padding: "30px", marginTop: "30px" }}
            >
              <b> Login</b>
            </span>
          </Grid>
          <Grid
            item
            lg={3}
            sm={3}
            xs={6}
            style={{ marginTop: "20px", alignContent: "right" }}
          ></Grid>
          <Grid
            item
            lg={4}
            sm={4}
            xs={12}
            style={{ marginTop: "20px", alignContent: "right" }}
          >
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
        {personList &&
          personList.map((e) => (
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
                  props.handleLogin(e.OId, e.IsOnLeave, logout);
                }}
              >
                {getLabel(e)}
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
