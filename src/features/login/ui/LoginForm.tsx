import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useNavigate } from 'react-router-dom';
import classes from './LoginForm.module.css';
import { schema } from '@/features/login/model/validation';
import { googleLogin, onLogin } from '@/features/login/api/api';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { User } from '@/shared/stores/auth/type';
import { LoginFormType } from '@/entities/auth/type';
import { Loading } from '@/widgets/Load';

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useAuthStore();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginFormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: onLogin,
        onSuccess: (res) => {
            setUser(res as User);
            navigate('/');
        },
        onError: (error: Error) => {
            console.error('로그인 실패:', error.message);
        },
    });

    const { mutate: googleMutate, isPending: googlePending } = useMutation({
        mutationFn: googleLogin,
        onSuccess: () => {
            console.log('구글 로그인 성공');
        },
        onError: (error: Error) => {
            console.error('구글 로그인 실패:', error.message);
        },
    });

    const onSubmit = (form: LoginFormType) => {
        mutate(form);
    };

    if (isPending || googlePending) {
        return <Loading>로그인 진행 중입니다</Loading>;
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
            <Button className={classes.google} type="button" onClick={() => googleMutate()}>
                Google
            </Button>
            <Button className={classes.signup} type="button" onClick={() => navigate('/signup')}>
                회원가입
            </Button>
        </form>
    );
};
