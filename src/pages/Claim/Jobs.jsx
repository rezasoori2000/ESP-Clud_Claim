import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import gridSearchStyles from '../../components/controls/Styles';
import { Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

export default function Jobs(props) {
    const classes = gridSearchStyles();
    var rowItems = props.jobs.length;
    let id = 0;
    let newProps = {};

    return (
        <Fragment>
            <Grid container>
                <Grid item lg={11} sm={11} xs={11} >
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
                <Grid ml={2} item lg={1} sm={1} xs={1} >
                    <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} startIcon={<ArrowBack />} onClick={props.handleLogOut}>Log out</Button>
                </Grid>
            </Grid>
            <Accordion  defaultExpanded='true'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                   
                >
                    <Typography >Production</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Grid container spacing={1}>

                        {props.jobs && props.jobs.filter(x => x.JobStageName.toLowerCase() == 'production').map(e =>
                            <Grid item lg={2} sm={4} xs={6} key={e.OId}>
                                {id = e.Id}
                                {/* <Box p={2} key={e.OId}> */}
                                <Box elevation={3} key={e.OId} spacing={1} mb={1}  >

                                    <TableContainer component={Paper} bgColor='#666' style={{ height: '150px' }}>
                                        <Table aria-label="customized table" >
                                            <TableBody  >
                                                <TableRow style={{ backgroundColor: '#eee' }}  >

                                                    <TableCell align='center'>{e.Code == e.V6Code ? `Code: ${e.Code}` : `ESP#:${e.Code}   -   V6#: ${e.V6Code}`}</TableCell >
                                                </TableRow>
                                                <TableRow >

                                                    <TableCell style={{ borderBottom: "none" }}  >{e.Title}</TableCell >
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                            </Grid>
                        )}
                    </Grid>


                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Post Production</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>

                        {props.jobs && props.jobs.filter(x => x.JobStageName.toLowerCase() == 'postproduction').map(e =>
                            <Grid item lg={2} sm={4} xs={6} key={e.OId}>
                                {id = e.Id}
                                <Box elevation={3} key={e.OId} spacing={1} mb={1}  >

                                    <TableContainer component={Paper} bgColor='#666' style={{ height: '150px' }}>
                                        <Table aria-label="customized table" >
                                            <TableBody  >
                                                <TableRow style={{ backgroundColor: '#eee' }}  >

                                                    <TableCell align='center'>{e.Code == e.V6Code ? `Code: ${e.Code}` : `ESP#:${e.Code}   -   V6#: ${e.V6Code}`}</TableCell >
                                                </TableRow>
                                                <TableRow >

                                                    <TableCell style={{ borderBottom: "none" }}  >{e.Title}</TableCell >
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                </AccordionDetails>
            </Accordion>
        </Fragment>
    );
}

