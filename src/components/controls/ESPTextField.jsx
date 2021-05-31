import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

const ESPTextField =({name,label,helptext,value,type='text'})=>{
    
    return(
        <FormControl variant="outlined"fullWidth style={{marginBottom:20}} >
        {label}
        <OutlinedInput id="`text-${name}`"
            value={value}
            //onChange={handleChange}
            name={name}
            type={type}
            id={name}
            label={label}
        /> 
        <FormHelperText>{helptext}</FormHelperText>
    </FormControl>
    )
}
export default ESPTextField;