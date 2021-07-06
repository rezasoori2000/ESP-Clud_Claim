import React from "react";
import axios from "axios";
import config from "../../config";

class HelperLogic extends React.Component {
  getAsyncApi = async (url, value, errorName) => {
    var response = {};
    try {
      response = await axios.get(`${config.apiUrl}${url}`, { params: value });
      return response;
    } catch (err) {
      alert(`Error in calling ESP (${errorName}) API- ${err}`);
    }
  };
  getApi = async (url, errorName) => {
    try {
      return await axios.get(`${config.apiUrl}${url}`);
    } catch (err) {
      alert(`Error in calling ESP (${errorName}) API- ${err}`);
    }
  };

  apiPost = async (url, value, errorName) => {
    var response = {};
    var data = JSON.stringify(value);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      response = await axios.post(`${config.apiUrl}${url}`, data, {
        headers: headers,
      });
      return response;
    } catch (err) {
      alert(`Error in calling ESP (${errorName}) API- ${err}`);
    }
  };

  render() {
    return <din></din>;
  }
}

const Helper = new HelperLogic();
export default Helper;
