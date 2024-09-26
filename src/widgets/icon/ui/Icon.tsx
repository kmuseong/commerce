import React from 'react';
import { Home, ChevronLeft, User, TextSearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IconProps } from '@/widgets/icon/model/type';
import classes from './Icon.module.css';

export const HomeIcon: React.FC<IconProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.icon} onClick={() => navigate('/')}>
            <Home strokeWidth={1} />
            {children && <div>{children}</div>}
        </div>
    );
};

export const BackIcon: React.FC<IconProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.icon} onClick={() => navigate(-1)}>
            <ChevronLeft strokeWidth={1} />
            {children && <div>{children}</div>}
        </div>
    );
};

export const ProfileIcon: React.FC<IconProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.icon} onClick={() => navigate(`/profile`)}>
            <User strokeWidth={1} />
            {children && <div>{children}</div>}
        </div>
    );
};

export const CategoryIcon: React.FC<IconProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.icon} onClick={() => navigate(`/products`)}>
            <TextSearchIcon strokeWidth={1} />
            {children && <div>{children}</div>}
        </div>
    );
};
