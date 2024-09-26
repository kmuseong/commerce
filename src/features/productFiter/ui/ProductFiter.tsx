import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import React from 'react';
import classes from './ProductFiter.module.css';

export const ProductFiter: React.FC<{ length: number }> = ({ length }) => {
    return (
        <div className={classes.list}>
            <div className={classes.info}>
                총 <span>{length}</span>개의 상품
            </div>

            <Select>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="정렬방식" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="arabica">최신 순</SelectItem>
                        <SelectItem value="robusta">오래된 순</SelectItem>
                        <SelectItem value="liberica">낮은 가격</SelectItem>
                        <SelectItem value="excelsa">높은 가격</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
