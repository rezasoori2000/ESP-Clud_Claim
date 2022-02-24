import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

class HelperLogic extends React.Component {
  getLocalToken = () => {
    const cookies = new Cookies();
    var claims = cookies.get("_claim");

    return claims.user_t;
  };

  setAsyncApiToken = async (username, password, route) => {
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
    return await axios.post(`${route}token`, data, headers);
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
    return await axios.post(`${url}`, value, headers);
  };

  apiGet = async (url, errorName) => {
    try {
      axios.defaults.headers.post["Authorization"] =
        "bearer " + this.getLocalToken();
      axios.defaults.headers.post["Content-type"] = "application/json";

      await axios.get(url);
    } catch (err) {
      alert(`Error in calling ESP (${errorName}) API- ${err}`);
    }
  };
  /*
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

  */
  timeConvert = (num) => {
    var hours = num / 60;
    var rhours = Math.floor(hours).toString();
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes).toString();
    return (
      (rhours.length == 1 ? "0" + rhours : rhours) +
      ":" +
      (rminutes.length == 1 ? "0" + rminutes : rminutes)
    );
  };

  render() {
    return <din></din>;
  }
}

const Helper = new HelperLogic();
export default Helper;
