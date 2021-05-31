import React from 'react';
import {connect} from 'react-redux';
import getAdminSettings from '../../store/actions/adminSettings';
import AdminSettingsPage from './AdminSettingsPage';



class AdminSettingsContainer extends React.Component{

    componentWillMount(){
        this.props.getAdminSettings();
    }
render(props){

    return <AdminSettingsPage adminSettings={this.props.adminSettings}/>
}

};
const mapStateToProps =state=>({adminSettings:state.adminSettings});

const mapDispatchToPRops=dispatch=>({
    getAdminSettings:()=>{
        dispatch(getAdminSettings());
    }
});

export default connect(mapStateToProps,mapDispatchToPRops)(AdminSettingsContainer);

