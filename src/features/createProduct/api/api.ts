import { CreateFormType } from '@/features/createProduct/model/type';
import { v4 as uuid } from 'uuid';
import supabase from '@/supabaseClient';

export const onAddProduct = async ({ form, images }: CreateFormType) => {
    try {
        // 1. products 테이블에 데이터를 삽입하고 product_id를 가져옵니다.
        const { data, error } = await supabase.from('products').insert([form]).select();

        if (error) {
            return console.log({ error });
        }

        // 방금 삽입된 제품의 product_id를 가져옵니다.
        const productId = data[0].id;

        // 2. 각 이미지를 업로드하고 product_images 테이블에 삽입합니다.
        images?.forEach(async (file) => {
            const newFileName = uuid();
            const { error: imageError } = await supabase.storage.from('images').upload(`products/${newFileName}`, file);

            if (imageError) {
                return console.log({ imageError });
            }

            // 이미지의 URL을 가져옵니다.
            const imageUrl = supabase.storage.from('images').getPublicUrl(`products/${newFileName}`).data.publicUrl;

            // product_images 테이블에 삽입
            const { error: productImageError } = await supabase
                .from('product_images')
                .insert([{ product_id: productId, image_url: imageUrl }])
                .select();

            if (productImageError) {
                return console.log({ productImageError });
            }
        });

        return data[0];
    } catch (error) {
        console.log({ error });
    }
};
