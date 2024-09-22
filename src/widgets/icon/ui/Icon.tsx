import React from 'react';
import { Home, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HomeIcon: React.FC = () => {
    const navigate = useNavigate();

    return <Home onClick={() => navigate('/')} />;
};

export const BackIcon: React.FC = () => {
    const navigate = useNavigate();

    return <ChevronLeft onClick={() => navigate(-1)} />;
};
