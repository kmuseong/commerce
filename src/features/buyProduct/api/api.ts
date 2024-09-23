import { CartFormProps, CartProps } from '@/entities/cart/type';
import supabase from '@/supabaseClient';

export const addCart = async ({ userId, productId, option }: CartFormProps): Promise<CartProps> => {
    if (option.quantity <= 0) {
        throw new Error('수량은 1 이상이어야 합니다.');
    }
    if (option.grind.trim() === '') {
        throw new Error('분쇄도를 선택해야 합니다.');
    }
    if (option.roasting.trim() === '') {
        throw new Error('로스팅을 선택해야 합니다.');
    }

    const { data, error } = await supabase
        .from('carts')
        .insert([{ user_id: userId, product_id: productId, ...option }])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    const result = await addCartsItemInfo(data[0].id);

    return result;
};

export const addCartsItemInfo = async (id: number): Promise<CartProps> => {
    const { data, error } = await supabase
        .from('carts')
        .select(
            `
        *,
        products (
          *,
          product_images (*)
        )
      `
        )
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
