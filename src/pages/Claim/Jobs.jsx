import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import gridSearchStyles from '../../components/controls/Styles';
import { Button, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export default function Jobs(props) {
    const classes = gridSearchStyles();

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid ml={0} item lg={11} sm={10} xs={8} style={{ textAlign: 'right' }}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => { this.props.handleBack(0) }}
                        startIcon={<ArrowBack />}>
                        Back
                        </Button>
                </Grid>
                <Grid ml={0} item lg={1} sm={2} xs={4} style={{ textAlign: 'right' }}>

                    <Button

                        variant="outlined"

                        size="large"

                        onClick={props.handleLogOut}
                        startIcon={<MeetingRoomIcon />}>
                        logout
                        </Button>
                    {/* <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} startIcon={<MeetingRoomIcon />} onClick={props.handleLogOut}>Logout</Button> */}
                </Grid>
                <Grid item lg={12} sm={12} xs={12} >
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={props.searchJobs}
                        />
                    </div>
                </Grid>
            </Grid>
            <Accordion defaultExpanded='true'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography >Production</Typography>
                </AccordionSummary>

                <AccordionDetails>
                </AccordionDetails>
                <Grid container spacing={1}>
                    {props.jobs && props.jobs.map(e =>

                        <Grid item lg={2} sm={6} xs={12} key={e.OId} className={classes.bolding}>
                            <Box p={4}
                                key={e.OId}
                                boxShadow={4}
                                color="black"
                                bgcolor={e.IsLoggedIn ? '#757de8' : 'white'}
                                spacing={3}
                                style={{ width: '100%', height: '100%', fontSize: '1.3rem', textAlign: 'center' }}
                                onClick={() => { props.handleJobClick(e.OId) }}>
                                <div style={{ backgroundColor: '#eee' }}>
                                    {e.Code === e.V6Code ? `Code: ${e.Code}` : e.V6Code == null ? `Code: ${e.Code}` : `ESP#:${e.Code}   -   V6#: ${e.V6Code}`}
                                </div>
                                <hr />
                                <div>
                                    {e.Title}
                                </div>

                            </Box>
                        </Grid>

                    )}
                </Grid>
            </Accordion>
            <Accordion defaultExpanded='true'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography >Admin</Typography>
                </AccordionSummary>

                <AccordionDetails>
                </AccordionDetails>
                <Grid container spacing={1}>
                    {props.jobs && props.adminJobs.map(e =>

                        <Grid item lg={2} sm={6} xs={12} key={e.OId} className={classes.bolding}>
                            <Box p={4}
                                key={e.OId}
                                boxShadow={4}
                                color="black"
                                bgcolor={e.IsLoggedIn ? '#757de8' : 'white'}
                                spacing={3}
                                style={{ width: '100%', height: '100%', fontSize: '1.3rem', textAlign: 'center' }}
                                onClick={() => { props.handleJobClick(e.OId) }}>

                                <div>
                                    {e.Name}
                                </div>

                            </Box>
                        </Grid>

                    )}
                </Grid>
            </Accordion>

        </Fragment>
    );
}

