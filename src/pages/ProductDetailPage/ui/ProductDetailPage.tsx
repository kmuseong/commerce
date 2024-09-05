import { ProductDetailForm } from '@/features/productDetail';
import React from 'react';
import classes from './ProductDetailPage.module.css';
import { Button } from '@/shared/components/ui/button';
import { useAuthStore } from '@/shared/stores/auth/useAuthStore';
import { ChevronLeft, Search, Home } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProduct, onDeleteProduct } from '@/pages/ProductDetailPage/api/api';
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
import { Header } from '@/widgets/header/ui/Header';
import { BuyProduct } from '@/features/buyProduct';
import { CartIcon } from '@/widgets/cartIcon';

export const ProductDetailPage: React.FC = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { id } = useParams<string>();

    const { data, isLoading: getLoading } = useQuery({
        queryKey: ['getProduct'],
        queryFn: () => getProduct(id!),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['deleteProduct', id],
        mutationFn: (id: string) => onDeleteProduct(id!),
        onSuccess: () => {
            console.log('삭제성공');
            navigate('/'); // 나중에 변경 필요
        },
        onError: (error) => {
            console.log('삭제 실패', { error });
        },
    });

    if (getLoading) {
        return <div>값 불러오는중...</div>;
    }

    if (isPending) {
        return <div>삭제중...</div>;
    }

    return (
        <>
            <Header>
                <div className={classes.nav}>
                    <ChevronLeft onClick={() => navigate(-1)} />

                    <div className={classes.list}>
                        <Search />
                        <Home onClick={() => navigate('/')} />
                        <CartIcon />
                    </div>
                </div>
            </Header>

            <ProductDetailForm data={data!} />

            <div className="h-16" />
            <div className={classes.footer}>
                {user?.isSeller ? (
                    <>
                        <Button className="w-full" onClick={() => navigate(`/product/${id}/edit`)}>
                            수정하기
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="w-full" variant="outline">
                                    삭제하기
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className={classes.modal}>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>정말로 이 상품을 삭제하시겠습니까?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        삭제된 상품은 복구할 수 없습니다. 이 작업은 영구적이며, 삭제 후에는 모든 관련
                                        정보가 사라집니다. 계속 진행하시겠습니까?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>취소</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => mutate(id!)}>확인</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                ) : (
                    <BuyProduct price={data?.price as string} id={data?.id as number} />
                )}
            </div>
        </>
    );
};
