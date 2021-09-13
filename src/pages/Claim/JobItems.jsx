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
import Helper from "../../components/logics/Helper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

const AirbnbSlider = withStyles({
  root: {
    color: "#196dc4",
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
      boxShadow: "#eee 0 2px 3px 1px",
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
    color: "#eee",
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
      //groupPercent: this.groupSliderValue(),
      groupPercent: this.props.totalProgress,
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
        items[inx].Progress100 = this.roundNumber(
          items[inx].Progress100 + val,
          items[inx].Progress100
        );
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
  roundNumber(v, g) {
    return v > g
      ? v % 5 == 0
        ? v
        : Math.ceil((v - 4) / 5) * 5
      : v % 5 == 0
      ? v
      : Math.floor((v + 4) / 5) * 5;
  }
  handleGroupedChanged(v, btn = false) {
    if (v > 100 || v < 0) return false;
    const items = this.state.jobItems;
    v = btn ? this.roundNumber(v, this.state.groupPercent) : v;

    this.state.jobItems
      .filter((x) => x.Main_Progress100 <= v)
      .map((e, i) => {
        //if (items[i].Main_Progress100 <= v) {
        items.find((x) => x.OId == e.OId).Progress100 = v;
        //}
      });
    this.state.jobItems
      .filter((x) => x.Main_Progress100 > v)
      .map((e, i) => {
        //if (items[i].Main_Progress100 <= v) {
        items.find((x) => x.OId == e.OId).Progress100 = e.Main_Progress100;
        //}
      });

    var changed = items.some((e) => e.Progress100 !== e.Main_Progress100);
    this.setState({
      ...this.state,
      jobItems: items,
      groupPercent: v,
      changed,
    });
  }
  handleChanged(v) {
    if (v > 100 || v < 0) return false;

    //const items = this.state.jobItems;
    // this.state.jobItems.map((e, i) => {
    //   if (items[i].Main_Progress100 <= v) items[i].Progress100 = v;
    // });
    //  var changed = items.some((e) => e.Progress100 !== e.Main_Progress100);
    this.setState({
      ...this.state,
      //    jobItems: items,
      groupPercent: v,
      //   changed,
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

    var allItemsV6 = this.state.jobItems
      .map((e) => e.StdTime)
      .reduce(function (a, b) {
        return a + b;
      }, 0);
    function valuetext(value) {
      return `${value}%`;
    }
    return (
      <Fragment>
        <Card style={{ backgroundColor: "#ebedf1" }}>
          <CardContent>
            <Table aria-label="customized table">
              <TableBody>
                <TableRow>
                  <TableCell colSpan="2">
                    <Grid container spacing={2}>
                      <Grid ml={0} item lg={1} sm={4} xs={3}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ textAlign: "right" }}
                          onClick={() => {
                            this.props.handleBack(2);
                          }}
                          startIcon={<ArrowBack />}
                        ></Button>
                      </Grid>
                      <Grid item lg={7} sm={4} xs={5}>
                        <span style={{ fontSize: "24px", marginTop: "30px" }}>
                          <b>Job&nbsp;Items</b>
                        </span>
                      </Grid>

                      <Grid item lg={3} sm={8} xs={8}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                          Search
                        </InputLabel>
                        <Input
                          id="input-with-icon-adornment"
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          }
                          onChange={this.props.searchJobItem}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={1}
                        sm={4}
                        xs={4}
                        style={{
                          justifyContent: "flex-end",

                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          disabled={!this.state.changed}
                          backgroundColor="#fff"
                          startIcon={<SaveIcon />}
                          onClick={() =>
                            this.props.handleSave(this.state.jobItems)
                          }
                        >
                          Claim
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                {this.props.finishedItems &&
                  this.props.finishedItems.length > 0 && (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          <b>Completed Items</b>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableRow hover="true" m={1}>
                          <TableCell
                            style={{
                              width: "100%",
                              marginButtm: "40px!important",
                            }}
                          >
                            <ul>
                              {this.props.finishedItems.map((e, inx) => (
                                <li>{e}</li>
                              ))}
                            </ul>
                          </TableCell>
                        </TableRow>
                      </AccordionDetails>
                    </Accordion>
                  )}
                {this.state.jobItems && this.state.jobItems.length >= 1 && (
                  <TableRow
                    hover="true"
                    m={1}
                    style={{
                      backgroundColor: "#eee",
                    }}
                  >
                    <TableCell
                      style={{ width: "100%", marginButtom: "40px!important" }}
                      colSpan="2"
                    >
                      {this.props.jobLevel && (
                        <div>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} lg={2}>
                              All Items{" "}
                              {this.props.settings.ShowStandardTime &&
                                " (" +
                                  Helper.timeConvert(
                                    Math.round(allItemsV6 / 60)
                                  ) +
                                  ")"}
                            </Grid>
                            <Grid item xs={12} sm={12} lg={5}>
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
                                onChangeCommitted={(e, val) =>
                                  this.handleGroupedChanged(val)
                                }
                                onChange={(e, val) => this.handleChanged(val)}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={2}>
                              <OutlinedInput
                                value={this.state.groupPercent}
                                onChange={(event) =>
                                  this.handleGroupedChanged(event.target.value)
                                }
                                type="number"
                                name={`pgs`}
                                key={1}
                                fullWidth
                              />
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              sm={4}
                              lg={1}
                              style={{ textAlign: "right" }}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  this.handleGroupedChanged(
                                    parseInt(this.state.groupPercent) - 5,
                                    true
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
                                    parseInt(this.state.groupPercent) + 5,
                                    true
                                  )
                                }
                                startIcon={<AddIcon />}
                              ></Button>
                            </Grid>
                            <Grid item xs={4} sm={4} lg={1}>
                              <Button
                                variant="contained"
                                color="#196dc4"
                                border="#196dc4"
                                backgroundColor="#fff"
                                onClick={() => this.handleGroupedChanged(100)}
                              >
                                100%
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
                {this.props.jobLevel !== true &&
                  this.state.jobItems &&
                  this.state.jobItems.map((e, inx) => (
                    <TableRow hover="true">
                      <TableCell style={{ width: "100%" }} colSpan="2">
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={2}
                            style={{ marginTop: "20px" }}
                          >
                            {e.ItemNumber}-{e.Name}
                            {this.props.settings.ShowStandardTime &&
                              "(" +
                                Helper.timeConvert(Math.round(e.StdTime / 60)) +
                                ")"}
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={5}
                            style={{ marginTop: "20px" }}
                          >
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
                          <Grid
                            item
                            xs={4}
                            sm={4}
                            lg={1}
                            style={{ textAlign: "right" }}
                          >
                            <IconButton
                              aria-label="remove"
                              onClick={() => this.handleBtn(-5, inx)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={4} sm={4} lg={1}>
                            <IconButton
                              aria-label="add"
                              onClick={() => this.handleBtn(5, inx)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Grid>
                          <Grid item xs={4} sm={4} lg={1}>
                            <Button
                              borderRadius="5%"
                              variant="contained"
                              style={{
                                backgroundColor: "white",
                                color: "#196dc4",
                                borderRadius: "5%",
                                border: "1px solid #196dc4",
                              }}
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
          <CardActions
            style={{ justifyContent: "flex-end", marginRight: "20px" }}
          >
            <Button
              variant="contained"
              size="small"
              disabled={!this.state.changed}
              backgroundColor="#fff"
              startIcon={<SaveIcon />}
              onClick={() => this.props.handleSave(this.state.jobItems)}
            >
              Claim
            </Button>
          </CardActions>
        </Card>
      </Fragment>
    );
  }
}
//export default JobItems;
export default withStyles(styles, { withTheme: true })(JobItems);
