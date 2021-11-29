import React, { Fragment, useState } from "react";
import { Grid, Input, InputAdornment, InputLabel } from "@material-ui/core";
import { PieChart } from "react-minimal-pie-chart";
import IOSSwitch from "../../components/controls/IosSwitch";
import SearchIcon from "@material-ui/icons/Search";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import CheckIcon from "@mui/icons-material/Check";
import { Button, IconButton } from "@material-ui/core";
import FullScreenDialog from "../../components/controls/FullScreenDialog";
import Hidden from "@material-ui/core/Hidden";

import Tooltip from "@material-ui/core/Tooltip";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Loading from "../loading.js";

const ProductionBoardPage = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [note, setNote] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [jobs, setJobs] = useState(props.jobs);
  const [wt, setWt] = useState(true);
  const [pie, setPie] = useState(false);

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "0.7em",
          color: "yellow",
          backgroundColor: "#eeeeee",
        },
      },
    },
  });
  const defaultLabelStyle = {
    fontSize: "1.8em",
    fontFamily: "sans-serif",
  };
  function searchJobs(event) {
    var txt = event.target.value;
    setsearchVal(txt);
    var filterJobs =
      event.target.value.length > 0
        ? props.jobs.filter(
            (t) =>
              t.Title.toLowerCase().includes(txt.toLowerCase()) ||
              t.Code.includes(txt) ||
              t.Customer.includes(txt)
          )
        : props.jobs;
    setJobs(filterJobs);
  }
  function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    var myChunk = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }
  function getChart() {}
  function beginTr(code, wts) {
    var chuncked = chunkArray(wts, 4);

    var items = [];
    var htd = [];
    var trs = [];
    var element = {};
    for (var i = 0; i < chuncked.length; i++) {
      var section = chuncked[i];
      htd = [];
      for (var j = 0; j < section.length; j++) {
        htd.push(<td>{section[j].Name}</td>);
      }
      trs.push(<tr>{htd}</tr>);
      htd = [];
      for (var j = 0; j < section.length; j++) {
        if (section[j].Progress == 100) element = <CheckIcon />;
        if (section[j].Progress == 0) element = <dir />;
        else {
          element = (
            <MuiThemeProvider theme={theme}>
              <Tooltip
                title={section[j].ChartObj.filter((x) => x.value > 0).map(
                  (t) => (
                    <tr>
                      <td style={{ backgroundColor: t.color }}> </td>
                      <td>
                        <h1> {t.value}</h1>
                      </td>
                    </tr>
                  )
                )}
                placement="top"
              >
                {pie ? (
                  <PieChart
                    data={section[j].ChartObj.filter((x) => x.value > 0)}
                    radius={PieChart.defaultProps.radius - 10}
                    segmentsShift={(index) => (index === 0 ? 10 : 0.5)}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                      ...defaultLabelStyle,
                    }}
                  />
                ) : (
                  <table
                    style={{
                      padding: 0,
                      margin: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <tr>
                      {section[j].ChartObj.filter((x) => x.value > 0).map(
                        (t) => (
                          <td
                            style={{
                              width: t.value,
                              backgroundColor: t.color,
                              fontSize: "0.8em",
                            }}
                          >
                            {t.value}
                          </td>
                        )
                      )}
                    </tr>
                  </table>
                )}
              </Tooltip>
            </MuiThemeProvider>
          );
        }
        htd.push(<td>{element}</td>);
        element = {};
      }
      trs.push(<tr>{htd}</tr>);
      htd = [];
    }
    items.push(<table>{trs}</table>);

    return items;
  }

  return (
    <Fragment>
      <div style={{ width: "99%" }}>
        <Grid container spacing={5}>
          <Hidden only={["xs"]}>
            <Grid item lg={2} sm={6}>
              <h1>Production&nbsp;Board</h1>
            </Grid>
            <Grid item lg={1} sm={6}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Bar/Pie
              </InputLabel>

              <IOSSwitch
                onChange={(e) => {
                  setPie(e.target.checked);
                }}
              />
            </Grid>
            <Grid item lg={4} sm={6}>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#00C400",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>Finished</td>

                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#ffa500",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>High Priority</td>

                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#808080",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>Out Of Factory</td>
                  </tr>
                  <tr>
                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#ffff00",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>Scheduled</td>
                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#d3d3d3",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>Non-scheduled</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Hidden>

          <Grid item lg={2} sm={6} xs={6}>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              value={searchVal}
              onChange={searchJobs}
            />
          </Grid>
          <Grid item xs={6} lg={2} md={4}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => props.logoutFromPB()}
              startIcon={<MeetingRoomIcon />}
            >
              Logout
            </Button>
          </Grid>
          <Hidden only={["lg", "xl", "md"]}>
            <Grid item xs={4}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Show W/T
              </InputLabel>

              <IOSSwitch
                checked={wt}
                onChange={(s) => {
                  setWt(s.target.checked);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Pie/Bar
              </InputLabel>

              <IOSSwitch
                onChange={(e) => {
                  setPie(e.target.checked);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#00C400",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>Finished</td>

                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#ffa500",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>High Priority</td>

                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#808080",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>Out Of Factory</td>
                  </tr>
                  <tr>
                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#ffff00",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>Scheduled</td>
                    <td style={{ width: "10%" }}>
                      <div
                        style={{
                          backgroundColor: "#d3d3d3",
                          float: "left",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <span>&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </td>
                    <td>Non-scheduled</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Hidden>
        </Grid>
        <Hidden only={["xs"]}>
          <table id="pbDesktop">
            <thead>
              <tr>
                <th xs={2}>Code</th>
                {props.settings.PBCustomerColumn && <th>Customer</th>}
                {props.settings.PBTitleColumn && <th>Title</th>}
                {props.settings.PBHourColumn && <th>Hours</th>}
                {props.settings.PBDueDateColumn && <th>Due Date</th>}
                {props.settings.ShowQty && <th>Unit Qty</th>}
                {props.settings.ShowSalesPerson && <th>SalesPerson</th>}
                {props.settings.ShowEstimator && <th>Estimator</th>}
                {props.settings.ShowColour && <th>Colour</th>}
                <th>Prog.</th>
                {jobs &&
                  jobs[0] &&
                  jobs[0].WorkTypes &&
                  jobs[0].WorkTypes.map((w) => (
                    <th style={{ minWidth: "65px" }}>{w.Name}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {jobs &&
                jobs.map((e, i) => (
                  <tr
                    style={{
                      backgroundColor: `${i % 2 == 0 ? "#fff" : "#fafafa"}`,
                    }}
                    className="border-bottom"
                  >
                    <td>
                      {e.Comments.length > 0 && (
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ textAlign: "right", color: "#196dc4" }}
                          onClick={(w) => {
                            setNote(e.Comments);
                            setOpenDialog(true);
                          }}
                        >
                          <span style={{ textDecoration: "underline" }}>
                            {" "}
                            {e.Code}
                          </span>
                        </Button>
                      )}
                      {e.Comments.length == 0 && e.Code}
                    </td>
                    {props.settings.PBCustomerColumn && <td>{e.Customer}</td>}
                    {props.settings.PBTitleColumn && (
                      <td
                        className="border-bottom"
                        style={{
                          backgroundColor: `${
                            e.TitleBackgroundColor !== ""
                              ? e.TitleBackgroundColor
                              : i % 2 == 0
                              ? "#fff"
                              : "#fafafa"
                          }`,
                          color: `${e.TitleColor}`,
                        }}
                      >
                        {e.Title}
                      </td>
                    )}
                    {props.settings.PBHourColumn && <td>{e.Hours}</td>}
                    {props.settings.PBDueDateColumn && <td>{e.Due}</td>}
                    {props.settings.ShowQty && <td>{e.UnitQty}</td>}
                    {props.settings.ShowSalesPerson && <td>{e.SalesPerson}</td>}
                    {props.settings.ShowEstimator && <td>{e.Estimator}</td>}
                    {props.settings.ShowColour && <td>{e.Colour}</td>}
                    <td>{e.Progress}%</td>
                    {e.WorkTypes &&
                      e.WorkTypes.map((w) =>
                        w.Progress == 100 ? (
                          <td
                            style={{
                              margin: 0,
                              padding: 0,
                              verticalAlign: "middle",
                            }}
                          >
                            <CheckIcon />
                          </td>
                        ) : w.Progress == 0 ? (
                          <td
                            style={{
                              margin: 0,
                              padding: 0,
                              verticalAlign: "middle",
                            }}
                            onClick={(r) =>
                              props.settings.ClaimOnPB &&
                              props.claimOnPB(e.Oid, w.Oid, w.JobLevel, e.Code)
                            }
                          >
                            0%
                          </td>
                        ) : (
                          <MuiThemeProvider theme={theme}>
                            <Tooltip
                              title={w.ChartObj.filter((x) => x.value > 0).map(
                                (t) => (
                                  <tr>
                                    <td style={{ backgroundColor: t.color }}>
                                      {" "}
                                    </td>
                                    <td>
                                      <h1> {t.value}</h1>
                                    </td>
                                  </tr>
                                )
                              )}
                              placement="top"
                            >
                              <td
                                style={{
                                  paddingRight: "5px",
                                  paddingLeft: "2px",
                                  verticalAlign: "middle",
                                }}
                                onClick={(r) =>
                                  props.settings.ClaimOnPB &&
                                  props.claimOnPB(
                                    e.Oid,
                                    w.Oid,
                                    w.JobLevel,
                                    e.Code
                                  )
                                }
                              >
                                {pie && (
                                  <PieChart
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      marginLeft: "10px",
                                      fontSize: "1.2em",
                                    }}
                                    data={w.ChartObj.filter((x) => x.value > 0)}
                                    radius={PieChart.defaultProps.radius - 10}
                                    segmentsShift={(index) =>
                                      index === 0 ? 10 : 0.5
                                    }
                                    label={({ dataEntry }) => dataEntry.value}
                                    labelStyle={{
                                      ...defaultLabelStyle,
                                    }}
                                  />
                                )}
                                {!pie && (
                                  <table
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  >
                                    <tr>
                                      {w.ChartObj.filter(
                                        (x) => x.value > 0
                                      ).map((t) => (
                                        <td
                                          style={{
                                            width: t.value,
                                            marginLeft: "3px",
                                            marginRight: "3px",
                                            backgroundColor: t.color,
                                            fontSize: "1.2em",
                                            // padding: "2px",
                                          }}
                                        >
                                          {t.value}
                                        </td>
                                      ))}
                                    </tr>
                                  </table>
                                )}
                              </td>
                            </Tooltip>
                          </MuiThemeProvider>
                        )
                      )}
                  </tr>
                ))}
            </tbody>
          </table>
        </Hidden>
        <Hidden only={["lg", "xl", "md"]}>
          <table style={{ border: "none!important", backgroundColor: "white" }}>
            {jobs &&
              jobs.map((e, i) => (
                <Fragment>
                  <tr>
                    <td colSpan="4">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      {e.Comments.length > 0 && (
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ textAlign: "right" }}
                          onClick={(w) => {
                            setNote(e.Comments);
                            setOpenDialog(true);
                          }}
                        >
                          {e.Code}
                        </Button>
                      )}
                      {e.Comments.length == 0 && e.Code}
                    </td>
                    <td colSpan="1">{e.Progress}%</td>
                  </tr>
                  <tr>
                    {props.settings.PBCustomerColumn && (
                      <td colSpan="4">{e.Customer}</td>
                    )}
                  </tr>
                  {props.settings.PBTitleColumn && (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          backgroundColor: `${
                            e.TitleBackgroundColor !== ""
                              ? e.TitleBackgroundColor
                              : i % 2 == 0
                              ? "#fff"
                              : "#fafafa"
                          }`,
                          color: `${e.TitleColor}`,
                        }}
                      >
                        {e.Title}
                      </td>
                    </tr>
                  )}
                  {props.settings.PBDueDateColumn && (
                    <tr>
                      <td colSpan="1">Due:</td>
                      <td colSpan="3">{e.Due}</td>
                    </tr>
                  )}
                  {props.settings.PBHourColumn && (
                    <tr>
                      <td colSpan="1">Hours:</td>
                      <td colSpan="3">{e.Hours}</td>
                    </tr>
                  )}

                  <tr>
                    {e.WorkTypes && wt && (
                      <td
                        onClick={(r) =>
                          props.settings.ClaimOnPB &&
                          props.claimOnPB(e.Oid, wt.Oid, wt.JobLevel, e.Code)
                        }
                        colSpan="4"
                      >
                        {beginTr(e.Code, e.WorkTypes)}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <hr />
                    </td>
                  </tr>
                </Fragment>
              ))}
          </table>
        </Hidden>
        <FullScreenDialog
          header="Job Notes"
          uls={note}
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
        />
      </div>
    </Fragment>
  );
};
export default ProductionBoardPage;
