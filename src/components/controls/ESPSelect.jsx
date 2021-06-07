import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


const ESPSelect = ({ name, label, helptext,onPropertyChange, items }) => {
    if (!items)
        return <div></div>
    else
        return (

            <FormControl fullWidth variant="outlined" style={{ marginBottom: 20 }}>
                {label}
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id={name}
                    value={items && items.length > 0 ? (items.filter(x => x.Selected).length>0? items.filter(x => x.Selected)[0].Value: -1) : -1}
                    onChange={onPropertyChange}
                    name={name}
                    type='select'
                >
                    <MenuItem value="-1">
                        <em>Select</em>
                    </MenuItem>
                    {items && items.map(e => <MenuItem key={e.Value} value={e.Value}>{e.Text}</MenuItem>)}
                </Select>
                <FormHelperText>{helptext}</FormHelperText>
            </FormControl>
        )
}
export default ESPSelect;