// import logo from './logo.svg';
import './App.css';
import { makeStyles,  Theme, createStyles } from '@material-ui/core/styles';
import DrawerContainer from './components/DrawerContainer';
import {Route} from 'react-router-dom';
import Performance from './pages/Performance';
import  Claim from './pages/Claim/ClaimFull';
import Settings from './pages/AdminSettings/AdminSettingsContainer';
import Board from './pages/Board';
import Welcome from './pages/Welcome';
import ClaimContainer from './pages/Claim/ClaimContainer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
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
  }),
);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DrawerContainer/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Route exact path='/' component={Welcome}/>
          <Route path='/claim' component={ClaimContainer}/>
          <Route path='/settings' component={Settings}/>
          <Route path='/performanceState' component={Performance}/>
          <Route path='/board' component={Board}/>

      </main> 
    </div> 
  );
}

export default App;
