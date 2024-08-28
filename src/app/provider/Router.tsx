import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { HomePage } from '@/pages/HomePage';
import { CreateProductPage } from '@/pages/CreateProductPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ProductEditPage } from '@/pages/ProductEditPage';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/** 유저페이지 */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/** 상품 CRUD */}
                <Route path="/create" element={<CreateProductPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/product/:id/edit" element={<ProductEditPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
