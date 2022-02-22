import React from "react";
import "./App.css";
import DrawerContainer from "./components/DrawerContainer";
import { Route } from "react-router-dom";
import Performance from "./pages/Performance";
import Settings from "./pages/AdminSettings/AdminSettingsContainer";
import ProductionBoard from "./pages/ProductionBoard/ProductionBoardContainer";
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
      page: -1,
      fromPB: false,
      logout: false,
      settings: null,
      texts: [],
      isAdmin: false,
      loggedIn: false,
      isPublic: false,
      loading: true,
      claimingId: 0,
      workerName: "",
      joblevel: false,
      jobCode: "",
      claims: {
        user_t: "",
        a: false,
        p: false,
        w: 0,
        pa: 0,
      },
      menuSize: 240,
      mainRoute: "",
      apiRoute: "",
      localSettings: {},
    };
  }
  componentDidMount() {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState(
          {
            ...this.state,
            localSettings: json,
            mainRoute: json.route,
            apiRoute: json.apiRoute,
          },
          () => {
            if (localStorage.getItem("_claim")) this.getServerSettings();
          }
        );
      });
  }
  setSettings = (settings) => {
    this.setState({
      ...this.state,
      loggedIn: true,
      settings: settings,
    });
  };
  getServerSettings = () => {
    try {
      var url = `${this.state.apiRoute}AdminSettings/GetInfo`;
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
          if (err.response)
            alert(
              `Error in calling ESP (Admin Settings) API- ${err.response.data}`
            );
          else alert(`Error in calling ESP (Admin Settings) API- ${err}`);
        });
    } catch (err) {
      alert(`Error in calling ESP (Admin Settings) API- ${err}`);
      window.location.href = ".";
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
  changeMenuSize = () => {
    if (this.state.menuSize === 0)
      this.setState({
        ...this.state,
        menuSize: 240,
      });
    else
      this.setState({
        ...this.state,
        menuSize: 0,
      });
  };
  handleSignIn = (email, password) => {
    var response = Helper.setAsyncApiToken(
      email,
      password,
      this.state.apiRoute
    );
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
  claimOnPB = (jid, wid, jl, jobCode) => {
    this.setState(
      {
        ...this.state,
        step: 1,
        page: 0,
        pbWorkTypeId: wid,
        pbJobId: jid,
        fromPB: true,
        joblevel: jl,
        jobCode,
      },
      () => {
        this.props.history.push(`${this.state.mainRoute}claimpb`);
      }
    );
  };
  logoutFromPB = () => {
    this.setState(
      {
        ...this.state,
        step: 1,
        page: -1,
        fromPB: false,
        logout: true,
      },
      () => {
        this.props.history.push(`${this.state.mainRoute}claim`);
      }
    );
  };
  FadingRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
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
              menuSize={this.state.menuSize}
              changeMenuSize={this.changeMenuSize}
            />
            <main
              style={{
                flexGrow: 1,
                paddingLeft: "30px",
                paddingRight: "10px",
                paddingTop: "80px",
              }}
            >
              {/* <FadingRoute path=`` component={Something} /> */}

              {/* <Route
                path={`${this.state.mainRoute}`}
                render={(props) => (
                  <ClaimContainer
                    public={isPublic}
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
                    settings={this.state.settings}
                    changeStep={this.changeStep}
                    workerId={w}
                    fromPB={this.state.fromPB}
                    logout={this.state.logout}
                    jobId={this.state.pbJobId}
                    workTypeId={this.state.pbWorkTypeId}
                    page={this.state.page}
                    setClaimingId={this.setClaimingId}
                    menuSize={this.state.menuSize}
                    jobLevel={this.state.joblevel}
                    {...props}
                  />
                )}
              /> */}
              <Route
                path={`${this.state.mainRoute}claim`}
                render={(props) => (
                  <ClaimContainer
                    public={isPublic}
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
                    settings={this.state.settings}
                    setClaimingId={this.setClaimingId}
                    fromPB={false}
                    logout={this.state.logout}
                    jobId={this.state.pbJobId}
                    workTypeId={this.state.pbWorkTypeId}
                    changeStep={this.changeStep}
                    workerId={w}
                    menuSize={this.state.menuSize}
                    page={this.state.page}
                    jobLevel={this.state.joblevel}
                    {...props}
                  />
                )}
              />
              <Route
                path={`${this.state.mainRoute}claimpb`}
                render={(props) => (
                  <ClaimContainer
                    public={isPublic}
                    settings={this.state.settings}
                    setClaimingId={this.setClaimingId}
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
                    fromPB={this.state.fromPB}
                    logout={this.state.logout}
                    jobId={this.state.pbJobId}
                    workTypeId={this.state.pbWorkTypeId}
                    jobLevel={this.state.joblevel}
                    changeStep={this.changeStep}
                    workerId={w}
                    menuSize={this.state.menuSize}
                    page={this.state.page}
                    jobCode={this.state.jobCode}
                    {...props}
                  />
                )}
              />
              <Route
                path={`${this.state.mainRoute}productionBoard`}
                render={(props) => (
                  <ProductionBoard
                    settings={this.state.settings}
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
                    claimingId={this.state.claimingId}
                    claimOnPB={this.claimOnPB}
                    logoutFromPB={this.logoutFromPB}
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
              menuSize={this.state.menuSize}
              changeMenuSize={this.changeMenuSize}
            />
            <main
              style={{
                flexGrow: 1,
                paddingLeft: "30px",
                paddingRight: "0px",
                paddingTop: "80px",
                marginLeft: this.state.menuSize === 0 ? "-100px" : "0px",
              }}
            >
              <div
                style={{
                  drawerPaper: { width: this.state.menuSize },
                }}
              />
              {/* <Route path={`${this.state.mainRoute}`} component={Welcome} /> */}
              <Route
                path={`${this.state.mainRoute}claim`}
                render={(props) => (
                  <ClaimContainer
                    public={false}
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
                    settings={this.state.settings}
                    setClaimingId={this.setClaimingId}
                    changeStep={this.changeStep}
                    isUser={false}
                    fromPB={false}
                    logout={this.state.logout}
                    jobId={this.state.pbJobId}
                    workTypeId={this.state.pbWorkTypeId}
                    page={this.state.page}
                    workerId="0"
                    menuSize={this.state.menuSize}
                    jobLevel={this.state.joblevel}
                    {...props}
                  />
                )}
              />
              <Route
                path={`${this.state.mainRoute}claimpb`}
                render={(props) => (
                  <ClaimContainer
                    public={false}
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
                    settings={this.state.settings}
                    setClaimingId={this.setClaimingId}
                    changeStep={this.changeStep}
                    isUser={false}
                    fromPB={this.state.fromPB}
                    logout={this.state.logout}
                    jobId={this.state.pbJobId}
                    workTypeId={this.state.pbWorkTypeId}
                    jobLevel={this.state.joblevel}
                    page={this.state.page}
                    workerId="0"
                    menuSize={this.state.menuSize}
                    jobCode={this.state.jobCode}
                    {...props}
                  />
                )}
              />
              <Route
                path={`${this.state.mainRoute}settings`}
                render={(props) => (
                  <Settings
                    changeStep={this.changeStep}
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
                    getServerSettings
                    onChangeSettings={this.setSettings}
                    {...props}
                  />
                )}
              />
              <Route
                path={`${this.state.mainRoute}performanceState`}
                component={Performance}
              />
              <Route
                path={`${this.state.mainRoute}users`}
                render={(props) => (
                  <UserManagement
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
                  />
                )}
              />
              <Route
                path={`${this.state.mainRoute}productionBoard`}
                render={(props) => (
                  <ProductionBoard
                    claimingId={this.state.claimingId}
                    settings={this.state.settings}
                    setClaimingId={this.setClaimingId}
                    claimOnPB={this.claimOnPB}
                    logoutFromPB={this.logoutFromPB}
                    apiRoute={this.state.apiRoute}
                    mainRoute={this.state.mainRoute}
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
