import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ESPSelect from "../../components/controls/ESPSelect";
import ESPTextField from "../../components/controls/ESPTextField";
import ESPCheckbox from "../../components/controls/ESPCheckbox";
import CardHeader from "@material-ui/core/CardHeader";
import { Avatar } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@material-ui/core/FormControl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AdminSettingsPage = (props) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        minWidth: 275,
        display: "flex",
        flexWrap: "wrap",
      },

      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "25ch",
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      saveBtn: {
        marginTop: 40,
      },
      saveBtnTop: {
        marginTop: 10,
      },
    })
  );

  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    props.adminSettings.Groups !== undefined && (
      <div>
        <Card>
          <Grid container spacing={3}>
            <Grid item lg={10}>
              <CardHeader
                title="Database Settings"
                subheader="ESP database connection settings "
                avatar={
                  <Avatar
                    aria-label="recipe"
                    style={{ backgroundColor: "blue" }}
                  >
                    {" "}
                    D{" "}
                  </Avatar>
                }
              />
            </Grid>
            <Grid item lg={2}>
              <Button
                variant="contained"
                color="primary"
                className={classes.saveBtnTop}
                size="medium"
                onClick={props.onSave}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>

          <CardContent></CardContent>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={6}>
                <TextField
                  id="ServerAddress"
                  label="DB Server"
                  style={{ margin: 8 }}
                  disabled
                  placeholder="DB Server"
                  helperText="Database Server Address"
                  fullWidth
                  margin="normal"
                  value={props.adminSettings.ServerAddress || ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="Username"
                  label="Login"
                  style={{ margin: 8 }}
                  disabled
                  placeholder="Login"
                  value={props.adminSettings.Username || ""}
                  helperText="Database Username"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  id="DatabaseName"
                  label="DB Name"
                  style={{ margin: 8 }}
                  disabled
                  placeholder="Database Name"
                  helperText="Database Name"
                  fullWidth
                  value={props.adminSettings.DatabaseName || ""}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="Password"
                  label="Password"
                  style={{ margin: 8 }}
                  disabled
                  value={props.adminSettings.Password || ""}
                  placeholder="Placeholder"
                  helperText="Database password"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <hr />
        <Card>
          <CardHeader
            title="General Settings"
            subheader="Job Claim section settings "
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "blue" }}>
                {" "}
                G{" "}
              </Avatar>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={6}>
                <ESPSelect
                  disabled
                  name="Factories"
                  label="Default Factory"
                  helptext="Name of default Factory"
                  items={props.adminSettings.Factories}
                  onPropertyChange={props.onSelectChange}
                />
                {/* <ESPCheckbox
                name="MultipleJobs"
                label="Enable Multiple Jobs"
                checked={props.adminSettings.MultipleJobs}
                onPropertyChange={props.onPropertyChange}
              /> */}
                <ESPCheckbox
                  name="AllowClaimingOutOfFactoryWork"
                  label="Allow claiming on Out of Factory work"
                  checked={props.adminSettings.AllowClaimingOutOfFactoryWork}
                  onPropertyChange={props.onPropertyChange}
                />
                <ESPTextField
                  name="IncrementPercentage"
                  label="Increment"
                  helptext="Percentage (%) increment"
                  type="number"
                  onPropertyChange={props.onPropertyChange}
                  value={props.adminSettings.IncrementPercentage}
                />
                <ESPSelect
                  name="ShowingCode"
                  label="Show Quote Number"
                  helptext="Show V6 Quote Number/ESP Code on Job"
                  items={props.adminSettings.ShowingCode}
                  onPropertyChange={props.onSelectChange}
                />

                <Grid container>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="TrackLateLogin"
                      label="Track late login"
                      checked={props.adminSettings.TrackLateLogin}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={9}>
                    <ESPTextField
                      name="LateAllowance"
                      label="Late Login Min"
                      helptext="Number of minutes allowed for late login"
                      type="number"
                      value={props.adminSettings.LateAllowance}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={6}>
                {/* <ESPSelect
                name="Groups"
                label="Default Groups"
                helptext="Select Groups for claim"
                items={props.adminSettings.Groups}
                onPropertyChange={props.onSelectChange}
              /> */}
                <FormControl
                  fullWidth
                  variant="outlined"
                  style={{ marginBottom: 20 }}
                >
                  Select Groups for claim
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="Groups"
                    value={props.adminSettings.Groups.filter(
                      (x) => x.Selected
                    ).map((i) => i.Text)}
                    onChange={(e) => props.onGroupsSelectChange(e)}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {props.adminSettings.Groups.map((item) => (
                      <MenuItem key={item.Text} value={item.Text}>
                        <Checkbox checked={item.Selected} />
                        <ListItemText primary={item.Text} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <ESPCheckbox
                name="ScheduledJobs"
                label="Show Scheduled Jobs After Claim"
                checked={props.adminSettings.ScheduledJobs}
                onPropertyChange={props.onPropertyChange}
              /> */}
                <ESPSelect
                  name="JobListOrdering"
                  label="Job List Order"
                  helptext="Order Showed in Job List Page"
                  items={props.adminSettings.JobListOrdering}
                  onPropertyChange={props.onSelectChange}
                />
                {/* <ESPCheckbox
                name="CanFinishWholeJob"
                label="Enable Finish Whole Job feature"
                checked={props.adminSettings.CanFinishWholeJob}
                onPropertyChange={props.onPropertyChange}
              /> */}
                <Grid container>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="TrackEarlyLeave"
                      label="Track early leave"
                      checked={props.adminSettings.TrackEarlyLeave}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={9}>
                    <ESPTextField
                      name="EarlyLeaveAllowance"
                      label="Early Leave Min"
                      helptext="Number of minutes allowed for early leave"
                      type="number"
                      value={props.adminSettings.EarlyLeaveAllowance}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <ESPCheckbox
                      name="ShowStandardTime"
                      label="Show Standard Time"
                      checked={props.adminSettings.ShowStandardTime}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>

                  <Grid item lg={12}>
                    <ESPTextField
                      name="NoClaimAllowance"
                      label="No Claim Allowance"
                      helptext="Seconds No Claim Allowance Before Logout. (Zero= disable)"
                      type="number"
                      value={props.adminSettings.NoClaimAllowance}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item lg={4}>
                  <ESPCheckbox
                    name="HidePreProductionJobs"
                    label="Hide PreProduction Jobs"
                    checked={props.adminSettings.HidePreProductionJobs}
                    onPropertyChange={props.onPropertyChange}
                  />
                </Grid>
                <Grid item lg={4}>
                  <ESPCheckbox
                    name="DividJobs"
                    label="Enable Dividing jobs"
                    checked={props.adminSettings.DividJobs}
                    onPropertyChange={props.onPropertyChange}
                  />
                </Grid>
                <Grid item lg={4}>
                  <ESPCheckbox
                    name="TrackNotLoggedOut"
                    label="Alert not logged out worker"
                    checked={props.adminSettings.TrackNotLoggedOut}
                    onPropertyChange={props.onPropertyChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <hr />

        <Card>
          <CardHeader
            title="Production Board"
            subheader="Production Board Section Settings"
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "blue" }}>
                {" "}
                P{" "}
              </Avatar>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={8}>
                <Grid container>
                  <Grid item lg={4}>
                    <ESPCheckbox
                      name="PBShowProductionBoard"
                      label="Enable Production Board"
                      checked={props.adminSettings.PBShowProductionBoard}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <ESPCheckbox
                      name="PBHideOutOfFactoryWorkTypes"
                      label="Hide Out of Factory WorkTypes"
                      checked={props.adminSettings.PBHideOutOfFactoryWorkTypes}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <ESPCheckbox
                      name="ClaimOnPB"
                      label="Claim on Production Board"
                      checked={props.adminSettings.ClaimOnPB}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item lg={12}>
                    <label>Extra Columns</label>
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="PBTitleColumn"
                      label="Title"
                      checked={props.adminSettings.PBTitleColumn}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="PBCustomerColumn"
                      label="Customer"
                      checked={props.adminSettings.PBCustomerColumn}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="PBHourColumn"
                      label="Hours"
                      checked={props.adminSettings.PBHourColumn}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="PBDueDateColumn"
                      label="Due Date"
                      checked={props.adminSettings.PBDueDateColumn}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="ShowRework"
                      label="Show Rework"
                      checked={props.adminSettings.ShowRework}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="ShowColour"
                      label="Show Colour"
                      checked={props.adminSettings.ShowColour}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="ShowQty"
                      label="Show Unit Qty"
                      checked={props.adminSettings.ShowQty}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="ShowSalesPerson"
                      label="Show SalesPerson"
                      checked={props.adminSettings.ShowSalesPerson}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <ESPCheckbox
                      name="ShowEstimator"
                      label="Show Estimator"
                      checked={props.adminSettings.ShowEstimator}
                      onPropertyChange={props.onPropertyChange}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item lg={3}>
                <ESPSelect
                  name="PBJobOrders"
                  label="Job Order"
                  helptext="Listing Job Order"
                  items={props.adminSettings.PBJobOrders}
                  onPropertyChange={props.onSelectChange}
                />
              </Grid>
              <Grid item lg={1}>
                <ESPCheckbox
                  name="Z2A"
                  label="Z to A"
                  checked={props.adminSettings.Z2A}
                  onPropertyChange={props.onPropertyChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <hr />

        <Card>
          <CardHeader
            title="Performance Statistics"
            subheader="Performance Statistics Section Settings"
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "blue" }}>
                {" "}
                S{" "}
              </Avatar>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={6}>
                <ESPCheckbox
                  name="PSShowPerformanceStates"
                  label="Enable Performance Stats"
                  checked={props.adminSettings.PSShowPerformanceStates}
                  onPropertyChange={props.onPropertyChange}
                />
                <ESPSelect
                  name="PSStatisticChart"
                  label="Statistic Chart Type"
                  helptext=""
                  items={props.adminSettings.PSStatisticChart}
                  onPropertyChange={props.onSelectChange}
                />
              </Grid>

              <Grid item lg={6}>
                <ESPCheckbox
                  name="PSEnableIndividual"
                  label="Enable Individual Performance Stats"
                  checked={props.adminSettings.PSEnableIndividual}
                  onPropertyChange={props.onPropertyChange}
                />
                <ESPSelect
                  name="PSStatisticGroup"
                  label="Statistic Group"
                  helptext=""
                  items={props.adminSettings.PSStatisticGroup}
                  onPropertyChange={props.onSelectChange}
                />
              </Grid>
              <Grid item lg={5}>
                <ESPSelect
                  name="PSPerformanceChart"
                  label="Performance Chart Duration"
                  helptext=""
                  items={props.adminSettings.PSPerformanceChart}
                  onPropertyChange={props.onSelectChange}
                />
              </Grid>
              <Grid item lg={5}></Grid>
              <Grid item lg={2} mx="auto">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.saveBtn}
                  size="medium"
                  onClick={props.onSave}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default AdminSettingsPage;
