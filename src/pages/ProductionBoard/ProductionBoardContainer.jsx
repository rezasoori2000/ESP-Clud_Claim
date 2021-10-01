import React from "react";
import ProductionBoard from "./ProductionBoardPage";
import config from "../../config";
import axios from "axios";
import Helper from "../../components/logics/Helper";

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

  render(props) {
    return this.state.loaded && <ProductionBoard jobs={this.state.jobs} />;
  }
}

export default ProductionBoardContainer;
