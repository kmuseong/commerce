import classes from './ProductEditPage.module.css';
import React from 'react';
import { ProductEditForm } from '@/features/productEdit';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';
import { BackIcon } from '@/widgets/icon';

export const ProductEditPage: React.FC = () => {
    const { id } = useParams();

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 상품 수정</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/products/${id}/edit`} />
            </Helmet>

            <header className={classes.header}>
                <BackIcon />
                상품수정
            </header>
            <ProductEditForm />
        </>
    );
};
