import React from 'react';

export default function Loading() {

    return(
        <img src={process.env.PUBLIC_URL + '/loading.gif'}   style={{ display: 'block', marginLeft:'auto',marginRight:'auto' }}/>
    )
}
