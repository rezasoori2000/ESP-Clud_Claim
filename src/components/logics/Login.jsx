import React from "react";
import axios from "axios";
import config from "../../config";
import Helper from "./Helper";

class LoginLogic extends React.Component {
  getListOfWorkersFromApi = async (workerId, route) => {
    return await Helper.apiPost(
      `${route}Workers/GetListOfWorkers?workerId=` + workerId,
      {},
      "Error in calling ESP (Get Workers List)"
    );
  };

  searchNames = (event, mainWorkersList) => {
    var txt = event.target.value;
    return event.target.value.length > 0
      ? mainWorkersList.filter((t) =>
          t.Name.toLowerCase().includes(txt.toLowerCase())
        )
      : mainWorkersList;
  };

  saveLoginInAPI = async (id, comment, route) => {
    var response = {};
    var value = { OId: id, Code: comment };

    const headers = {
      "Content-Type": "application/json",
    };

    return await Helper.apiPost(`${route}Workers/PostLoginWorker`, value, "");
  };

  saveLogoutAPI = async (id, comment, route) => {
    var response = {};
    var value = { OId: id, Code: comment };

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      return await Helper.apiPost(`${route}Workers/PostLogoutWorker`, value);
    } catch (err) {
      if (err.response)
        alert(`Error in calling ESP (Logout) API- ${err.response.data}`);
      else alert(`Error in calling ESP (Logout) API- ${err}`);
      window.location.href = ".";
    }
  };

  checkWorkerLateLogin(worker, trackLateLogin, lateLoginTrack) {
    if (trackLateLogin) {
      var currentTime = new Date();

      var tempTime = new Date(worker.StartTime);
      var startTime = new Date(tempTime);
      startTime.setMinutes(tempTime.getMinutes() + lateLoginTrack);
      return startTime < currentTime;
    }
    return false;
  }

  checkWorkerEarlyLeave(worker, trackEarlyLeave, earlyLeaveAllowance) {
    if (trackEarlyLeave) {
      var currentTime = new Date();

      var tempTime = new Date(worker.EndTime);
      var endTime = new Date(tempTime);
      endTime.setMinutes(tempTime.getMinutes() - earlyLeaveAllowance);
      return endTime > currentTime;
    }
    return false;
  }

  getAsyncSettingsApi = async (url, value, errorName) => {
    const authStr = "bearer " + this.getLocalToken();
    try {
      axios.defaults.headers.post["Authorization"] = authStr;
      axios.defaults.headers.post["Content-type"] = "application/json";
      const response = await axios.post(
        `${this.props.apiRoute}AdminSettings/GetInfo`,
        null
      );

      return response;
    } catch (err) {
      alert(`Error in calling ESP (${errorName}) API- ${err}`);
    }
  };

  render() {
    return <din></din>;
  }
}
//module.exports={_:LoginLogics};
const Loginlogics = new LoginLogic();
export default Loginlogics;
