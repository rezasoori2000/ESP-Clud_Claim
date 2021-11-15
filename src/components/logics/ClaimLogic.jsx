import React from "react";
import axios from "axios";
import config from "../../config";
import Helper from "./Helper";
class ClaimLogic extends React.Component {
  getJobItemsFromApi = async (jobId, worktypeId, workerId) => {
    var response = {};
    try {
      return await Helper.apiPost(
        "Claim/GetJobItems",
        {
          jobId: jobId,
          WorkTypeId: worktypeId,
          workerId: workerId,
        },
        ""
      );
    } catch (err) {
      alert(`Error in calling ESP (Claim / Get Job items) API- ${err}`);
    }
  };

  getJobsOfWorkerFromApi = async (workerId, jobStage, siteWork = false) => {
    var data = {
      id: workerId,
      jobStage,
    };
    return await Helper.apiPost(
      `Claim/GetJobsOfWorker?id=${workerId}&jobStage=${jobStage}&siteWork=${siteWork}`,
      data,
      ""
    );
  };

  submitClaimInAPI = async (workerId, jobId, jobItems, comment, logout) => {
    var value = {
      workerId: workerId,
      jobId: jobId,
      jobItems: jobItems,
      comment: comment,
      logout,
    };
    return await Helper.apiPost(
      "Claim/PostSubmitClaim",
      value,
      "Submit Claim Job"
    );
  };
  submitFullJobClaimInAPI = async (workerId, jobId, comment) => {
    var value = {
      workerId: workerId,
      jobId: jobId,
      comment: comment,
    };
    return await Helper.apiPost(
      "Claim/PostClaimWholeJob",
      value,
      "Submit Claim Full Job"
    );
  };

  submitAdminJobClaimInAPI = async (claimingOId, OId, comment, logout) => {
    var value = {
      workerId: claimingOId,
      WorkTypeId: OId,
      comment: comment,
      logout,
    };
    return await Helper.apiPost(
      "Claim/PostSubmitClaimAdminTask",
      value,
      "Submit Admin Job"
    );
  };
  GetClaimedByAPI = async (jobCode, worktypId) => {
    var value = {
      jobCode,
      worktypId,
    };
    return Helper.apiPost(
      `Claim/GetWorkTypeClaimedBy?jobCode=${jobCode}&worktypeId=${worktypId}`,
      value,
      "Get Work Type Claimed by"
    );
  };

  render() {
    return <din></din>;
  }
}
//module.exports={_:LoginLogics};
const Loginlogics = new ClaimLogic();
export default Loginlogics;
