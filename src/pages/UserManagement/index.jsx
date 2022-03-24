import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
  Hidden,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Helper from "../../components/logics/Helper";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
class UserManagement extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUsers: [],
      model: {},
      changes: [],
      changePassword: false,
    };
  }
  componentDidMount() {
    this.usermanagementInitData();
  }
  usermanagementInitData = () => {
    Helper.apiPost(`${this.props.apiRoute}Account/InitClaimUserManagement`)
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
            LoginId: "",
          },
        });
      })
      .catch((err) => {
        alert("Error in getting user management Data");
      });
  };
  onSave = () => {
    if (!this.state.changePassword) {
      Helper.apiPost(`${this.props.apiRoute}Account/Register`, {
        Email: this.state.model.Email,
        Password: this.state.model.Password,
        ConfirmPassword: this.state.model.Password,
        IsAdmin: this.state.model.IsAdmin,
        IsPublic: this.state.model.IsPublic,
        UserId: this.state.model.EspUserId,
      })
        .then((r) => {
          alert("Successfuly added");
          //window.location.reload(false);
          <Redirect to="/" />;
        })
        .catch((err) => {
          if (err.response) alert("Error in adding user" + err.response.data);
          else alert("Error in adding user" + err);
          window.location.href = ".";
        });
    } else {
      Helper.apiPost(`${this.props.apiRoute}Account/SetPassword`, {
        Id: this.state.model.LoginId,
        NewPassword: this.state.model.Password,
        ConfirmPassword: this.state.model.Password,
      })
        .then((r) => {
          alert("Successfuly Save");
          const model = this.state.model;

          model.Email = "";
          model.Password = "";
          model.IsAdmin = false;
          model.IsPublic = false;
          model.IsDisabled = false;
          model.EspUserId = "";
          model.LoginId = "";
          model.EspUsers.map((e) => {
            e.Selected = false;
          });
          this.setState({
            ...this.state,
            model,
            changePassword: false,
          });
        })
        .catch((err) => {
          if (err.response)
            alert("Error in saving new password" + err.response.data);
          else alert("Error in saving new password" + err);
        });
    }
  };
  onChangePassword = (id) => {
    const user = this.state.loginUsers.find((x) => x.Id == id);
    const EspUsers = this.state.model.EspUsers;
    if (!user.IsPublic) {
      const espUser = EspUsers.find((x) => x.Value == user.WorkerId);
      const espInx = EspUsers.indexOf(espUser);
      espUser.Selected = true;

      EspUsers.splice(espInx, 1, espUser);
    }
    const model = {
      Email: user.Email,
      IsAdmin: user.IsAdmin,
      IsPublic: user.IsPublic,
      EspUserId: user.WorkerId,
      LoginId: id,
      EspUsers,
    };
    this.setState(
      {
        ...this.state,
        changePassword: true,
        model,
      },
      () => {
        console.log(user.Email + " " + user.Name);
      }
    );
  };

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
              <Grid item lg={4} xs={12}>
                <ESPTextField
                  name="Email"
                  label="Email"
                  helptext=""
                  type="email"
                  onPropertyChange={this.onPropertyChange}
                  value={this.state.model.Email}
                />
              </Grid>
              <Grid item lg={4} xs={12}>
                <ESPTextField
                  name="Password"
                  label="Password"
                  helptext=""
                  type="password"
                  onPropertyChange={this.onPropertyChange}
                  value={this.state.model.Password}
                />
              </Grid>
              <Grid item lg={4} xs={12}>
                <ESPSelect
                  name="EspUsers"
                  label="User Id in ESP"
                  helptext=""
                  items={this.state.model.EspUsers}
                  onPropertyChange={this.onSelectChange}
                />
              </Grid>
              <Grid item lg={4} xs={6}>
                <ESPCheckbox
                  name="IsAdmin"
                  label="Is admin user"
                  checked={this.state.model.IsAdmin}
                  onPropertyChange={this.onPropertyChange}
                />
              </Grid>
              <Grid item lg={4} xs={6}>
                <ESPCheckbox
                  name="IsPublic"
                  label="Is Public User"
                  checked={this.state.model.IsPublic}
                  onPropertyChange={this.onPropertyChange}
                />
              </Grid>
              <Grid item lg={4} xs={12} mx="auto">
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
                      (this.state.model.EspUserId ||
                        this.state.model.IsPublic ||
                        this.state.model.IsAdmin)
                    )
                  }
                >
                  {this.state.changePassword ? "Save Password" : "Add User"}
                </Button>
              </Grid>
              <Grid item lg={12}>
                <hr />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Hidden only={["xs"]}>
                <Grid item lg={4} xs={12} style={{ backgroundColor: "#eee" }}>
                  <h4>Email</h4>
                </Grid>
                <Grid item lg={4} xs={12} style={{ backgroundColor: "#eee" }}>
                  <h4>ESP User</h4>
                </Grid>
                <Grid item lg={1} xs={12} style={{ backgroundColor: "#eee" }}>
                  <h4>Admin</h4>
                </Grid>
                <Grid item lg={1} xs={12} style={{ backgroundColor: "#eee" }}>
                  <h4>Public User</h4>
                </Grid>
                <Grid item lg={2} xs={12} style={{ backgroundColor: "#eee" }}>
                  <h4>Change Password</h4>
                </Grid>
              </Hidden>

              <Grid item lg={12} xs={12}>
                <hr />
              </Grid>
              {this.state.loginUsers.map((row) => (
                <Fragment>
                  <Grid item lg={4} xs={12}>
                    <Hidden only={["sm", "lg", "xl", "md"]}>Email: </Hidden>
                    {row.Email}
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Hidden only={["sm", "lg", "xl", "md"]}>Name: </Hidden>
                    {row.Name}
                  </Grid>
                  <Grid item lg={1} xs={12}>
                    <Hidden only={["sm", "lg", "xl", "md"]}>Admin:</Hidden>
                    {row.IsAdmin ? <CheckIcon /> : <CloseIcon />}
                  </Grid>
                  <Grid item lg={1} xs={12}>
                    <Hidden only={["sm", "lg", "xl", "md"]}>Public:</Hidden>
                    {row.IsPublic ? <CheckIcon /> : <CloseIcon />}
                  </Grid>
                  <Grid item lg={2} xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      // className={classes.saveBtn}
                      size="medium"
                      onClick={() => this.onChangePassword(row.Id)}
                      startIcon={<SaveIcon />}
                    >
                      Change Password
                    </Button>
                  </Grid>
                  <Grid lg={12} xs={12}>
                    <hr />
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <hr />
      </div>
    );
  }
}
export default UserManagement;
