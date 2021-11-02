import React, { Fragment } from "react";
import ProductionBoard from "./ProductionBoardPage";
import config from "../../config";
import axios from "axios";
import Helper from "../../components/logics/Helper";
import Loading from "../loading.js";

class ProductionBoardContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      jobs: [],
      loaded: false,
    };
  }

  componentWillMount() {
    this.getProductionBoardInfoByAPI();
  }

  getProductionBoardInfoByAPI = async () => {
    var response = {};
    try {
      Helper.apiPost("ProductionBoard/GetProductionBoardInfo", {}, "")
        .then((res) => {
          response = JSON.parse(res.data);
          this.setState(
            {
              ...this.state,
              jobs: response,
            },
            () => {
              this.setState({
                ...this.state,
                loaded: true,
              });
            }
          );
        })
        .catch((err) => {
          alert("Error in get production board data");
        });
    } catch (err) {
      alert(`Error in calling ESP API (production board)- ${err}`);
    }
  };
  claimOnPB = async (jid, wid) => {
    this.props.claimOnPB(jid, wid);
  };
  render(props) {
    return (
      <Fragment>
        {!this.state.loaded && <Loading />}
        {this.state.loaded && (
          <ProductionBoard
            jobs={this.state.jobs}
            settings={this.props.settings}
            claimOnPB={this.claimOnPB}
          />
        )}
      </Fragment>
    );
  }
}

export default ProductionBoardContainer;
