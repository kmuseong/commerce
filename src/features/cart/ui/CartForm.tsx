import React from 'react';
import { CartFormProps, CartProps } from '@/entities/cart/type';
import { deleteCartProduct } from '@/features/cart/api/api';
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
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classes from './CartForm.module.css';
import { changePrice } from '@/shared/lib/utils';
import { EditCartButton } from '@/features/editCartButton';

export const CartForm: React.FC<CartFormProps> = ({
    data,
    isAllSelected,
    toggleSelectItem,
    selectedItems,
    toggleSelectAll,
}) => {
    const queryClient = useQueryClient();

    const { mutate, isPending: deleteLoading } = useMutation({
        mutationKey: ['deleteCart'],
        mutationFn: (id: number) => deleteCartProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getCarts'],
            });
        },
    });

    if (deleteLoading) {
        return <div>상품삭제중...</div>;
    }

    console.log(data);

    return (
        <div className="flex flex-col gap-4">
            <div className={classes.all}>
                <Checkbox id="all" checked={isAllSelected} onCheckedChange={toggleSelectAll} />
                <label
                    htmlFor="all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    전체 선택
                </label>
            </div>

            <ul className={classes.list}>
                {data?.map(({ id, products, quantity, roasting, grind }: CartProps) => {
                    const isSelected = selectedItems.includes(id);
                    return (
                        <li key={id} className={classes.item}>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`item-${id}`}
                                        checked={isSelected}
                                        onCheckedChange={() => toggleSelectItem(id)}
                                    />
                                    <label
                                        htmlFor={`item-${id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        선택
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <img className="w-20 object-cover" src={products.product_images[0]?.image_url} />
                                <div className="flex flex-col gap-2">
                                    <div>{products.name}</div>
                                    <div>{changePrice(Number(products.price))}원</div>
                                    <div>
                                        옵션: {roasting}, {grind}
                                    </div>
                                    <div>수량: {quantity}개</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <EditCartButton price={products.price} id={id} />

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            삭제하기
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-center">
                                                장바구니에서 상품 삭제
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                <p className="text-center">
                                                    선택하신 상품을 장바구니에서 삭제하시겠습니까?
                                                </p>
                                                <p className="text-center text-sm text-gray-600">
                                                    이 작업은 취소할 수 없습니다.
                                                </p>
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="w-full">취소</AlertDialogCancel>
                                            <AlertDialogAction className="w-full" onClick={() => mutate(id)}>
                                                확인
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
