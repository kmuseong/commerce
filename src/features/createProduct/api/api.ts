import { v4 as uuid } from 'uuid';
import supabase from '@/supabaseClient';
import { CreateFormType, ProductFormType } from '@/entities/product/type';

export const addProduct = async (form: ProductFormType) => {
    const { data, error } = await supabase.from('products').insert([form]).select();

    if (error) {
        throw new Error(error.message);
    }

    return data[0];
};

export const uploadProductImages = async (product_id: string, images: File[]) => {
    for (const file of images) {
        const newFileName = uuid();
        const { error: imageError } = await supabase.storage.from('images').upload(`products/${newFileName}`, file);

        if (imageError) {
            throw new Error(imageError.message);
            continue; // 에러가 발생해도 나머지 이미지를 업로드 계속 진행
        }

        const image_url = supabase.storage.from('images').getPublicUrl(`products/${newFileName}`).data.publicUrl;

        const { error: productImageError } = await supabase
            .from('product_images')
            .insert([{ product_id, image_url }])
            .select();

        if (productImageError) {
            throw new Error(productImageError.message);
        }
    }
};

export const onAddProduct = async ({ form, images }: CreateFormType) => {
    const product = await addProduct(form);
    if (images?.length) {
        await uploadProductImages(product.id, images);
    }
    return product;
};
