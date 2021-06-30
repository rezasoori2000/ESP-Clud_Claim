import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import gridSearchStyles from '../../components/controls/Styles';
import { Button, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';



export default function Worktypes(props) {
    const classes = gridSearchStyles();


    return (
        <Fragment>
            <Grid container>
                <Grid ml={0} item lg={12} sm={12} xs={12} style={{ textAlign: 'right' }}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => { this.props.handleBack(1) }}
                        startIcon={<ArrowBack />}>
                        Back
                        </Button>
                </Grid>
                <Grid item lg={12} sm={8} xs={12} >

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


            </Grid>


            <hr />
            <Grid container >

                {props.workTypes && props.workTypes.map(e =>
                    <Grid item lg={2} sm={6} xs={12} key={e.OId} className={classes.bolding}>

                        <Box p={2} key={e.OId}>
                            <Card>
                                <CardContent
                                    key={e.OId}

                                    style={{ width: '100%', height: '100%', fontSize: '1.3rem', textAlign: 'center' }}
                                    onClick={() => { props.handleWorkTypeClick(e.OId) }}
                                    // onDelete={()=>{}}

                                    clickable
                                >
                                    {e.Name}
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                )}
            </Grid>
            <hr />
        </Fragment>
    );
}

