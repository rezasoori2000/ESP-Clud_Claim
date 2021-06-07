import React from 'react';
import AdminSettingsPage from './AdminSettingsPage';
import config from '../../config';
import axios from 'axios';
import { TitleSharp } from '@material-ui/icons';

class AdminSettingsContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            adminSettings: {},
            user: {}
        }

    }
    componentWillMount() {
        this.getAdminSettingsByAPI();
        this.captureIPAddress();

    }
    handelPropertyChange = (event) => {
        var adSettings = this.state.adminSettings;

        let value = '';
        if (event.target.type != undefined && event.target.type === 'checkbox')
            value = event.target.checked;
        else
            value = event.target.value;


        console.log(`${event.target.name}  ${value}`);
        adSettings[event.target.name] = value;
        this.setState({
            ...this.state,
            adSettings
        });
    }
    onSelectChange = (event) => {
        var adSettings = this.state.adminSettings;
        var newSelectedId = event.target.value;
        let newValues = [];
        adSettings[event.target.name].map((item) => {
            if (item.Value == newSelectedId)
                newValues.push({
                    'Value': item.Value,
                    'Text': item.Text,
                    'Disabled':false,
                    'Group':null,
                    'Selected': true,
                });
            else
                newValues.push({
                    'Value': item.Value,
                    'Text': item.Text,
                    'Disabled':false,
                    'Group':null,
                    'Selected': false
                });
        });
        adSettings[event.target.name] = newValues;
        this.setState({
            ...this.state,
            adminSettings: adSettings

        });
    }
    captureIPAddress=async()=> {
        fetch('https://api.ipify.org?format=jsonp?callback=?', {
          method: 'GET',
          headers: {},
        })
        .then(res => {
          return res.text()
        }).then(ip => {
            this.setState({
                ...this.state,
                ip
            });
        });
      }
    

    getAdminSettingsByAPI = async () => {
        var response = {};
        try {
            const res = await axios.get(`${config.apiUrl}adminSettings`);
            response = JSON.parse(res.data);
            this.setState({
                ...this.state,
                adminSettings: response
            });
        }
        catch (err) {
            alert(`Error in calling ESP API- ${err}`);
        }
    };

    saveAdminSettingsByAPI = async () => {
        var response = {};
        var payload={
            user:'',
            adminSettings:this.state.adminSettings,
        };
        try {
            const res = await axios.post(`${config.apiUrl}adminSettings`,this.state);
            response = JSON.parse(res.data);
            this.setState({
                ...this.state,
                adminSettings: response
            });
        }
        catch (err) {
            alert(`Error in calling ESP API- ${err}`);
        }
    };

    render(props) {
        return (
            <AdminSettingsPage adminSettings={this.state.adminSettings || null} onPropertyChange={this.handelPropertyChange} onSelectChange={this.onSelectChange} />
        )



    }
};

export default AdminSettingsContainer;

