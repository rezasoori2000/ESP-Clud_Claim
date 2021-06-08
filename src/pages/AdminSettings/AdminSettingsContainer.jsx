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
            user: {},
            changes:[]
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

            var changes=this.state.changes;
            changes.push({
                name:event.target.name,
                value:value    
            });
        
        adSettings[event.target.name] = value;
        this.setState({
            ...this.state,
            changes,
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
                    'Disabled': false,
                    'Group': null,
                    'Selected': true,
                });
            else
                newValues.push({
                    'Value': item.Value,
                    'Text': item.Text,
                    'Disabled': false,
                    'Group': null,
                    'Selected': false
                });
        });
        var changes=this.state.changes;

        changes.push({
            name:event.target.name,
            value:newSelectedId    
        });

        adSettings[event.target.name] = newValues;
        adSettings[event.target.name+"Id"] = newSelectedId;
        this.setState({
            ...this.state,
            changes,
            adminSettings: adSettings

        });
    }
    captureIPAddress = async () => {
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
        let state = this.state.adminSettings;
        // let data = {
        //     User:"",
        //     IP: this.state.IP,
        //     Id: state.Id,
        //     FactoryId: state.Factories.filter(x => x.Selected)[0].Value,
        //     GroupId: state.Groups.filter(x => x.Selected)[0].Value,
        //     MultipleJobs: false,
        //     ScheduledJobs: false,
        //     IncrementPercentage: 0,
        //     JobListOrderingId: state.JobListOrdering.filter(x => x.Selected)[0].Value,
        //     ShowingCodeId: state.ShowingCode.filter(x => x.Selected)[0].Value,
        //     CanFinishWholeJob: false,
        //     AllowClaimingOutOfFactoryWork: false,
        //     TrackLateLogin: false,
        //     LateAllowance: 0,
        //     TrackEarlyLeave: false,
        //     EarlyLeaveAlloance: 0,
        //     HidePreProductionJobs: false,
        //     PBShowProductionBoard: false,
        //     PBJobOrderId: state.PBJobOrders.filter(x => x.Selected)[0].Value,
        //     PBTitleColumn: false,
        //     PBHourColumn: false,
        //     PBDueDateColumn: false,
        //     PBHideOutOfFactoryWorkTypes: false,
        //     PSShowPerformanceStates: false,
        //     PSStatisticChartId: state.PSStatisticChart.filter(x => x.Selected)[0].Value,
        //     PSStatisticGroupId: state.PSStatisticGroup.filter(x => x.Selected)[0].Value,
        //     PSPerformanceChartId: state.PSPerformanceChart.filter(x => x.Selected)[0].Value,
        //     PSEnableIndividual: false,
        // }
       var data=JSON.stringify(state);
        try {
            const headers = {
                'Content-Type': 'application/json',
                            }

            axios.post(`${config.apiUrl}adminSettings`,data, {
                headers: headers
            })
                .then((res) => {
                     let response=res.data[0];
                     this.props.history.push('/');
                })
                .catch((error) => {
                    alert(`Error in saving data- ${error}`);
                })

        }
        catch (err) {
            alert(`Error in calling ESP API- ${err}`);
        }
    };

    render(props) {
        
        return (
            <AdminSettingsPage adminSettings={this.state.adminSettings || null} onPropertyChange={this.handelPropertyChange} onSelectChange={this.onSelectChange} onSave={this.saveAdminSettingsByAPI}/>
        )



    }
};

export default AdminSettingsContainer;

