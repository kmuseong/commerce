import React from 'react';
import classes from './Item.module.css';
import { useNavigate } from 'react-router-dom';
import { changePrice } from '@/shared/lib/utils';
import { ItemProps } from '@/widgets/item/model/type';

export const Item: React.FC<ItemProps> = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.card} onClick={() => navigate(`/product/${item.id}`)}>
            <img className={classes.image} src={item.product_images[0]?.image_url} alt={`${item.name} 이미지`} />
            <div className={classes.info}>
                <div className={classes.name}>{item.name}</div>
                <div className={classes.price}>{changePrice(Number(item.price))}원</div>
            </div>
        </div>
    );
};
