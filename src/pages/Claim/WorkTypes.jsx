import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import gridSearchStyles from "../../components/controls/Styles";
import { Button, IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import FullScreenDialog from "../../components/controls/FullScreenDialog";
import ArrowBack from "@material-ui/icons/ArrowBack";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import CircularProgressWithLabel from "../../components/controls/CircularProgressWithLabel";
import CancelIcon from "@mui/icons-material/Cancel";
import Hidden from "@material-ui/core/Hidden";
import ClaimLogic from "../../components/logics/ClaimLogic";

export default function Worktypes(props) {
  const classes = gridSearchStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [note, setNote] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setSearchItems] = useState(props.workTypes);
  const [searchVal, setSearcVal] = useState("");

  function searchItems(event) {
    var txt = event.target.value;
    setSearcVal(txt);
    var workTypes =
      event.target.value.length > 0
        ? props.workTypes.filter((t) =>
            t.Name.toLowerCase().includes(txt.toLowerCase())
          )
        : props.workTypes;

    setSearchItems(workTypes);
  }
  function clearSearch() {
    setSearchItems([]);
    setSearchItems(props.workTypes);
    setSearcVal("");
  }
  function handleWorktypeNoteClicked(id, code, route) {
    const response = ClaimLogic.GetClaimedByAPI(code, id, route);
    response.then((e) => {
      setNote(JSON.parse(e.data));
      setOpenDialog(true);
    });
  }
  return (
    <Fragment>
      <Card style={{ backgroundColor: "#fff" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid ml={0} item lg={1} sm={4} xs={4}>
              <Button
                variant="outlined"
                size="small"
                style={{ textAlign: "right" }}
                onClick={() => {
                  props.handleBack(1);
                }}
                startIcon={<ArrowBack />}
              ></Button>
            </Grid>
            <Grid item lg={7} sm={4} xs={4}>
              <span style={{ fontSize: "22px", marginTop: "30px" }}>
                <b>
                  Work&nbsp;Type{" "}
                  {props.menuIsOpen ? "" : " (" + props.claimingName + ")"}{" "}
                </b>
              </span>
            </Grid>
            <Hidden only={["xl", "lg", "md"]}>
              <Grid
                ml={0}
                item
                lg={1}
                sm={4}
                xs={4}
                style={{ textAlign: "right" }}
              >
                {/* <Button
                  variant="outlined"
                  size="small"
                  onClick={props.handleFullJob}
                  startIcon={<PlaylistAddCheckIcon />}
                >
                  FullJob
                </Button> */}
              </Grid>
            </Hidden>
            <Grid item lg={3} sm={12} xs={12}>
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                id="worktypeSearchVal"
                placeholder="Search"
                variant="outlined"
                value={searchVal}
                onChange={searchItems}
              />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
                onClick={() => {
                  clearSearch();
                }}
              >
                <CancelIcon />
              </IconButton>
            </Grid>
            <Hidden only={["sm", "xs"]}>
              <Grid ml={0} item lg={1} sm={1} style={{ textAlign: "right" }}>
                {/* <Button
                  variant="outlined"
                  size="small"
                  onClick={props.handleFullJob}
                  startIcon={<PlaylistAddCheckIcon />}
                >
                  FullJob
                </Button> */}
              </Grid>
            </Hidden>
          </Grid>

          <hr />
          <h2>Primary</h2>
          <Grid container spacing={1}>
            {items &&
              items
                .filter(
                  (x) =>
                    x.Progress < 100 && props.primaryWorktypeIds.includes(x.OId)
                )

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
                      className={classes.boxBolding}
                      style={{
                        width: "100%",
                        height: "100%",
                        fontSize: "0.9rem",
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
                      <Grid container>
                        <Grid item lg={6} sm={5} xs={5}>
                          <IconButton color="inherit">
                            <CommentIcon
                              onClick={(w) => {
                                handleWorktypeNoteClicked(
                                  e.OId,
                                  props.jobCode,
                                  props.apiRoute
                                );
                                w.stopPropagation();
                              }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6}>
                          <CircularProgressWithLabel value={e.Progress} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
          </Grid>
          <h2>Secondary</h2>
          <Grid container spacing={1}>
            {items &&
              items
                .filter(
                  (x) =>
                    x.Progress < 100 &&
                    props.secondaryWorktypeIds.includes(x.OId)
                )

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
                      className={classes.boxBolding}
                      style={{
                        width: "100%",
                        height: "100%",
                        fontSize: "0.9rem",
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
                      <Grid container>
                        <Grid item lg={6} sm={5} xs={5}>
                          <IconButton color="inherit">
                            <CommentIcon
                              onClick={(w) => {
                                handleWorktypeNoteClicked(
                                  e.OId,
                                  props.jobCode,
                                  props.apiRoute
                                );
                                w.stopPropagation();
                              }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid item lg={6} sm={6} xs={6}>
                          <CircularProgressWithLabel value={e.Progress} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
          </Grid>
        </CardContent>
        <FullScreenDialog
          header="Claimed By"
          textList={note}
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
        />
      </Card>
    </Fragment>
  );
}
