
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import ESPSelect from '../../components/controls/ESPSelect';
import ESPTextField from '../../components/controls/ESPTextField';
import ESPCheckbox from '../../components/controls/ESPCheckbox';
import CardHeader from '@material-ui/core/CardHeader';
import { Avatar } from '@material-ui/core';
import { red,grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            display: 'flex',
            flexWrap: 'wrap',
        },

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },


    }));

const AdminSettingsPage = ({ adminSettings }) => {
    {
        const classes = useStyles();
        const bull = <span className={classes.bullet}>•</span>;
        const props1 = {};
        return (
            <div >
                <Card >
                    <CardHeader title="Database Settings" subheader="ESP database connection settings " avatar={<Avatar aria-label="recipe" style={{ backgroundColor: grey[900] }}> D </Avatar>
                    } />
                    <CardContent></CardContent>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6}   >
                                <TextField
                                    id="standard-full-width"
                                    label="DB Server"
                                    style={{ margin: 8 }}
                                    disabled
                                    placeholder="DB Server"
                                    helperText="Database Server Address"
                                    fullWidth
                                    margin="normal"
                                    value={adminSettings.ServerAddress}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    id="standard-full-width"
                                    label="Login"
                                    style={{ margin: 8 }}
                                    disabled
                                    placeholder="Login"
                                    value={adminSettings.Username}
                                    helperText="Database Username"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item lg={6}   >
                                <TextField
                                    id="standard-full-width"
                                    label="DB Name"
                                    style={{ margin: 8 }}
                                    disabled
                                    placeholder="Database Name"
                                    helperText="Database Name"
                                    fullWidth
                                    value={adminSettings.DatabaseName}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="standard-full-width"
                                    label="Password"
                                    style={{ margin: 8 }}
                                    disabled
                                    value={adminSettings.Passwprd}
                                    placeholder="Placeholder"
                                    helperText="Database password"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>

                <hr />
                <Card >

                    <CardHeader title="General Settings" subheader="Job Claim section settings " avatar={<Avatar aria-label="recipe" style={{ backgroundColor: grey[900] }}> G </Avatar>
                    } />
                    <CardContent>


                        <Grid container spacing={3}>
                            <Grid item lg={6}   >
                                <ESPTextField name='Factory' label='Default Factory' helptext='Name of default Factory' value={adminSettings.Factory} />
                                <ESPCheckbox name='MultipleJobs' label='Enable Multiple Jobs' checked={adminSettings.MultipleJobs} />
                                <ESPTextField name='IncrementPercentage' label='Increment' helptext='Percentage (%) increment' type='number' value={adminSettings.IncrementPercentage} />
                                <ESPSelect name='ShowingCode' label='Show Quote Number' helptext='Show V6 Quote Number/ESP Code on Job' items={adminSettings.ShowingCode} />


                                <Grid container lg={12}>
                                    <Grid item lg={3}   >
                                        <ESPCheckbox name='TrackLateLogin' label='Track late login' checked={adminSettings.TrackLateLogin} />
                                    </Grid>
                                    <Grid item lg={9}   >
                                        <ESPTextField name='LateAllowance' label='Late Login Min' helptext='Number of minutes allowed for late login' type='number' value={adminSettings.LateAllowance} />
                                    </Grid>
                                </Grid>
                                <ESPCheckbox name='HidePreProductionJobs' label='Hide Pre-production jobs at job claim step' checked={adminSettings.HidePreProductionJobs} />

                            </Grid>

                            <Grid item lg={6}>
                                <ESPSelect name='Groups' label='Default Groups' helptext='Select Groups for claim' items={adminSettings.Groups} />
                                <ESPCheckbox name='ScheduledJobs' label='Show Scheduled Jobs After Claim' checked={adminSettings.ScheduledJobs} />
                                <ESPSelect name='JobListOrdering' label='Job List Order' helptext='Order Showed in Job List Page' items={adminSettings.JobListOrdering} />
                                <ESPCheckbox name='CanFinishWholeJob' label='Enable Finish Whole Job feature' checked={adminSettings.CanFinishWholeJob} />
                                <ESPCheckbox name='AllowClaimingOutOfFactoryWork' label='Allow claiming on Out of Factory work' checked={adminSettings.AllowClaimingOutOfFactoryWork} />

                                <Grid container lg={12}>
                                    <Grid item lg={3}   >
                                        <ESPCheckbox name='TrackEarlyLeave' label='Track early leave' checked={adminSettings.TrackEarlyLeave} />
                                    </Grid>
                                    <Grid item lg={9}   >
                                        <ESPTextField name='EarlyLeaveAlloance' label='Early Leave Min' helptext='Number of minutes allowed for early leave' type='number' value={adminSettings.EarlyLeaveAlloance} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
                <hr />
                <Card >
                    <CardHeader title="Production Board" subheader="Production Board Section Settings" avatar={<Avatar aria-label="recipe" style={{ backgroundColor: grey[900] }}> P </Avatar>
                    } />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6}   >
                                <Grid container lg={12}>
                                    <Grid item lg={6}   >
                                        <ESPCheckbox name='PBShowProductionBoard' label='Enable Production Board' checked={adminSettings.PBShowProductionBoard} />
                                    </Grid>
                                    <Grid item lg={6}   >
                                        <ESPCheckbox name='PBHideOutOfFactoryWorkTypes' label='Hide Out of Factory WorkTypes' checked={adminSettings.PBHideOutOfFactoryWorkTypes} />
                                    </Grid>
                                </Grid>

                                <Grid container lg={12}>
                                    <Grid item lg={12}   >
                                        <label >Extra Columns</label>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <ESPCheckbox name='PBTitleColumn' label='Title' checked={adminSettings.PBTitleColumn} />
                                    </Grid>
                                    <Grid item lg={4}>
                                        <ESPCheckbox name='PBHourColumn' label='Hours' checked={adminSettings.PBHourColumn} />
                                    </Grid>
                                    <Grid item lg={4}>
                                        <ESPCheckbox name='PBDueDateColumn' label='Due Date' checked={adminSettings.PBDueDateColumn} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item lg={6}>
                                <ESPSelect name='PBJobOrders' label='Job Order' helptext='Listing Job Order' items={adminSettings.PBJobOrders} />
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
                <hr />
                <Card >
                    <CardHeader title="Performance Statistics" subheader="Performance Statistics Section Settings" avatar={<Avatar aria-label="recipe" style={{ backgroundColor: grey[900] }}> S </Avatar>
                    } />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6}   >
                                <ESPCheckbox name='PSShowPerformanceStates' label='Enable Performance Stats' checked={adminSettings.PSShowPerformanceStates} />
                                <ESPSelect name='PSStatisticChart' label='Statistic Chart Type' helptext='' items={adminSettings.PSStatisticChart} />
                            </Grid>

                            <Grid item lg={6}>
                                <ESPCheckbox name='PSEnableIndividual' label='Enable Individual Performance Stats' checked={adminSettings.PSEnableIndividual} />
                                <ESPSelect name='PSStatisticGroup' label='Statistic Group' helptext='' items={adminSettings.PSStatisticGroup} />
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>

            </div>
        );
    }

};

export default AdminSettingsPage;