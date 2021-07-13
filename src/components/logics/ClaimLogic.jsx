import React from "react";
import axios from "axios";
import config from "../../config";
import Helper from "./Helper";
class ClaimLogic extends React.Component {
  getJobItemsFromApi = async (jobId, worktypeId, workerId) => {
    var response = {};
    try {
      response = await axios.get(`${config.apiUrl}Claim/GetJobItems`, {
        params: { jobId, worktypeId, workerId },
      });
      return response;
    } catch (err) {
      alert(`Error in calling ESP (Claim / Get Job items) API- ${err}`);
    }
  };

  getJobsOfWorkerFromApi = async (workerId) => {
    return await axios.get(
      `${config.apiUrl}/Claim/GetJobsOfWorker?id=${workerId}`
    );
  };

  submitClaimInAPI = async (workerId, jobId, jobItems, comment) => {
    var value = {
      workerId: workerId,
      jobId: jobId,
      jobItems: jobItems,
      comment: comment,
    };
    return Helper.apiPost("Claim/PostSubmitClaim", value, "Submit Claim Job");
  };
  submitFullJobClaimInAPI = async (workerId, jobId, comment) => {
    var value = {
      workerId: workerId,
      jobId: jobId,
      comment: comment,
    };
    return Helper.apiPost(
      "Claim/PostClaimWholeJob",
      value,
      "Submit Claim Full Job"
    );
  };

  submitAdminJobClaimInAPI(claimingOId, OId, comment) {
    var value = {
      workerId: claimingOId,
      WorkTypeId: OId,
      comment: comment,
    };
    return Helper.apiPost(
      "Claim/PostSubmitClaimAdminTask",
      value,
      "Submit Admin Job"
    );
  }

  render() {
    return <din></din>;
  }
}
//module.exports={_:LoginLogics};
const Loginlogics = new ClaimLogic();
export default Loginlogics;
