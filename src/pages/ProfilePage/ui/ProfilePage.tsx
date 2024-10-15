import { Button } from '@/shared/components/ui/button';
import { LOGO_NAME } from '@/shared/config/constants';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { Header } from '@/widgets/header';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import classes from './ProfilePage.module.css';
import { BackIcon } from '@/widgets/icon';
import { Loading } from '@/widgets/Load';
import { EditName } from '@/features/editName';
import { useProfileMutations } from '@/pages/ProfilePage/api/useProfileMutations';

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, clearUser, user, setUser } = useAuthStore();

    const { logoutMutate, logoutPending, editNameMutate, editNamePending } = useProfileMutations(setUser, clearUser);

    if (logoutPending) {
        return <Loading>로그아웃 중입니다.</Loading>;
    }

    if (editNamePending) {
        return <Loading>닉네임 변경 중입니다.</Loading>;
    }

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
                    <div className="px-4 pt-4 space-y-4 relative">
                        <div className="flex items-center gap-3">
                            <span className="text-sm">{user?.nickname}</span>
                            <EditName mutate={editNameMutate} />
                        </div>

                        <div className="flex items-center gap-3">
                            <span>{user.email}</span>
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

                        <Button className="w-full" variant="outline" onClick={() => logoutMutate()}>
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
