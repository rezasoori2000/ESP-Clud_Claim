import React, { Fragment, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import gridSearchStyles from "../../components/controls/Styles";
import { Button } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import Slider from "@material-ui/core/Slider";
import CircularProgressWithLabel from "../../components/controls/CircularProgressWithLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Hidden from "@material-ui/core/Hidden";

export default function Worktypes(props) {
  const classes = gridSearchStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid ml={0} item lg={1} sm={4} xs={4}>
          <Button
            variant="outlined"
            size="large"
            style={{ textAlign: "right" }}
            onClick={() => {
              props.handleBack(1);
            }}
            startIcon={<ArrowBack />}
          ></Button>
        </Grid>
        <Grid item lg={7} sm={4} xs={4}>
          <span style={{ fontSize: "24px", marginTop: "30px" }}>
            <b>Work&nbsp;Type</b>
          </span>
        </Grid>
        <Hidden only={["xl", "lg", "md"]}>
          <Grid ml={0} item lg={1} sm={4} xs={4} style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              size="large"
              onClick={props.handleFullJob}
              startIcon={<PlaylistAddCheckIcon />}
            >
              FullJob
            </Button>
          </Grid>
        </Hidden>
        <Grid item lg={3} sm={12} xs={12}>
          <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={props.searchWorkTypes}
          />
        </Grid>
        <Hidden only={["sm", "xs"]}>
          <Grid ml={0} item lg={1} sm={1} style={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              size="large"
              onClick={props.handleFullJob}
              startIcon={<PlaylistAddCheckIcon />}
            >
              FullJob
            </Button>
          </Grid>
        </Hidden>
      </Grid>

      <hr />
      <Grid container spacing={1}>
        {props.workTypes &&
          props.workTypes
            .filter((x) => x.Progress < 100)
            .sort(function (a, b) {
              return a.CategoryOrder - b.CategoryOrder;
            })
            .map((e) => (
              <Grid
                item
                lg={2}
                sm={6}
                xs={12}
                key={e.OId}
                className={classes.bolding}
              >
                <Box
                  p={4}
                  borderRadius="5%"
                  key={e.OId}
                  className={classes.boxBolding}
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "1.3rem",
                    textAlign: "center",
                    backgroundColor:
                      e.CategoryName == "production"
                        ? "#9abf47"
                        : e.CategoryName == "preproduction"
                        ? "#b3b31b"
                        : e.CategoryName == "postproduction"
                        ? "#adadad"
                        : "white",
                  }}
                  onClick={() => {
                    props.handleWorkTypeClick(e.OId);
                  }}
                  // onDelete={()=>{}}

                  clickable
                >
                  {e.Name}
                  <hr />
                  <CircularProgressWithLabel value={e.Progress} />
                </Box>
              </Grid>
            ))}
      </Grid>
      <hr />
    </Fragment>
  );
}
