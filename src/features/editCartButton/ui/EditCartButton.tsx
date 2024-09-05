import React from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/shared/components/ui/drawer';
import { Button } from '@/shared/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import classes from './EditCartButton.module.css';
import { BuyProductProps } from '@/features/buyProduct/model/type';
import { changePrice } from '@/shared/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui/form';
import { useEditProductForm } from '@/features/editCartButton/model/validation';
import { EditCartProps, useEditProductFormType } from '@/features/editCartButton/model/type';
import { editOption } from '@/features/editCartButton/api/api';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';

export const EditCartButton: React.FC<BuyProductProps> = ({ price, id }) => {
    const { form, isLoading } = useEditProductForm(id);
    const queryClient = useQueryClient();

    const { mutate, isPending: cartLoading } = useMutation({
        mutationKey: ['EditCart'],
        mutationFn: ({ id, option }: EditCartProps) => editOption({ id, option }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getCarts'],
            });
        },
        onError: (error) => {
            console.log('장바구니 변경 실패', { error });
        },
    });

    const onSubmit = async (optionForm: useEditProductFormType) => {
        mutate({ id, option: optionForm });
    };

    if (cartLoading) {
        return <div>장바구니 추가중...</div>;
    }

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">
                    옵션변경
                </Button>
            </DrawerTrigger>

            <DrawerContent className={classes.drawer}>
                <DrawerHeader>
                    <DrawerTitle />
                    <DrawerDescription />
                </DrawerHeader>

                <Form {...form}>
                    <form className="flex flex-col gap-4">
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
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button type="button" className="w-full">
                                            옵션 변경
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className={classes.modal}>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-center">
                                                옵션을 변경하시겠습니까?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription className="text-center">
                                                로스팅: {form.watch('roasting')}
                                            </AlertDialogDescription>
                                            <AlertDialogDescription className="text-center">
                                                분쇄도: {form.watch('grind')}
                                            </AlertDialogDescription>
                                            <AlertDialogDescription className="text-center">
                                                수량: {form.watch('quantity')}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="w-full">취소</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="w-full"
                                                onClick={() => {
                                                    form.handleSubmit(onSubmit)();
                                                }}
                                            >
                                                확인
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DrawerFooter>
                        </div>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    );
};
