import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BusinessIcon from "@material-ui/icons/Business";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import VerticalStepper from "./controls/VerticalStepper";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemText: {
      fontSize: "1.1em",
    },

    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        background: "#ebedf1",
        color: "Black",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    link: {
      textDecoration: "none",
      color: "white",
    },
    whiteColor: {
      color: "white",
    },
  })
);

const DrawerContainer = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //const { forwardRef, useRef, useImperativeHandle } = React;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // const childRef = useRef();
  // const handleNextStep = (step) => {
  //   setStep(step);
  //   childRef.current.handleSetStep(activeStep);
  // };

  const drawer = (
    <div
      style={{ backgroundColor: "#242845", height: "100%", fontSize: "0.9rem" }}
    >
      <div className="theme.mixins.toolbar, drawerPaper: 240" />
      <Divider />
      <List className="mt-5">
        <div style={{ textAlign: "center", background: "#000" }}>
          <img src="/favicon.png" />
        </div>
        <br />
        <br />
        <br />
        {props.isSystemAdmin && (
          <div>
            <Link
              to="/claim"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem button key="1">
                <ListItemIcon style={{ color: "white" }}>
                  <InboxIcon />{" "}
                </ListItemIcon>
                <ListItemText
                  primary="Claim"
                  classes={{ primary: classes.listItemText }}
                >
                  <h4>Claim</h4>
                </ListItemText>
              </ListItem>
            </Link>
            <VerticalStepper
              step={props.step}
              texts={props.texts}
              isAdmin={props.isAdmin}
            />
            <Link
              to="/settings"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem button key="2">
                <ListItemIcon style={{ color: "white" }}>
                  <SettingsIcon />{" "}
                </ListItemIcon>
                <ListItemText
                  primary="Admin Settings"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            </Link>

            <Link
              to="/users"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem button key="2">
                <ListItemIcon style={{ color: "white" }}>
                  <SettingsIcon />{" "}
                </ListItemIcon>
                <ListItemText
                  primary="User&nbsp;Management"
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            </Link>
            <Divider />
            <Button
              variant="outlined"
              size="large"
              color="white"
              style={{ color: "#fff", marginTop: "30px" }}
              onClick={() => {
                localStorage.removeItem("_claim");
                window.location.reload(false);
              }}
              startIcon={<MeetingRoomIcon />}
            >
              Logout
            </Button>
          </div>
        )}
        {!props.isSystemAdmin && (
          <div>
            <VerticalStepper
              step={props.step}
              texts={props.texts}
              isAdmin={props.isAdmin}
            />
            <Button
              variant="outlined"
              size="large"
              color="white"
              style={{ color: "#fff", marginTop: "30px" }}
              onClick={() => {
                localStorage.removeItem("_claim");
                window.location.reload(false);
              }}
              startIcon={<MeetingRoomIcon />}
            >
              Logout
            </Button>
          </div>
        )}
      </List>
      <Divider />
    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {/* {setStep(props.step)} */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ backgroundColor: "#fff", color: "black" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={3}>
            <Grid item lg={11}>
              <Typography variant="h6" noWrap>
                ESP-Cloud Claim
              </Typography>
            </Grid>
            <Grid item lg={1}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default DrawerContainer;
