import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { HomePage } from '@/pages/HomePage';
import { CreateProductPage } from '@/pages/CreateProductPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ProductEditPage } from '@/pages/ProductEditPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { Layout } from '@/widgets/layout';
import { ProductsPage } from '@/pages/ProductsPage';
import { CartPage } from '@/pages/CartPage';
import { OrderPage } from '@/pages/OrderPage';
import { AddressPage } from '@/pages/AddressPage';
import { AddressFormPage } from '@/pages/AddressFormPage';
import { AddressEditPage } from '@/pages/AddressEditPage';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/** 로그인페이지 */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    <Route path="/profile" element={<ProfilePage />} />

                    {/** 상품 CRUD */}
                    <Route path="/create" element={<CreateProductPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/product/:id/edit" element={<ProductEditPage />} />

                    {/** 제품리스트 */}
                    <Route path="/products" element={<ProductsPage />} />

                    {/** 장바구니 */}
                    <Route path="/cart" element={<CartPage />} />

                    {/** 주문 */}
                    <Route path="/order" element={<OrderPage />} />

                    {/** 배송지 */}
                    <Route path="/my/address" element={<AddressPage />} />
                    <Route path="/my/address/create" element={<AddressFormPage />} />
                    <Route path="/my/address/:id/edit" element={<AddressEditPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;
