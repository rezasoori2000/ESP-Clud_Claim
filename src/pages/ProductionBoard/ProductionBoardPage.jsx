import React, { Fragment, useState } from "react";
import {
  Card,
  Grid,
  Input,
  InputAdornment,
  Switch,
  InputLabel,
} from "@material-ui/core";
import { PieChart } from "react-minimal-pie-chart";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from "@material-ui/icons/Search";

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
import transitions from "@material-ui/core/styles/transitions";

const ProductionBoardPage = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [note, setNote] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [jobs, setJobs] = useState(props.jobs);
  const [wt, setWt] = useState(true);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(true);

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
    fontSize: "20px",
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

  function beginTr(wts) {
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
                <PieChart
                  data={section[j].ChartObj.filter((x) => x.value > 0)}
                  radius={PieChart.defaultProps.radius - 10}
                  segmentsShift={(index) => (index === 0 ? 10 : 0.5)}
                  label={({ dataEntry }) => dataEntry.value}
                  labelStyle={{
                    ...defaultLabelStyle,
                  }}
                />
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
    <div style={{ width: "99%" }}>
      <Grid container spacing={5}>
        <Hidden only={["xs"]}>
          <Grid item lg={2} sm={6} xs={12}>
            <h1>Production&nbsp;Board</h1>
          </Grid>
          <Grid item lg={8} sm={6} xs={12}>
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
              </tbody>
            </table>
          </Grid>
        </Hidden>

        <Grid item lg={2} sm={6} xs={7}>
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
        <Hidden only={["lg", "xl", "md"]}>
          <Grid item xs={5}>
            <InputLabel htmlFor="input-with-icon-adornment">
              Show W/T
            </InputLabel>
            <Switch
              color="secondary"
              style={{ color: "#9abf47" }}
              checked={wt}
              onChange={(s) => {
                setWt(s.target.checked);
              }}
            />
          </Grid>
        </Hidden>
      </Grid>
      <Hidden only={["xs"]}>
        <table>
          <thead>
            <tr>
              <th xs={2}>Code</th>
              <th xs={4}>Customer</th>
              <th xs={5}>Title</th>
              <th xs={1}>Prog.</th>
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
                >
                  <td>
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
                  <td>{e.Customer}</td>
                  <td
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
                  <td>{e.Progress}%</td>
                  {e.WorkTypes &&
                    e.WorkTypes.map((w) =>
                      w.Progress == 100 ? (
                        <td>
                          <CheckIcon />
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
                            <td>
                              <PieChart
                                data={w.ChartObj.filter((x) => x.value > 0)}
                                radius={PieChart.defaultProps.radius - 10}
                                segmentsShift={(index) =>
                                  index === 0 ? 10 : 0.5
                                }
                                label={({ dataEntry }) => dataEntry.value}
                                onMouseOver={() => {}}
                                labelStyle={{
                                  ...defaultLabelStyle,
                                }}
                              />
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
                  <td colSpan="4">{e.Customer}</td>
                </tr>
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
                <tr>
                  {/* {e && e.WorkTypes && wt && (
                    <td
                      colSpan="5"
                      dangerouslySetInnerHTML={{
                        __html: getMobileWorkTypes(e.WorkTypes),
                      }}
                    />
                  )} */}
                  {e.WorkTypes && wt && (
                    <Fragment>{beginTr(e.WorkTypes)}</Fragment>
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
  );
};
export default ProductionBoardPage;
