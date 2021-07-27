import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ESPSelect from "../../components/controls/ESPSelect";
import ESPTextField from "../../components/controls/ESPTextField";
import ESPCheckbox from "../../components/controls/ESPCheckbox";
import CardHeader from "@material-ui/core/CardHeader";
import {
  Avatar,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableContainer,
  TableBody,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Helper from "../../components/logics/Helper";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
class UserManagement extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUsers: [],
      model: {},
      changes: [],
    };
  }
  componentDidMount() {
    this.usermanagementInitData();
  }
  usermanagementInitData = () => {
    Helper.apiPost("Account/InitClaimUserManagement")
      .then((r) => {
        var data = r.data;
        this.setState({
          loginUsers: data.Item1,

          model: {
            Email: "",
            Password: "",
            EspUsers: data.Item2,
            IsAdmin: false,
            IsPublic: false,
            IsDisabled: false,
            EspUserId: "",
          },
        });
      })
      .catch((err) => {
        alert("Error in getting user management Data");
      });
  };
  onSave = () => {
    Helper.apiPost("Account/Register", {
      Email: this.state.model.Email,
      Password: this.state.model.Password,
      ConfirmPassword: this.state.model.Password,
      IsAdmin: this.state.model.IsAdmin,
      IsPublic: this.state.model.IsPublic,
      UserId: this.state.model.EspUserId,
    })
      .then((r) => {
        alert("Successfuly added");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Error in adding user" + err);
      });
  };
  onChangePassword = (id) => {};

  onPropertyChange = (event) => {
    var model = this.state.model;

    let value = "";
    if (event.target.type !== undefined && event.target.type === "checkbox")
      value = event.target.checked;
    else value = event.target.value;

    model[event.target.name] = value;
    this.setState({
      ...this.state,
      model,
    });
  };
  onSelectChange = (event) => {
    var model = this.state.model;
    var newSelectedId = event.target.value;
    let newValues = [];
    model[event.target.name].map((item) => {
      if (item.Value === newSelectedId)
        newValues.push({
          Value: item.Value,
          Text: item.Text,
          Selected: true,
        });
      else
        newValues.push({
          Value: item.Value,
          Text: item.Text,
          Selected: false,
        });
    });

    model[event.target.name] = newValues;
    model["EspUserId"] = newSelectedId;
    this.setState({
      ...this.state,
      model,
    });
  };
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title="User Management"
            subheader=""
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "blue" }}>
                {" "}
                U{" "}
              </Avatar>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={4}>
                <ESPTextField
                  name="Email"
                  label="Email"
                  helptext=""
                  type="email"
                  onPropertyChange={this.onPropertyChange}
                  value={this.state.model.Email}
                />
              </Grid>
              <Grid item lg={4}>
                <ESPTextField
                  name="Password"
                  label="Password"
                  helptext=""
                  type="password"
                  onPropertyChange={this.onPropertyChange}
                  value={this.state.model.Password}
                />
              </Grid>
              <Grid item lg={4}>
                <ESPSelect
                  name="EspUsers"
                  label="User Id in ESP"
                  helptext=""
                  items={this.state.model.EspUsers}
                  onPropertyChange={this.onSelectChange}
                />
              </Grid>
              <Grid item lg={4}>
                <ESPCheckbox
                  name="IsAdmin"
                  label="Is admin user"
                  checked={this.state.model.IsAdmin}
                  onPropertyChange={this.onPropertyChange}
                />
              </Grid>
              <Grid item lg={4}>
                <ESPCheckbox
                  name="IsPublic"
                  label="Is Public User"
                  checked={this.state.model.IsPublic}
                  onPropertyChange={this.onSelectChange}
                />
              </Grid>
              <Grid item lg={4}>
                <ESPCheckbox
                  name="IsDisabled"
                  label="Suspend User"
                  checked={this.state.model.IsDisabled}
                  onPropertyChange={this.onPropertyChange}
                />
              </Grid>
              <Grid item lg={10}></Grid>

              <Grid item lg={1} mx="auto">
                <Button
                  variant="contained"
                  color="primary"
                  // className={classes.saveBtn}
                  size="large"
                  onClick={this.onSave}
                  startIcon={<SaveIcon />}
                  disabled={
                    !(
                      this.state.model.Email &&
                      this.state.model.Password &&
                      this.state.model.EspUserId
                    )
                  }
                >
                  Add User
                </Button>
              </Grid>
              <Grid item lg={12}>
                <hr />
                <TableContainer component={Paper}>
                  <Table
                    //className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>ESP User</TableCell>
                        <TableCell>Is Admin</TableCell>
                        <TableCell>Is Public User</TableCell>
                        <TableCell>Change Password</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.loginUsers.map((row) => (
                        <TableRow key={row.OId}>
                          <TableCell>{row.Email}</TableCell>
                          <TableCell>{row.Name}</TableCell>
                          <TableCell>
                            {row.IsAdmin ? <CheckIcon /> : <CloseIcon />}
                          </TableCell>
                          <TableCell>
                            {row.IsPublic ? <CheckIcon /> : <CloseIcon />}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              // className={classes.saveBtn}
                              size="large"
                              onClick={() => this.onChangePassword(row.OId)}
                              startIcon={<SaveIcon />}
                            >
                              Change Password
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <hr />
      </div>
    );
  }
}
export default UserManagement;
