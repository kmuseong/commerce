import { getProduct } from '@/features/productDetail/api/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { ProductType } from '@/features/productDetail/model/type';

export const ProductDetailForm: React.FC = () => {
    const { id } = useParams<string>();
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    const { data, isLoading } = useQuery<ProductType, Error>({
        queryKey: ['getProduct', id],
        queryFn: () => getProduct(id!),
        enabled: !!id,
    });

    console.log(data);

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
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1 w-full h-screen ">
                                <span className="text-4xl font-semibold">{index + 1}</span>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div>
                <div>{data?.name}</div>
                <div>{data?.price}</div>
            </div>

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
                    <div>{data?.description}</div>
                    <div>{data?.origin}</div>
                    <div>{data?.stock_quantity}</div>
                    <div>{data?.bean_type}</div>
                    <div>{data?.weight}</div>
                </TabsContent>
                <TabsContent value="review">Change your password here.</TabsContent>
            </Tabs>
        </div>
    );
};
