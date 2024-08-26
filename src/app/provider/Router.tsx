import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { HomePage } from '@/pages/HomePage';
import { CreateProductPage } from '@/pages/CreateProductPage';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/** 유저페이지 */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/** 판매자페이지 */}
                <Route path="/create" element={<CreateProductPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
