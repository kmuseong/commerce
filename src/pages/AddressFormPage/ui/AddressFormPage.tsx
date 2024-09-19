import { useAddressForm } from '@/features/addressForm/model/validation';
import { Button } from '@/shared/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { AddressForm } from '@/features/addressForm';
import { useMutation } from '@tanstack/react-query';
import { onAddAddress } from '@/pages/AddressFormPage/api/api';
import { Loading } from '@/widgets/Load';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { AddressFormType } from '@/entities/address/type';
import { LOGO_NAME } from '@/shared/config/constants';
import { Helmet } from 'react-helmet-async';

export const AddressFormPage: React.FC = () => {
    const form = useAddressForm();
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const { mutate, isPending } = useMutation({
        mutationKey: ['addAddress'],
        mutationFn: (form: AddressFormType) => onAddAddress({ form, userId: user?.id as string }),
        onSuccess: () => {
            navigate('/my/address');
        },
    });

    const onSubmit = (form: AddressFormType) => {
        mutate(form);
    };

    return (
        <>
            <Helmet>
                <title>{LOGO_NAME} - 배송지 추가</title>
                <link rel="canonical" href={`${import.meta.env.VITE_WEB_SITE_URL}/my/address/create`} />
            </Helmet>

            <header className="flex gap-2 p-3">
                <ChevronLeft onClick={() => navigate(-1)} />
                배송지 추가
            </header>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>이름</FormLabel>
                                <FormControl>
                                    <Input placeholder="이름을 입력해주세요." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>휴대폰번호</FormLabel>
                                <FormControl>
                                    <Input placeholder="휴대폰번호를 입력해주세요." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="font-semibold">주소</div>
                    <AddressForm />

                    <FormField
                        control={form.control}
                        name="detailAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="상세주소" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>요청사항</FormLabel>
                                <FormControl>
                                    <Input placeholder="요청사항을 입력해주세요." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isDefault"
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox id="isDefault" checked={field.value} onCheckedChange={field.onChange} />
                                <label
                                    htmlFor="isDefault"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    기본 배송지 설정
                                </label>
                            </div>
                        )}
                    />

                    <Button className="w-full">저장하기</Button>
                </form>
            </Form>

            {isPending && <Loading>주소를 저장하고 있습니다</Loading>}
        </>
    );
};
