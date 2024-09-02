import React, { useState } from 'react';
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
import { BuyProductProps } from '@/features/buyProduct/model/type';
import { changePrice } from '@/shared/lib/utils';

export const BuyProduct: React.FC<BuyProductProps> = ({ price }) => {
    const [count, setCount] = useState(1);

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="w-full">구매하기</Button>
            </DrawerTrigger>

            <DrawerContent className={classes.drawer}>
                <DrawerHeader>
                    <DrawerTitle>수량</DrawerTitle>
                    <DrawerDescription />
                </DrawerHeader>

                <div className="w-full">
                    <div className="pr-4 pl-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => setCount((prev) => prev - 1)}
                                disabled={count <= 1}
                            >
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="text-center">
                                <div className="font-bold tracking-tighter">{count}</div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => setCount((prev) => prev + 1)}
                            >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>

                        <div className="font-bold">{changePrice(Number(price) * count)}원</div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button className="w-full" variant="outline">
                                장바구니
                            </Button>
                        </DrawerClose>

                        <Button className="w-full">구매하기</Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
