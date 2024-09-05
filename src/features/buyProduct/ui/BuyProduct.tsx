import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/shared/components/ui/drawer';
import { Button } from '@/shared/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import classes from './BuyProduct.module.css';
import { AddCartProps, BuyProductProps, useBuyProductFormType } from '@/features/buyProduct/model/type';
import { changePrice } from '@/shared/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCart } from '@/features/buyProduct/api/api';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';
import { useBuyProductForm } from '@/features/buyProduct/model/validation';

export const BuyProduct: React.FC<BuyProductProps> = ({ price, id }) => {
    const { user } = useAuthStore();
    const form = useBuyProductForm();
    const queryClient = useQueryClient();

    const { mutate, isPending: cartLoading } = useMutation({
        mutationKey: ['addCart'],
        mutationFn: ({ userId, productId, option }: AddCartProps) => addCart({ userId, productId, option }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getCarts'],
            });
            queryClient.invalidateQueries({ queryKey: ['getCartLength'] });
        },
        onError: (error) => {
            console.log('장바구니 추가 실패', { error });
        },
    });

    const onSubmit = async (optionForm: useBuyProductFormType) => {
        mutate({ userId: user?.id as string, productId: id, option: optionForm });
    };

    if (cartLoading) {
        return <div>장바구니 추가중...</div>;
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="w-full">구매하기</Button>
            </DrawerTrigger>

            <DrawerContent className={classes.drawer}>
                <DrawerHeader>
                    <DrawerTitle />
                    <DrawerDescription />
                </DrawerHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="roasting"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="로스팅 선택" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Light">Light</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Dark">Dark</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="grind"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="분쇄도 선택" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Fine">곱게(Fine)</SelectItem>
                                                    <SelectItem value="Medium">중간(Medium)</SelectItem>
                                                    <SelectItem value="Coarse">굵게(Coarse)</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 shrink-0 rounded-full"
                                                    onClick={() => {
                                                        if (field.value > 1) {
                                                            field.onChange(field.value - 1);
                                                        }
                                                    }}
                                                    disabled={field.value <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                    <span className="sr-only">Decrease</span>
                                                </Button>
                                                <div className="text-center">
                                                    <div className="tracking-tighter">{field.value}</div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 shrink-0 rounded-full"
                                                    onClick={() => field.onChange(field.value + 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    <span className="sr-only">Increase</span>
                                                </Button>
                                            </div>

                                            <div>{changePrice(Number(price) * field.value)}원</div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="w-full">
                            <DrawerFooter>
                                {form.formState.isValid ? (
                                    <DrawerClose asChild>
                                        <Button className="w-full" variant="outline" type="submit">
                                            장바구니
                                        </Button>
                                    </DrawerClose>
                                ) : (
                                    <Button className="w-full" variant="outline" type="submit">
                                        장바구니
                                    </Button>
                                )}

                                <Button className="w-full">구매하기</Button>
                            </DrawerFooter>
                        </div>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    );
};
