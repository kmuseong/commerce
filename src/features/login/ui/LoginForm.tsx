import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { LoginType } from '@/features/login/model/type';
import { useNavigate } from 'react-router-dom';
import classes from './LoginForm.module.css';
import { schema } from '@/features/login/model/validation';
import { onLogin } from '@/features/login/api/api';

export const LoginForm: React.FC = () => {
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

    // useMutation 훅 설정
    const { mutate, isPending } = useMutation({
        mutationFn: onLogin,
        onSuccess: () => {
            console.log('회원가입 성공');
        },
        onError: (error: Error) => {
            console.error('회원가입 실패:', error.message);
        },
    });

    const onSubmit = (form: LoginType) => {
        mutate(form);
    };

    if (isPending) {
        return <div>로딩중...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
                Google
            </Button>
            <Button className={classes.signup} type="button" onClick={() => navigate('/signup')}>
                회원가입
            </Button>
        </form>
    );
};
