import React from "react";
import AdminSettingsPage from "./AdminSettingsPage";
import config from "../../config";
import axios from "axios";
import Helper from "../../components/logics/Helper";

class AdminSettingsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      adminSettings: {},
      user: {},
      changes: [],
    };
  }

  componentWillMount() {
    this.getAdminSettingsByAPI();
    this.captureIPAddress();
    this.props.changeStep(0);
  }
  handelPropertyChange = (event) => {
    var adSettings = this.state.adminSettings;

    let value = "";
    if (event.target.type !== undefined && event.target.type === "checkbox")
      value = event.target.checked;
    else value = event.target.value;

    var changes = this.state.changes;
    changes.push({
      name: event.target.name,
      value: value,
    });

    adSettings[event.target.name] = value;
    this.setState({
      ...this.state,
      changes,
      adSettings,
    });
  };
  onSelectChange = (event) => {
    var adSettings = this.state.adminSettings;
    var newSelectedId = event.target.value;
    let newValues = [];
    adSettings[event.target.name].map((item) => {
      if (item.Value === newSelectedId)
        newValues.push({
          Value: item.Value,
          Text: item.Text,
          Disabled: false,
          Group: null,
          Selected: true,
        });
      else
        newValues.push({
          Value: item.Value,
          Text: item.Text,
          Disabled: false,
          Group: null,
          Selected: false,
        });
    });
    var changes = this.state.changes;

    changes.push({
      name: event.target.name,
      value: newSelectedId,
    });
    if (event.target.name === "Factories") {
      this.getGroupsByAPI(newSelectedId);
    }
    adSettings[event.target.name] = newValues;
    adSettings[event.target.name + "Id"] = newSelectedId;
    this.setState({
      ...this.state,
      changes,
      adminSettings: adSettings,
    });
  };
  captureIPAddress = async () => {
    fetch("https://api.ipify.org?format=jsonp?callback=?", {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.text();
      })
      .then((ip) => {
        this.setState({
          ...this.state,
          ip,
        });
      });
  };

  getGroupsByAPI = async (oid) => {
    var response = {};
    var oldAdminSettings = this.state.adminSettings;
    try {
      Helper.apiPost(`adminSettings/GetGroup?oid=` + oid, {}, "")
        .then((res) => {
          response = JSON.parse(res.data);
          oldAdminSettings.Groups = response;

          this.setState({
            ...this.state,
            adminSettings: oldAdminSettings,
          });
        })
        .catch((err) => {
          alert("Error in get Groups data");
        });
    } catch (err) {
      alert(`Error in calling ESP API- ${err}`);
    }
  };

  getAdminSettingsByAPI = async () => {
    var response = {};
    try {
      Helper.apiPost(`adminSettings/GetInfo`, {}, "")
        .then((res) => {
          response = JSON.parse(res.data);
          this.setState({
            ...this.state,
            adminSettings: response,
          });
        })
        .catch((err) => {
          alert("Error in get Groups data");
        });
    } catch (err) {
      alert(`Error in calling ESP API- ${err}`);
    }
  };

  saveAdminSettingsByAPI = async () => {
    let state = this.state.adminSettings;

    //var data = JSON.stringify(state);
    try {
      Helper.apiPost(`adminSettings/PostData`, state, "")
        .then((res) => {
          this.props.history.push("/");
          // this.props.onChangeSettings();
        })
        .catch((err) => {
          alert("Error in get Groups data");
        });
    } catch (err) {
      alert(`Error in calling ESP API- ${err}`);
    }
  };

  render(props) {
    return (
      <AdminSettingsPage
        adminSettings={this.state.adminSettings || null}
        onPropertyChange={this.handelPropertyChange}
        onSelectChange={this.onSelectChange}
        onSave={this.saveAdminSettingsByAPI}
      />
    );
  }
}

export default AdminSettingsContainer;
