import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import get_API_AdminSettings, { update_AdminSettings_State } from '../../store/actions/adminSettingsAction';
import AdminSettingsPage from './AdminSettingsPage';



class AdminSettingsContainer extends React.Component {

    componentWillMount() {
        this.props.getAdminSettingsByAPI();

    }
    handelPropertyChange = (event) => {

        this.props.updateAdminSettingsState(event);
    }

    render(props) {
        return (
            <AdminSettingsPage adminSettings={this.props.state_adminSettings || null} onPropertyChange={this.handelPropertyChange} />
        )



    }
};
const mapStateToProps = state => ({
    state_adminSettings: state.adminSettings
});

const mapDispatchToProps = dispatch => {
    return {
        getAdminSettingsByAPI: () => {
            dispatch(get_API_AdminSettings());
        },
        updateAdminSettingsState: (event) => {
            dispatch(update_AdminSettings_State(event));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSettingsContainer);

