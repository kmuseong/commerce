import { getProduct } from '@/features/productDetail/api/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { ProductImageType, ProductType } from '@/features/productDetail/model/type';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import classes from './ProductDetailForm.module.css';

export const ProductDetailForm: React.FC = () => {
    const { id } = useParams<string>();
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    const changePrice = (price: number) => {
        return price.toLocaleString('ko-KR');
    };

    const { data, isLoading } = useQuery<ProductType, Error>({
        queryKey: ['getProduct', id],
        queryFn: () => getProduct(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <div className="h-full flex-1">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {data?.product_images.map((item: ProductImageType) => (
                        <CarouselItem key={item.id}>
                            <div className="w-full">
                                <img className={classes.image} src={item.image_url} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <Card>
                <CardHeader>
                    <div>{data?.name}</div>
                    <CardTitle>{changePrice(Number(data?.price))}원</CardTitle>
                </CardHeader>
            </Card>

            <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="info">
                        정보
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="review">
                        리뷰
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                    <CardContent className="grid w-full items-center gap-4">
                        <div>원산지: {data?.origin}</div>
                        <div>수량: {data?.stock_quantity}</div>
                        <div>원두선택: {data?.bean_type}</div>
                        <div>무게: {data?.weight}</div>
                        <CardDescription>설명: {data?.description}</CardDescription>
                    </CardContent>
                </TabsContent>
                <TabsContent value="review">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
};
