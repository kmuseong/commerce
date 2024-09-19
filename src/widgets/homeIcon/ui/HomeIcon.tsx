import React from 'react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HomeIcon: React.FC = () => {
    const navigate = useNavigate();

    return <Home onClick={() => navigate('/')} />;
};
