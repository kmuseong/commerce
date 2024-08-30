import React from 'react';
import classes from './RecentProducts.module.css';

export const RecentProducts: React.FC = () => {
    return (
        <div>
            <div className={classes.title}>
                <div>최신 상품</div> <span>더보기</span>
            </div>
            <div className="grid grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                        <span className="text-4xl font-semibold">{index + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
