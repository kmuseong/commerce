import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import classes from './index.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import supabase from '@/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

type CarouselApi = UseEmblaCarouselType[1];
interface SignupType {
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
    const [isSeller, setIsSeller] = useState<boolean>(false);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignupType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            nickname: '',
            isSeller,
        },
    });

    const navigate = useNavigate();

    // 회원가입 요청
    const onSignup = async (form: SignupType) => {
        // auth
        const { data, error } = await supabase.auth.signUp({
            ...form,
        });

        if (error) {
            throw error;
        }

        await supabase.from('users').insert({
            id: data.user?.id, // 회원가입 성공 시 받아온 data중 id(uid) 값을 가져온다.
            email: data.user?.email,
            created_at: data.user?.created_at,
            nickname: form.nickname,
            password: form.password,
            isSeller,
        });
    };

    // useMutation 훅 설정
    const { mutate, isPending } = useMutation({
        mutationFn: onSignup,
        onSuccess: () => {
            carouselApi?.scrollNext();
        },
        onError: (error: Error) => {
            console.error('회원가입 실패:', error.message);
        },
    });

    // onSubmit 핸들러 수정
    const onSubmit = (form: SignupType) => {
        mutate(form);
    };

    return (
        <>
            <div className={classes.layout}>
                <header className={classes.header}>
                    <ChevronLeft onClick={() => navigate(-1)} />
                    회원가입
                </header>
                <Carousel
                    opts={{
                        align: 'start',
                    }}
                    setApi={(api) => setCarouselApi(api)}
                    className="w-full h-full"
                >
                    <CarouselContent>
                        <CarouselItem className="w-full  h-full flex flex-col gap-2 pt-36">
                            <div className="p-4 text-center">계정 유형을 선택해주세요.</div>
                            <div className={classes.form}>
                                <CarouselNext
                                    onClick={() => {
                                        setIsSeller(true);
                                        carouselApi?.scrollNext();
                                    }}
                                >
                                    판매자
                                </CarouselNext>

                                <CarouselNext
                                    onClick={() => {
                                        setIsSeller(false);
                                        carouselApi?.scrollNext();
                                    }}
                                >
                                    구매자
                                </CarouselNext>
                            </div>
                        </CarouselItem>

                        <CarouselItem className="w-full h-full flex flex-col gap-2 justify-between">
                            {isPending ? (
                                <div>로딩중...</div>
                            ) : (
                                <>
                                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <Input
                                                {...register('nickname')}
                                                type="nickname"
                                                placeholder="닉네임"
                                                className={errors.nickname ? classes.inputError : ''}
                                                autoComplete="nickname"
                                            />
                                            {errors.nickname && (
                                                <p className={classes.error}>{errors.nickname.message}</p>
                                            )}
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
                                            {errors.password && (
                                                <p className={classes.error}>{errors.password.message}</p>
                                            )}
                                        </div>

                                        <Button className={classes.login}>회원가입</Button>
                                    </form>

                                    <div className="p-6">
                                        <CarouselPrevious>뒤로가기</CarouselPrevious>
                                    </div>
                                </>
                            )}
                        </CarouselItem>
                        <CarouselItem>
                            <div className={classes.success}>
                                <h1>
                                    <CheckCircle />
                                    회원가입 성공
                                </h1>
                                <div className={classes.title}>
                                    <span> 회원가입을 축하드립니다.</span>
                                    <span>로그인하시면 더욱 다양한 서비스를 제공 받으실 수 있습니다.</span>
                                </div>
                                <Button onClick={() => navigate('/login')}>로그인</Button>
                                <Button onClick={() => navigate('/')}>메인으로</Button>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    );
};
