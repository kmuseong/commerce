import classes from './ProductEditPage.module.css';
import React from 'react';
import { ProductEditForm } from '@/features/productEdit';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LOGO_NAME } from '@/shared/config/constants';

export const ProductEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 상품 수정</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/products/${id}/edit`} />
            </Helmet>

            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                상품수정
            </header>
            <ProductEditForm />
        </>
    );
};
