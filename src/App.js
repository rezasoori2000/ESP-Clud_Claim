import React from "react";
import "./App.css";
import DrawerContainer from "./components/DrawerContainer";
import { Route } from "react-router-dom";
import Performance from "./pages/Performance";
import Settings from "./pages/AdminSettings/AdminSettingsContainer";
import ProductionBoard from "./pages/ProductionBoard/ProductionBoardContainer";
import Welcome from "./pages/Welcome";
import ClaimContainer from "./pages/Claim/ClaimContainer";
import Helper from "./components/logics/Helper";
import SignIn from "./pages/SignIn";
import UserManagement from "./pages/UserManagement";
import Loading from "../src/pages/loading";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      page: 0,
      fromPB: false,
      settings: null,
      texts: [],
      isAdmin: false,
      loggedIn: false,
      isPublic: false,
      loading: true,
      claimingId: 0,
      claims: {
        user_t: "",
        a: false,
        p: false,
        w: 0,
        pa: 0,
      },
    };
  }
  componentDidMount() {
    const token = Helper.getLocalToken();
    if (localStorage.getItem("_claim")) this.getServerSettings();
  }
  getServerSettings = () => {
    try {
      var url = "AdminSettings/GetInfo";
      var claims = localStorage.getItem("_claim");
      Helper.apiPost(url, claims, "")
        .then((response) => {
          this.setState(
            {
              ...this.state,
              loggedIn: true,
              settings: JSON.parse(response.data),
              claims: JSON.parse(localStorage.getItem("_claim")),
            },
            () => {
              this.setState({
                ...this.state,
                loading: false,
              });
            }
          );
        })
        .catch((err) => {
          alert(`Error in calling ESP (Admin Settings) API- ${err}`);
        });
    } catch (err) {
      alert(`Error in calling ESP (Admin Settings) API- ${err}`);
    }
  };
  setClaimingId = (id) => {
    this.setState({
      ...this.state,
      claimingId: id,
    });
  };
  changeStep = (j, texts, isAdmin = false) => {
    this.setState({
      ...this.state,
      step: j,
      texts,
      isAdmin,
    });
  };

  handleSignIn = (email, password) => {
    var response = Helper.setAsyncApiToken(email, password);
    response
      .then((r) => {
        if (r && r.data && r.data.access_token) {
          const model = {
            user_t: r.data.access_token,
            a: r.data.a,
            p: r.data.p,
            w: r.data.w,
            pa: r.data.pa,
          };
          localStorage.setItem("_claim", JSON.stringify(model));

          this.getServerSettings();
        }
      })
      .catch(function (response) {
        if (response && response.response && response.response.status === 400)
          alert("Username and password are not match");
        else alert("Error in get security code" + response);
        return null;
      });
  };
  claimOnPB = (jid, wid) => {
    this.setState(
      {
        ...this.state,
        step: 1,
        page: 0,
        pbWorkTypeId: wid,
        pbJobId: jid,
        fromPB: true,
      },
      () => {
        this.props.history.push("/claim");
      }
    );
  };
  render() {
    const role = this.state.claims.a ? "a" : "u";
    const isPublic = this.state.claims.p;
    const w = this.state.claims.w;
    return (
      <div style={{ backgroundColor: "#ebedf1" }}>
        {this.state.loading && this.state.loggedIn && <Loading />}
        {!this.state.loggedIn && <SignIn handleSignIn={this.handleSignIn} />}
        {this.state.loggedIn && role === "u" && (
          <div style={{ display: "flex" }}>
            <DrawerContainer
              step={this.state.step}
              texts={this.state.texts}
              isAdmin={this.state.isAdmin}
              isSystemAdmin={false}
              ShowProductionBoard={this.state.settings.PBShowProductionBoard}
            />
            <main
              style={{
                flexGrow: 1,
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "80px",
              }}
            >
              <Route
                exact
                path="/"
                render={(props) => (
                  <ClaimContainer
                    public={isPublic}
                    settings={this.state.settings}
                    changeStep={this.changeStep}
                    workerId={w}
                    fromPB={this.state.fromPB}
                    jobId={this.state.pbJobId}
                    workTypeId={this.state.pbWorkTypeId}
                    page={this.state.page}
                    setClaimingId={this.setClaimingId}
                    {...props}
                  />
                )}
              />
              <Route
                path="/claim"
                render={(props) => (
                  <ClaimContainer
                    public={isPublic}
                    settings={this.state.settings}
                    setClaimingId={this.setClaimingId}
                    fromPB={this.state.fromPB}
                    jobId={this.state.pbJobId}
                    workTypeId={this.state.pbWorkTypeId}
                    changeStep={this.changeStep}
                    workerId={w}
                    page={this.state.page}
                    {...props}
                  />
                )}
              />

              <Route
                path="/productionBoard"
                render={(props) => (
                  <ProductionBoard
                    settings={this.state.settings}
                    claimingId={this.state.claimingId}
                    claimOnPB={this.claimOnPB}
                  />
                )}
              />
            </main>
          </div>
        )}
        {this.state.loggedIn && role === "a" && (
          <div style={{ display: "flex" }}>
            <DrawerContainer
              step={this.state.step}
              texts={this.state.texts}
              isAdmin={this.state.isAdmin}
              isSystemAdmin={true}
            />
            <main
              style={{
                flexGrow: 1,
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingTop: "80px",
              }}
            >
              <div
                style={{
                  drawerPaper: { width: 240 },
                }}
              />
              <Route path="/" component={Welcome} />
              <Route
                path="/claim"
                render={(props) => (
                  <ClaimContainer
                    public={false}
                    settings={this.state.settings}
                    setClaimingId={this.setClaimingId}
                    changeStep={this.changeStep}
                    isUser={false}
                    fromPB={this.state.fromPB}
                    jobId={this.state.pbJobId}
                    workTypeId={this.state.pbWorkTypeId}
                    page={this.state.page}
                    workerId="0"
                    {...props}
                  />
                )}
              />
              <Route
                path="/settings"
                render={(props) => (
                  <Settings
                    changeStep={this.changeStep}
                    // onChangeSettings={this.onChangeSettings}
                    {...props}
                  />
                )}
              />
              <Route path="/performanceState" component={Performance} />
              <Route path="/users" component={UserManagement} />
              <Route
                path="/productionBoard"
                render={(props) => (
                  <ProductionBoard
                    claimingId={this.state.claimingId}
                    settings={this.state.settings}
                    setClaimingId={this.setClaimingId}
                    claimOnPB={this.claimOnPB}
                  />
                )}
              />
            </main>
          </div>
        )}
      </div>
    );
  }
}
export default App;
