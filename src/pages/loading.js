import React from 'react';


export default function Loading() {

    return(
        <img src={process.env.PUBLIC_URL + '/loading.gif'}   style={{ alignSelf: 'center' }}/>
    )
}
