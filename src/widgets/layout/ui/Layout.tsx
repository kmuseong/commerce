import React from 'react';
import classes from './Layout.module.css';
import { LayoutProps } from '@/widgets/layout/model/type';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div className={classes.layout}>{children}</div>;
};
