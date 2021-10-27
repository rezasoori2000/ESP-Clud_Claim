import React from 'react';
const Loading=React.lazy(()=>import('../loading.js'));

const ClaimFull=()=>(
    <div>
        <h1>asdfasdf</h1>
        <React.Suspense fallback="Loading...">
        <Loading />
        </React.Suspense>

        <h1>the claim full page</h1>
    </div>
);

export default ClaimFull;
