import { CreateProductForm } from '@/features/createProduct';
import classes from './CreateProductPage.module.css';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.layout}>
            <header className={classes.header}>
                <ChevronLeft onClick={() => navigate(-1)} />
                상품추가
            </header>
            <CreateProductForm />
        </div>
    );
};
