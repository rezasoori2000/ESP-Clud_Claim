import React from 'react';
import {connect} from 'react-redux';

const Claim=()=>(
    <div>
        <h1>the claim page</h1>
    </div>
);

const mapStateToProps =state=>({channels:state.channels});




export default Claim;
