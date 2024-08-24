import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface ReactQueryProps {
    children: React.ReactNode;
}

const ReactQuery: React.FC<ReactQueryProps> = ({ children }) => {
    const queryClient = new QueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQuery;
