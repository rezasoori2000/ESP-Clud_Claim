import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';


const ESPTextField =({name,label,helptext,value,type='text',onPropertyChange})=>{
    
    return(
        <FormControl variant="outlined"  fullWidth style={{marginBottom:20}} >
        {label}
        <OutlinedInput 
            value={value||''}
            //onChange={handleChange}
            name={name}
            type={type}
            id={name}
            label={label}
            onChange={onPropertyChange}
            fullWidth
        /> 
        <FormHelperText>{helptext}</FormHelperText>
    </FormControl>
    )
}
export default ESPTextField;