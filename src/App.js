import React from "react";
import "./App.css";
import DrawerContainer from "./components/DrawerContainer";
import { Route } from "react-router-dom";
import Performance from "./pages/Performance";
import Settings from "./pages/AdminSettings/AdminSettingsContainer";
import Board from "./pages/Board";
import Welcome from "./pages/Welcome";
import ClaimContainer from "./pages/Claim/ClaimContainer";
import Helper from "./components/logics/Helper";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      settings: null,
      texts: [],
    };
  }
  componentDidMount() {
    this.onChangeSettings();
  }
  onChangeSettings = () => {
    Helper.getAsyncApi("AdminSettings", "Error calling Settings API").then(
      (response) =>
        this.setState({
          ...this.state,
          settings: JSON.parse(response.data),
        })
    );
  };
  changeStep = (j, texts) => {
    this.setState({
      ...this.state,
      step: j,
      texts,
    });
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <DrawerContainer step={this.state.step} texts={this.state.texts} />
        <main
          style={{
            flexGrow: 1,
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "80px",
          }}
        >
          <div style={{ drawerPaper: { width: 240 } }} />
          <Route path="/" component={Welcome} />
          <Route
            path="/claim"
            render={(props) => (
              <ClaimContainer
                settings={this.state.settings}
                changeStep={this.changeStep}
                {...props}
              />
            )}
          />
          <Route
            path="/settings"
            render={(props) => (
              <Settings
                changeStep={this.changeStep}
                onChangeSettings={this.onChangeSettings}
                {...props}
              />
            )}
          />
          <Route path="/performanceState" component={Performance} />
          <Route path="/board" component={Board} />
        </main>
      </div>
    );
  }
}

export default App;
