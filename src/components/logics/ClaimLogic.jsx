import React from "react";
import Helper from "./Helper";
class ClaimLogic extends React.Component {
  getJobItemsFromApi = async (jobId, worktypeId, workerId, route) => {
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
    } catch (ex) {
      if (ex.response)
        alert(
          `Error in calling ESP (Claim / Get Job items) API- ${ex.response.data}`
        );
      else
        alert(
          `Error in calling ESP (Claim / Get Job items) API- ${ex.message}`
        );
      window.location.href = ".";
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
  GetPerfStatByAPI = async (id, from, to, route) => {
    var value = {
      id,
      from,
      to,
    };
    return Helper.apiPost(
      `${route}PerformanceStat/GetWorkerPS?id=${id}&from=${from}&to=${to}`,
      value,
      "Get performance stat"
    );
  };
  render() {
    return <din></din>;
  }
}
//module.exports={_:LoginLogics};
const Loginlogics = new ClaimLogic();
export default Loginlogics;
