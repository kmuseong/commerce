import React from 'react';
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
import { CartFormProps } from '@/features/cart/model/type';
import { CartProps } from '@/entities/cart/type';
import { Loading } from '@/widgets/Load';
import { useOrderStore } from '@/shared/stores/order/useOrderStore';

export const CartForm: React.FC<CartFormProps> = ({ data }) => {
    const queryClient = useQueryClient();
    const { selectProducts, toggleSelectItem, toggleSelectAll } = useOrderStore();

    const selectedItems = selectProducts.map((item: CartProps) => item.products.id);
    const isAllSelected = data.length > 0 && selectedItems.length === data.length;

    const { mutate, isPending: deleteLoading } = useMutation({
        mutationKey: ['deleteCart'],
        mutationFn: (id: number) => deleteCartProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getCarts'],
            });
        },
    });

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className={classes.all}>
                    <Checkbox
                        id="all"
                        checked={isAllSelected}
                        onCheckedChange={() =>
                            toggleSelectAll(
                                isAllSelected,
                                data.map((item) => item)
                            )
                        }
                    />
                    <label
                        htmlFor="all"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        전체 선택
                    </label>
                </div>

                <ul className={classes.list}>
                    {data?.map((item: CartProps) => {
                        const isSelected = selectedItems.includes(item.products.id);
                        return (
                            <li key={item.id} className={classes.item}>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`item-${item.id}`}
                                            checked={isSelected}
                                            onCheckedChange={() => toggleSelectItem(item)}
                                        />
                                        <label
                                            htmlFor={`item-${item.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            선택
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <img
                                        className="w-20 object-cover"
                                        src={item.products.product_images[0]?.image_url}
                                        alt={`${item.products.name} 이미지`}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <div>{item.products.name}</div>
                                        <div>{changePrice(Number(item.products.price))}원</div>
                                        <div>
                                            옵션: {item.roasting}, {item.grind}
                                        </div>
                                        <div>수량: {item.quantity}개</div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <EditCartButton price={item.products.price} id={item.id as number} />

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
                                                    <span className="block text-center">
                                                        선택하신 상품을 장바구니에서 삭제하시겠습니까?
                                                    </span>
                                                    <span className="block text-center text-sm text-gray-600">
                                                        이 작업은 취소할 수 없습니다.
                                                    </span>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="w-full">취소</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="w-full"
                                                    onClick={() => mutate(item.id as number)}
                                                >
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

            {deleteLoading && <Loading>상품을 삭제하고 있습니다</Loading>}
        </>
    );
};
