import React from 'react';
import './App.css';
import DrawerContainer from './components/DrawerContainer';
import { Route } from 'react-router-dom';
import Performance from './pages/Performance';
import Settings from './pages/AdminSettings/AdminSettingsContainer';
import Board from './pages/Board';
import Welcome from './pages/Welcome';
import ClaimContainer from './pages/Claim/ClaimContainer';





class App extends React.Component {


  constructor() {
    super();
    this.state = {
      step: 0
    }

  }

  changeStep = (j) => {
    this.setState({
      ...this.state,
      step: j
    });



}

  render() {

      return (
      <div style={{ display: 'flex'}}>
        <DrawerContainer step={this.state.step}/>
        <main style={{flexGrow: 1, paddingLeft:'10px', paddingRight:'10px',paddingTop:'80px'}}>
          <div style={{drawerPaper: {width: 240 }}} />
          <Route exact path='/' component={Welcome} />
          <Route path='/claim'  render={(props)=><ClaimContainer changeStep={this.changeStep} {...props}/> }  />
          <Route path='/settings' render={(props)=><Settings changeStep={this.changeStep} {...props}/> } />
          <Route path='/performanceState' component={Performance} />
          <Route path='/board' component={Board} />
        </main>
      </div>

    )
  }
}




export default App;
