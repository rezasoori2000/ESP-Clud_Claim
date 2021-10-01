import React, { Fragment, useState } from "react";
import {
  Card,
  Grid,
  Input,
  InputAdornment,
  Switch,
  InputLabel,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgressWithLabel from "./../../components/controls/CircularProgressWithLabel";
import CheckIcon from "@mui/icons-material/Check";
import { Button, IconButton } from "@material-ui/core";
import FullScreenDialog from "../../components/controls/FullScreenDialog";
import Hidden from "@material-ui/core/Hidden";

const ProductionBoardPage = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [note, setNote] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [jobs, setJobs] = useState(props.jobs);
  const [wt, setWt] = useState(true);
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
  function getMobileWorkTypes(wts) {
    var len = wts.length;
    var obj = "<table style='border: 1px solid #b0b0b0;width:100%'>";

    var chuncked = chunkArray(wts, 4);
    for (var i = 0; i < chuncked.length; i++) {
      obj += "<tr>";
      for (var j = 0; j < chuncked[i].length; j++) {
        obj += `<td style='border: 1px solid #b0b0b0'>${chuncked[i][j].Name}</td>`;
      }
      obj += `</tr><tr>`;

      for (var j = 0; j < chuncked[i].length; j++) {
        var value = chuncked[i][j].Progress;
        obj +=
          value == 100
            ? `<td  style='background-color:green;color:white; border: 1px solid #b0b0b0'>Done</td>`
            : value == 0
            ? `<td  style=' border: 1px solid #b0b0b0'></td>`
            : `<td  style=' border: 1px solid #b0b0b0'>${value}%</td>`;
      }
      obj += `</tr>`;
    }
    obj += "</table>";
    return obj;
  }
  return (
    <div style={{ width: "99%" }}>
      <Grid container spacing={5}>
        <Hidden only={["xs"]}>
          <Grid item lg={10} sm={6} xs={12}>
            <h1>Production&nbsp;Board</h1>
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
                jobs[0].WorkTypes.map((w) => <th>{w.Name}</th>)}
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
                    e.WorkTypes.map((w) => (
                      <td>
                        {w.Progress == 100 ? (
                          <CheckIcon />
                        ) : w.Progress == 0 ? (
                          <span></span>
                        ) : (
                          <CircularProgressWithLabel value={w.Progress} />
                        )}
                      </td>
                    ))}
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
                  {e && e.WorkTypes && wt && (
                    <td
                      colSpan="5"
                      dangerouslySetInnerHTML={{
                        __html: getMobileWorkTypes(e.WorkTypes),
                      }}
                    />
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
