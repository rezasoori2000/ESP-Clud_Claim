import React, { Fragment } from 'react';
import { fade, makeStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import gridSearchStyles from '../../components/controls/Styles';


export default function Login(props) {
    const classes =gridSearchStyles();
    var rowItems = props.items.length;
    let id = 0;
    let newProps = {};
    console.log('runned');
    return (
        <Fragment>
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
                    onChange={props.searchNames}
                />
            </div>
            <Grid container spacing={1}>
                {props.items && props.items.map(e =>
                    <Grid item lg={2} sm={4} xs={6} key={e.OId}>
                        {id = e.Id}
                        <Box p={2} key={e.OId}>
                            <Chip
                                key={e.OId}
                                label={e.Fullname}
                                style={{ width: '100%', height: '100%', fontSize: '1.3rem' }}
                                onClick={() => { props.handleLogin(e.OId) }}
                                // onDelete={()=>{}}
                                {...(e.LoggedIn && e.LoggedIn.Hours > 0 && { deleteIcon: <DoneIcon />, color: 'primary', icon: <FaceIcon /> })}
                                clickable
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Fragment>
    );
}

