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
export default function Worktypes(props) {
  const classes = gridSearchStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Fragment>
      <Grid container>
        <Grid ml={0} item lg={11} sm={9} xs={8} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={props.handleFullJob}
            startIcon={<PlaylistAddCheckIcon />}
          >
            Claim Full Job
          </Button>
        </Grid>

        <Grid ml={0} item lg={1} sm={3} xs={4} style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              props.handleBack(1);
            }}
            startIcon={<ArrowBack />}
            style={{ backgroundColor: "#85858880" }}
          >
            Back
          </Button>
        </Grid>
        <Grid item lg={12} sm={8} xs={12}>
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
              onChange={props.searchWorkTypes}
            />
          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container>
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
                <Box p={2} key={e.OId}>
                  <Card>
                    <CardContent
                      key={e.OId}
                      style={{
                        width: "100%",
                        height: "100%",
                        fontSize: "1.3rem",
                        textAlign: "center",
                        backgroundColor:
                          e.CategoryName == "production"
                            ? "#548c63"
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
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
      </Grid>
      <hr />
    </Fragment>
  );
}
