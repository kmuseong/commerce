import React from 'react';
import classes from '../ui/ProductDetailPage.module.css';
import { BounceLoader } from 'react-spinners';

export const DeleteLoading: React.FC = () => {
    return (
        <div className={classes.deleteLoading}>
            <BounceLoader color="white" />
            상품을 삭제하고 있습니다
        </div>
    );
};
