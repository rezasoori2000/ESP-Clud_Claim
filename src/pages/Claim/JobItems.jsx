import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Slider from "@material-ui/core/Slider";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles, fade } from "@material-ui/core/styles";

const AirbnbSlider = withStyles({
  root: {
    color: "#990303",
    height: 3,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  valueLabel: {
    left: "calc(-50% + 8px)",
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      {/* //     <span className="bar" />
    //     <span className="bar" />
    //     <span className="bar" /> */}
    </span>
  );
}

const styles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
});
class JobItems extends React.Component {
  constructor(props) {
    super();

    this.state = {
      jobItems: props.items,
      changed: props.items.some((x) => x.Progress100 !== x.Main_Progress100),
      groupPercent: 0,
    };
  }
  mainJobItems = () => [];
  componentWillMount() {
    this.setState({
      groupPercent: this.groupSliderValue(),
    });
    this.mainJobItems = this.state.jobItems;
  }
  componentDidMount() {}
  checkChange = (item) => {
    for (var i = 0; i < item.length; i++) {
      if (item[i].Progress100 !== item[i].Main_Progress100) {
        return true;
      }
    }
    return false;
  };
  handleChange = (val, inx) => {
    const items = this.state.jobItems;
    if (val >= items[inx].Main_Progress100 && val <= 100)
      items[inx].Progress100 = parseInt(val);
    var changed = this.checkChange(items);

    this.setState({
      ...this.state,
      jobItems: items,
      changed,
      groupPercent: this.groupSliderValue(),
    });
  };
  handleBtn = (val, inx) => {
    let items = this.state.jobItems;
    if (!items[inx].Progress100) items[inx].Progress100 = 0;
    if (items[inx].Progress100 + val >= items[inx].Main_Progress100) {
      if (items[inx].Progress100 + val > 100) {
        items[inx].Progress100 = 100;
      } else {
        items[inx].Progress100 = items[inx].Progress100 + val;
      }
      var changed = this.checkChange(items);
      this.setState({
        ...this.state,
        jobItems: items,
        changed,
      });
    }
  };
  handleComplete = (inx) => {
    let items = this.state.jobItems;

    items[inx].Progress100 = 100;

    var changed = this.checkChange(items);
    this.setState({
      ...this.state,
      jobItems: items,
      changed,
    });
  };
  searchJobItem = (e) => {
    console.log(e.target.value);

    var jItems =
      e.target.value.length > 0
        ? this.mainJobItems.filter((t) =>
            t.Name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        : this.mainJobItems;

    this.setState({
      ...this.state,
      jobItems: jItems,
    });
  };
  handleGroupedChanged(v) {
    if (v > 100 || v < 0) return false;
    const items = this.state.jobItems;
    this.state.jobItems.map((e, i) => {
      if (items[i].Main_Progress100 <= v) items[i].Progress100 = v;
    });
    var changed = items.some((e) => e.Progress100 !== e.Main_Progress100);
    this.setState({
      ...this.state,
      jobItems: items,
      groupPercent: v,
      changed,
    });
  }
  groupSliderValue() {
    var val =
      this.state.jobItems.length > 0
        ? Math.round(
            this.state.jobItems
              .map((e) => e.Progress100)
              .reduce((a, b) => a + b) / this.state.jobItems.length
          )
        : 0;
    return val;
  }
  render() {
    const { classes } = this.props;
    function valuetext(value) {
      return `${value}%`;
    }
    return (
      <Fragment>
        <Grid container spacing={2}>
          <Grid
            ml={0}
            item
            lg={12}
            sm={12}
            xs={12}
            style={{ textAlign: "right" }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                this.props.handleBack(2);
              }}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
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
                onChange={this.searchJobItem}
              />
            </div>
          </Grid>
        </Grid>

        <Card>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!this.state.changed}
              startIcon={<SaveIcon />}
              onClick={() => this.props.handleSave(this.state.jobItems)}
            >
              Save
            </Button>
          </CardActions>
          <CardContent>
            <Table aria-label="customized table">
              <TableBody>
                {this.state.jobItems && this.state.jobItems.length > 1 && (
                  <TableRow
                    hover="true"
                    m={10}
                    style={{
                      backgroundColor: "#eee",
                    }}
                  >
                    <TableCell
                      style={{ width: "100%", marginButtm: "40px!important" }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} lg={1}>
                          All Items
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                          <AirbnbSlider
                            ThumbComponent={AirbnbThumbComponent}
                            aria-label="ios slider"
                            value={this.state.groupPercent}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="on"
                            step={5}
                            marks
                            min={0}
                            max={100}
                            // onChangeCommitted={(e, val) =>
                            //   this.handleGroupedChanged(val)
                            // }
                            onChange={(e, val) =>
                              this.handleGroupedChanged(val)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={2}>
                          <OutlinedInput
                            value={this.state.groupPercent}
                            onChange={(event) =>
                              this.handleGroupedChanged(event.target.value)
                            }
                            type="number"
                            name={`pgs-kir`}
                            key={1}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={4} sm={4} lg={1}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              this.handleGroupedChanged(
                                this.state.groupPercent - 5
                              )
                            }
                            startIcon={<RemoveIcon />}
                          ></Button>
                        </Grid>
                        <Grid item xs={4} sm={4} lg={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              this.handleGroupedChanged(
                                this.state.groupPercent + 5
                              )
                            }
                            startIcon={<AddIcon />}
                          ></Button>
                        </Grid>
                        <Grid item xs={4} sm={4} lg={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: "#009688" }}
                            onClick={() => this.handleGroupedChanged(100)}
                          >
                            100%
                          </Button>
                        </Grid>
                      </Grid>
                      <br />
                      <hr />
                      <br />
                      <br />
                    </TableCell>
                  </TableRow>
                )}
                {this.state.jobItems &&
                  this.state.jobItems.map((e, inx) => (
                    <TableRow hover="true">
                      <TableCell style={{ width: "100%" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} lg={1}>
                            {e.Name}
                          </Grid>
                          <Grid item xs={12} sm={12} lg={6}>
                            <AirbnbSlider
                              ThumbComponent={AirbnbThumbComponent}
                              aria-label="ios slider"
                              value={e.Progress100}
                              getAriaValueText={valuetext}
                              aria-labelledby="discrete-slider"
                              valueLabelDisplay="on"
                              step={5}
                              marks
                              min={0}
                              max={100}
                              onChangeCommitted={(e, val) =>
                                this.handleChange(val, inx)
                              }
                              onChange={(e, val) => this.handleChange(val, inx)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} lg={2}>
                            <OutlinedInput
                              value={e.Progress100 || ""}
                              onChange={(event) =>
                                this.handleChange(event.target.value, inx)
                              }
                              type="number"
                              name={`pgs-${e.name}`}
                              key={inx}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={4} sm={4} lg={1}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleBtn(-5, inx)}
                              startIcon={<RemoveIcon />}
                            ></Button>
                          </Grid>
                          <Grid item xs={4} sm={4} lg={1}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.handleBtn(5, inx)}
                              startIcon={<AddIcon />}
                            ></Button>
                          </Grid>
                          <Grid item xs={4} sm={4} lg={1}>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ backgroundColor: "#009688" }}
                              onClick={() => this.handleComplete(inx)}
                            >
                              100%
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!this.state.changed}
              startIcon={<SaveIcon />}
              onClick={() => this.props.handleSave(this.state.jobItems)}
            >
              Save
            </Button>
            {/* {this.props.canClaimWholeJob && (
              <Button
                variant="contained"
                style={{ backgroundColor: "#009688" }}
                size="large"
                onClick={() => this.props.handleSave(null, true)}
                startIcon={<DoneAllIcon />}
              >
                Full&nbsp;job
              </Button>
            )} */}
          </CardActions>
        </Card>
      </Fragment>
    );
  }
}
//export default JobItems;
export default withStyles(styles, { withTheme: true })(JobItems);
