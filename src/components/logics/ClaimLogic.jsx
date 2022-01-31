import React from "react";
import axios from "axios";
import config from "../../config";
import Helper from "./Helper";
class ClaimLogic extends React.Component {
  getJobItemsFromApi = async (jobId, worktypeId, workerId, route) => {
    var response = {};
    try {
      return await Helper.apiPost(
        `${route}Claim/GetJobItems`,
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

  getJobsOfWorkerFromApi = async (
    route,
    workerId,
    jobStage,
    siteWork = false
  ) => {
    var data = {
      id: workerId,
      jobStage,
    };
    return await Helper.apiPost(
      `${route}Claim/GetJobsOfWorker?id=${workerId}&jobStage=${jobStage}&siteWork=${siteWork}`,
      data,
      ""
    );
  };

  submitClaimInAPI = async (
    workerId,
    jobId,
    jobItems,
    groupPercent,
    comment,
    logout,
    route
  ) => {
    var value = {
      workerId: workerId,
      jobId: jobId,
      jobItems: jobItems,
      groupPercent: groupPercent,
      comment: comment,
      logout,
    };
    return await Helper.apiPost(
      `${route}Claim/PostSubmitClaim`,
      value,
      "Submit Claim Job"
    );
  };
  submitFullJobClaimInAPI = async (workerId, jobId, comment, route) => {
    var value = {
      workerId: workerId,
      jobId: jobId,
      comment: comment,
    };
    return await Helper.apiPost(
      `${route}Claim/PostClaimWholeJob`,
      value,
      "Submit Claim Full Job"
    );
  };

  submitAdminJobClaimInAPI = async (
    claimingOId,
    OId,
    comment,
    logout,
    route
  ) => {
    var value = {
      workerId: claimingOId,
      WorkTypeId: OId,
      comment: comment,
      logout,
    };
    return await Helper.apiPost(
      `${route}Claim/PostSubmitClaimAdminTask`,
      value,
      "Submit Admin Job"
    );
  };
  GetClaimedByAPI = async (jobCode, worktypId, route) => {
    var value = {
      jobCode,
      worktypId,
    };
    return Helper.apiPost(
      `${route}Claim/GetWorkTypeClaimedBy?jobCode=${jobCode}&worktypeId=${worktypId}`,
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
