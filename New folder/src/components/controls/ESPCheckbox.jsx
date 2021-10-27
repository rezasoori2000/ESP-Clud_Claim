import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';


const ESPCheckbox = React.memo(({ name, label, checked,onPropertyChange,row=12 }) => {
    return (
            <Grid item lg={row}>
            <FormControlLabel  style={{marginBottom:20}} control={
                <Checkbox
                
                    checked={typeof checked ==='undefined'? false: checked}
                    onChange={onPropertyChange}
                    name={name}
                    id={name}
                    color="primary"
                />
            }
                label={label}
            />
            </Grid>
        
    
    )});
    export default ESPCheckbox;