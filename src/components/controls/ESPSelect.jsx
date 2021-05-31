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

const ESPSelect = ({ name, label, helptext, items }) => {
    if (!items)
        return <div></div>
    else
        return (

            <FormControl fullWidth variant="outlined" style={{ marginBottom: 20 }}>
                {label}
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id={name}
                    value={items && items.length > 0 ? items.filter(x => x.Selected)[0].Id : -1}
                //onChange={handleChange}
                >
                    <MenuItem value="-1">
                        <em>Select</em>
                    </MenuItem>
                    {items && items.map(e => <MenuItem value={e.Id}>{e.Name}</MenuItem>)}
                </Select>
                <FormHelperText>{helptext}</FormHelperText>
            </FormControl>
        )
}
export default ESPSelect;