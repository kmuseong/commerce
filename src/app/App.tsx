import ReactQuery from '@/app/provider/ReactQuery';
import Router from '@/app/provider/Router';
import React from 'react';

const App: React.FC = () => {
    return (
        <ReactQuery>
            <Router />
        </ReactQuery>
    );
};

export default App;
