import { CreateProductForm } from '@/features/createProduct';
import classes from './CreateProductPage.module.css';
import React from 'react';

export const CreateProductPage: React.FC = () => {
    return (
        <div className={classes.layout}>
            <header className={classes.header}>상품추가</header>
            <CreateProductForm />
        </div>
    );
};
