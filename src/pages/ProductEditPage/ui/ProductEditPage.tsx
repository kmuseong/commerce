import classes from './ProductEditPage.module.css';
import React from 'react';
import { ProductEditForm } from '@/features/productEdit';

export const ProductEditPage: React.FC = () => {
    return (
        <div className={classes.layout}>
            <header className={classes.header}>상품추가</header>
            <ProductEditForm />
        </div>
    );
};
