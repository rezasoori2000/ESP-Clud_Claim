import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

const ESPCheckbox = ({ name, label, checked,row=12 }) => {
    return (
        <Grid item lg={row}>
            <FormControlLabel fullWidth style={{marginBottom:20}} control={
                <Checkbox
                fullWidth
                    checked={checked}
                    //   onChange={handleChange}
                    name={name}
                    color="primary"
                />
            }
                label={label}
            />
            </Grid>
    )};
    export default ESPCheckbox;