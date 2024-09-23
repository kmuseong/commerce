import React from 'react';
import classes from './Address.module.css';
import { AddressProps } from '@/widgets/address/model/type';
import { formatPhoneNumber } from '@/shared/lib/utils';

export const Address: React.FC<AddressProps> = ({ item }) => {
    return (
        <div>
            <div className="flex gap-1 pb-3">
                <div className={classes.name}>{item?.name}</div>
                {item?.isDefault && (
                    <div className={classes.default}>
                        <p>기본 배송지</p>
                    </div>
                )}
            </div>
            <div className={classes.content}>
                <div className="flex gap-2">
                    <div>{item?.streetAddress}</div>
                    <div>{item?.detailAddress}</div>
                </div>

                <div>{formatPhoneNumber(item?.phone as string)}</div>
            </div>
        </div>
    );
};
