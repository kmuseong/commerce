import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import classes from './index.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import supabase from '@/supabaseClient';
import { useNavigate } from 'react-router-dom';

interface LoginType {
    email: string;
    password: string;
}

const schema = z.object({
    email: z.string().email({ message: '유효한 이메일을 입력해주세요.' }).min(1, { message: '이메일을 입력해주세요.' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }), // 나중에 최소 비밀번호 길이 설정하기
});

export const LoginPage: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const navigate = useNavigate();

    // 로그인 요청
    const onSubmit = async (form: LoginType) => {
        const { error } = await supabase.auth.signInWithPassword({
            ...form,
        });

        if (error) {
            return console.log('로그인 실패', { error });
        }
        navigate('/');
    };

    return (
        <form className={classes.layout} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Input
                    {...register('email')}
                    placeholder="이메일"
                    className={errors.email ? classes.inputError : ''}
                    autoComplete="email"
                />
                {errors.email && <p className={classes.error}>{errors.email.message}</p>}
            </div>
            <div>
                <Input
                    {...register('password')}
                    type="password"
                    placeholder="비밀번호"
                    className={errors.password ? classes.inputError : ''}
                    autoComplete="current-password"
                />
                {errors.password && <p className={classes.error}>{errors.password.message}</p>}
            </div>
            <Button className={classes.login} type="submit">
                로그인
            </Button>
            <Button className={classes.google} type="button">
                구글 로그인
            </Button>
            <Button className={classes.signup} type="button" onClick={() => navigate('/signup')}>
                회원가입
            </Button>
        </form>
    );
};
