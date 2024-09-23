import { Button } from '@/shared/components/ui/button';
import { LOGO_NAME } from '@/shared/config/constants';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import supabase from '@/supabaseClient';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, clearUser, user } = useAuthStore();

    const logOut = async () => {
        await supabase.auth.signOut();
        clearUser();
        alert('로그아웃 되었습니다');
    };

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 마이페이지</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/profile`} />
            </Helmet>

            {isAuthenticated ? (
                <>
                    <Button onClick={logOut}>로그아웃</Button>
                    <Button onClick={() => navigate('/my/payment/history')}>주문 내역</Button>
                    {user?.isSeller && <Button onClick={() => navigate('/create')}>제품등록</Button>}
                </>
            ) : (
                <Button onClick={() => navigate('/login')}>로그인</Button>
            )}
        </>
    );
};
