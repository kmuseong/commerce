import React from 'react';
import { LoadingProps } from '@/widgets/Load/model/type';
import { BounceLoader } from 'react-spinners';
import classes from './Loading.module.css';

export const Loading: React.FC<LoadingProps> = ({ children }) => {
    return (
        <div className={classes.container}>
            <BounceLoader color="white" />
            {children}
        </div>
    );
};
