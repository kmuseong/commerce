import { FC } from 'react';
import { Home, ChevronLeft, User, TextSearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IconProps } from '@/widgets/icon/model/type';
import classes from './Icon.module.css';

export const HomeIcon: FC<IconProps> = ({ children, isBorder = false }) => {
    const navigate = useNavigate();

    return (
        <div className={`${classes.icon} ${isBorder ? classes.border : ''}`} onClick={() => navigate('/')}>
            <Home fill="white" strokeWidth={1} />
            {children && <div>{children}</div>}
        </div>
    );
};

export const BackIcon: FC<IconProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.border} onClick={() => navigate(-1)}>
            <ChevronLeft strokeWidth={1} />
            {children && <div>{children}</div>}
        </div>
    );
};

export const ProfileIcon: FC<IconProps> = ({ children, isBorder = false }) => {
    const navigate = useNavigate();

    return (
        <div className={`${classes.icon} ${isBorder ? classes.border : ''}`} onClick={() => navigate(`/profile`)}>
            <User fill="white" strokeWidth={1} />
            {children && <div>{children}</div>}
        </div>
    );
};

export const CategoryIcon: FC<IconProps> = ({ children, isBorder = false }) => {
    const navigate = useNavigate();

    return (
        <div className={`${classes.icon} ${isBorder ? classes.border : ''}`} onClick={() => navigate(`/products`)}>
            <TextSearchIcon fill="white" strokeWidth={1} />
            {children && <div>{children}</div>}
        </div>
    );
};
