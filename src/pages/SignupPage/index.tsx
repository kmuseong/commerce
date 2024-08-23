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
    nickname: string;
    isSeller: boolean;
}

const schema = z.object({
    email: z.string().email({ message: '유효한 이메일을 입력해주세요.' }).min(1, { message: '이메일을 입력해주세요.' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }), // 나중에 최소 비밀번호 길이 설정하기
    nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
});

export const SignupPage: React.FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            nickname: '',
            isSeller: true,
        },
    });

    const navigate = useNavigate();

    // 회원가입 요청
    const onSubmit = async (form: LoginType) => {
        console.log('폼 제출 데이터:', form);

        const { data, error } = await supabase.auth.signUp({
            ...form,
        });

        console.log({ data }, { error });

        if (error) {
            throw error;
        }

        await supabase.from('users').insert({
            id: data.user?.id, // 회원가입 성공 시 받아온 data중 id(uid) 값을 가져온다.
            email: data.user?.email,
            created_at: data.user?.created_at,
            nickname: form.nickname,
            password: form.password,
            isSeller: true,
        });

        navigate('/login');
    };

    return (
        <form className={classes.layout} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Input
                    {...register('nickname')}
                    type="nickname"
                    placeholder="닉네임"
                    className={errors.nickname ? classes.inputError : ''}
                    autoComplete="nickname"
                />
                {errors.nickname && <p className={classes.error}>{errors.nickname.message}</p>}
            </div>
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
                회원가입
            </Button>
        </form>
    );
};
