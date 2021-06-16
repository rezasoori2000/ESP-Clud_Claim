import React, { Fragment } from 'react';
import gridSearchStyles from '../../components/controls/Styles';
import { Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Slider from '@material-ui/core/Slider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';


class JobItems extends React.Component {
    constructor(props) {
        super();

        this.state = {
            jobItems: props.items,
        };

    }


    componentWillMount() {

    }
    componentDidMount() {

    }
    handleChange = (val, inx) => {

        const items = this.state.jobItems;
        if (val >= items[inx].Main_Progress) 
            items[inx].Progress = parseInt(val);

            this.setState({
                ...this.state,
                jobItems: items
            });
        }
        handleBtn = (val, inx) => {
            let itms = this.state.jobItems;

            if (itms[inx].Progress + val >= itms[inx].Main_Progress) {
                itms[inx].Progress = itms[inx].Progress + parseInt(val);

                this.setState({
                    ...this.state,
                    jobItems: itms,
                });
            }
        }
        render() {
            // const classes = gridSearchStyles();
            let id = 0;

            function valuetext(value) {
                return `${value}%`;
            }
            return (
                <Fragment>
                    <Table aria-label="customized table">
                        <TableBody >
                            <TableRow>
                                <TableCell colSpan='4' style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        size="large"
                                        onClick={() => { this.props.handleBack(2) }}
                                        startIcon={<ArrowBack />}>
                                        Back
                            </Button>
                                </TableCell>
                                <TableCell style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}>
                                        Save
                            </Button>

                                </TableCell>
                            </TableRow>
                            {this.state.jobItems && this.state.jobItems.map((e, inx) => (
                                <TableRow hover='true'>
                                    <TableCell style={{ width: '20%' }}>{e.Name}</TableCell>
                                    <TableCell style={{ width: '50%' }}>
                                        <Slider
                                            value={e.Progress}
                                            getAriaValueText={valuetext}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={5}
                                            marks
                                            min={0}
                                            max={100}
                                            onChangeCommitted={(e, val) => this.handleChange(val, inx)}
                                            onChange={(e, val) => this.handleChange(val, inx)}
                                        />
                                    </TableCell>
                                    <TableCell style={{ width: '20%' }}>
                                        <OutlinedInput
                                            value={e.Progress || ''}
                                            onChange={(event) => this.handleChange(event.target.value, inx)}
                                            type='number'
                                            name={`pgs-${e.name}`}
                                            key={inx}
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell style={{ width: '5%' }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => this.handleBtn(-5, inx)}
                                            startIcon={<RemoveIcon />}>
                                        </Button>
                                    </TableCell>
                                    <TableCell style={{ width: '5%' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.handleBtn(5, inx)}
                                            startIcon={<AddIcon />}>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan='4' style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        size="large"
                                        onClick={() => { this.props.handleBack(2) }}
                                        startIcon={<ArrowBack />}>
                                        Back
                            </Button>
                                </TableCell>
                                <TableCell style={{ textAlign: 'right' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}>
                                        Save
                            </Button>

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Fragment>
            );
        }
    }
    export default JobItems;