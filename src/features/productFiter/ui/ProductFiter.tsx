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

export const ProductFiter: React.FC = () => {
    return (
        <div className={classes.list}>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="원두선택" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="arabica">아라비카(Arabica)</SelectItem>
                        <SelectItem value="robusta">로부스타(Robusta)</SelectItem>
                        <SelectItem value="liberica">리베리카(Liberica)</SelectItem>
                        <SelectItem value="excelsa">엑셀사(Excelsa)</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="무게" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="200g">200g</SelectItem>
                        <SelectItem value="500g">500g</SelectItem>
                        <SelectItem value="1kg">1kg</SelectItem>
                        <SelectItem value="5kg">5kg</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="원산지" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="ethiopia">에티오피아(Ethiopia)</SelectItem>
                        <SelectItem value="colombia">콜롬비아(Colombia)</SelectItem>
                        <SelectItem value="brazil">브라질(Brazil)</SelectItem>
                        <SelectItem value="indonesia">인도네시아(Indonesia)</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
