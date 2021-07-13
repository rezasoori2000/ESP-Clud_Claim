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
import BarChartIcon from "@material-ui/icons/BarChart";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import VerticalStepper from "./controls/VerticalStepper";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
        background: "black",
        color: "white",
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

// interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
// }
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
    <div>
      <div className="theme.mixins.toolbar, drawerPaper: 240" />
      <Divider />
      <List className="mt-5" style={{ backgroundColor: "#2d292a" }}>
        <div style={{ textAlign: "center", background: "#000" }}>
          {/* <img src='/favicon.png' /> */}
        </div>

        <br />
        <br />
        <br />
        <Link to="/claim" style={{ textDecoration: "none", color: "white" }}>
          <ListItem button key="1">
            <ListItemIcon style={{ color: "white" }}>
              <InboxIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Claim" />
          </ListItem>
        </Link>
        <hr />
        <Link to="/settings" style={{ textDecoration: "none", color: "white" }}>
          <ListItem button key="2">
            <ListItemIcon style={{ color: "white" }}>
              <SettingsIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Admin Settings" />
          </ListItem>
        </Link>
        <hr />
        <Link
          to="/performanceState"
          style={{ textDecoration: "none", color: "white" }}
        >
          <ListItem button key="3">
            <ListItemIcon style={{ color: "white" }}>
              <BarChartIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItem>
        </Link>
        <hr />
        <Link to="/board" style={{ textDecoration: "none", color: "white" }}>
          <ListItem button key="3">
            <ListItemIcon style={{ color: "white" }}>
              <BusinessIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Production Board" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <VerticalStepper step={props.step} texts={props.texts} />
    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {/* {setStep(props.step)} */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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
