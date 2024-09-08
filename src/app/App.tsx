import ReactQuery from '@/app/provider/ReactQuery';
import Router from '@/app/provider/Router';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {
    return (
        <HelmetProvider>
            <ReactQuery>
                <Router />
            </ReactQuery>
        </HelmetProvider>
    );
};

export default App;
