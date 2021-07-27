import React from "react";
import axios from "axios";
import config from "../../config";

class HelperLogic extends React.Component {
  getLocalToken = () => {
    if (!localStorage.getItem("_claim")) return {};
    var claims = JSON.parse(localStorage.getItem("_claim"));
    return claims.user_t;
  };

  setAsyncApiToken = async (username, password) => {
    var value = {
      grant_type: "password",
      username: username,
      password: password,
      withCredentials: true,
    };
    var data = Object.keys(value)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value[key]);
      })
      .join("&");
    var headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "*",
    };
    return await axios.post(`${config.apiUrl}token`, data, headers);
  };

  getParamApi = async (url, value, errorName) => {
    var response = {};
    debugger;
    try {
      axios.defaults.headers.post["Authorization"] =
        "bearer " + this.getLocalToken();
      axios.defaults.headers.post["Content-type"] = "application/json";

      response = await axios.get(`${config.apiUrl}${url}`, { params: value });
      return response;
    } catch (err) {
      alert(`Error in calling ESP (${errorName}) API- ${err}`);
    }
  };
  getApi = (url, errorName) => {
    try {
      axios.defaults.headers.post["Authorization"] =
        "bearer " + this.getLocalToken();
      axios.defaults.headers.post["Content-type"] = "application/json";

      var headers = {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "*",
        Authorization: "bearer " + this.getLocalToken(),
        "Content-type": "application/json",
      };
      return axios.get(`${config.apiUrl}${url}`, headers);
    } catch (err) {
      alert(`Error in calling ESP (${errorName}) API- ${err}`);
    }
  };

  apiPost = async (url, value, errorName) => {
    var response = {};
    // var data = JSON.stringify(value);
    axios.defaults.headers.post["Authorization"] =
      "bearer " + this.getLocalToken();
    axios.defaults.headers.post["Content-Type"] =
      "application/json; charset=UTF-8";
    axios.defaults.headers.post["Accept"] = "application/json";

    var headers = {
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Methods": "*",
      Authorization: "bearer " + this.getLocalToken(),
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json",
    };
    return await axios.post(`${config.apiUrl}${url}`, value, headers);
  };

  getAsyncApi = async (url, errorName) => {
    try {
      axios.defaults.headers.post["Authorization"] =
        "bearer " + this.getLocalToken();
      axios.defaults.headers.post["Content-type"] = "application/json";

      await axios.get(`${config.apiUrl}${url}`).then((r) => {
        return r;
      });
    } catch (err) {
      alert(`Error in calling ESP (${errorName}) API- ${err}`);
    }
  };

  apiAsyncPost = async (url, value, errorName) => {
    var response = {};
    var data = JSON.stringify(value);
    try {
      axios.defaults.headers.post["Authorization"] =
        "bearer " + this.getLocalToken();
      axios.defaults.headers.post["Content-type"] = "application/json";

      response = await axios.post(`${config.apiUrl}${url}`, data);
      return response;
    } catch (err) {
      alert(` ${err.response.data}`);
    }
  };
  render() {
    return <din></din>;
  }
}

const Helper = new HelperLogic();
export default Helper;
