import React, { Fragment } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import gridSearchStyles from '../../components/controls/Styles';
import { Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';



export default function Worktypes(props) {
    const classes = gridSearchStyles();
    var rowItems = props.workTypes.length;
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
                            onChange={props.searchWorkTypes}
                        />
                    </div>
                </Grid>
                <Grid ml={2} item lg={1} sm={1} xs={1} >
                    <Button variant="contained" color="primary" style={{marginLeft:'10px'}} startIcon={<ArrowBack/>} onClick={props.handleLogOut}>Log out</Button>
                </Grid>

            </Grid>

            <h1>Production</h1>
            <hr />
            <Grid container spacing={1}>

                {props.workTypes && props.workTypes.filter(x => x.CategoryName.toLowerCase() == 'production').map(e =>
                    <Grid item lg={2} sm={4} xs={6} key={e.OId}>
                        {id = e.Id}
                        <Box p={2} key={e.OId}>
                            <Chip
                                key={e.OId}
                                label={e.Name}
                                style={{ width: '100%', height: '100%', fontSize: '1.3rem' }}
                                 onClick={() => { props.handleWorkTypeClick(e.OId) }}
                                // onDelete={()=>{}}

                                clickable
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
            <hr />
            <h1>Admin</h1>
            <hr />
            <Grid container spacing={1}>

                {props.workTypes && props.workTypes.filter(x => x.CategoryName.toLowerCase() == 'admin').map(e =>
                    <Grid item lg={2} sm={4} xs={6} key={e.OId}>
                        {id = e.Id}
                        <Box p={2} key={e.OId}>
                            <Chip
                                key={e.OId}
                                label={e.Name}
                                style={{ width: '100%', height: '100%', fontSize: '1.3rem' }}
                                 onClick={() => { props.handleWorkTypeClick(e.OId) }}
                                // onDelete={()=>{}}

                                clickable
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Fragment>
    );
}

