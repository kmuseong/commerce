import { Button } from '@/shared/components/ui/button';
import { LOGO_NAME } from '@/shared/config/constants';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import supabase from '@/supabaseClient';
import { Header } from '@/widgets/header';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import classes from './ProfilePage.module.css';
import { BackIcon } from '@/widgets/icon';
import { Edit } from 'lucide-react';

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

            <Header>
                <div className={classes.header}>
                    <BackIcon />
                    마이페이지
                </div>

                {user && (
                    <div className="px-4 pt-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm">{user?.nickname}</span>

                            <Edit size="20px" />
                        </div>

                        <div className="flex items-center gap-3">
                            <span>{user.email}</span>

                            <Edit size="20px" />
                        </div>
                    </div>
                )}
            </Header>

            <main className="space-y-3 p-4">
                {isAuthenticated ? (
                    <>
                        <Button className="w-full" onClick={() => navigate('/my/payment/history')}>
                            주문 내역
                        </Button>

                        <Button className="w-full" variant="outline" onClick={logOut}>
                            로그아웃
                        </Button>

                        {user?.isSeller && (
                            <Button className="w-full" onClick={() => navigate('/create')}>
                                제품등록
                            </Button>
                        )}
                    </>
                ) : (
                    <Button className="w-full" onClick={() => navigate('/login')}>
                        로그인
                    </Button>
                )}
            </main>
        </>
    );
};
