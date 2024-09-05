import React, { useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import classes from './SignupForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { onSignup } from '@/features/signup/api/api';
import { CarouselApi } from '@/features/signup/model/type';
import { schema } from '@/features/signup/model/validation';
import { SignupFormType } from '@/entities/auth/type';

export const SignupForm: React.FC = () => {
    const [isSeller, setIsSeller] = useState<boolean>(false);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignupFormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            nickname: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: onSignup,
        onSuccess: () => {
            carouselApi?.scrollNext();
        },
        onError: (error: Error) => {
            console.error('회원가입 실패:', error.message);
        },
    });

    const onSubmit = (form: SignupFormType) => {
        mutate({ ...form, isSeller });
    };

    return (
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
    );
};
