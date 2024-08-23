import { Button } from '@/components/ui/button';
import supabase from '@/supabaseClient';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const logOut = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        alert('로그아웃 되었습니다');
    };

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };
        checkSession();
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <Button onClick={logOut}>로그아웃</Button>
            ) : (
                <Button onClick={() => navigate('/login')}>로그인</Button>
            )}
        </div>
    );
};
