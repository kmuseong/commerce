import { ProductFormType, ProductType } from '@/entities/product/type';
import supabase from '@/supabaseClient';
import { v4 as uuid } from 'uuid';

export const getProduct = async (id: string) => {
    const { data, error } = await supabase
        .from('products')
        .select(
            `
        *,
        product_images (
            id,
            image_url
        )
    `
        )
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    return data?.[0];
};

export const updateProduct = async (id: string, form: ProductFormType, images: File[]): Promise<ProductType | null> => {
    // const start = performance.now();
    const { data, error } = await supabase.from('products').update(form).eq('id', id).select();

    if (error) {
        throw new Error(error.message);
    }

    if (!data || data.length === 0) {
        return null;
    }

    // 2. 기존 이미지 삭제 (storage와 product_images 테이블에서)
    const { data: existingImages, error: fetchImagesError } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', id);

    if (fetchImagesError) {
        throw fetchImagesError;
    }

    // 이미지 삭제 작업을 병렬로 처리
    if (existingImages && existingImages.length > 0) {
        const deletePromises = existingImages.map(async (image) => {
            const filePath = image.image_url.replace(
                `${supabase.storage.from('images').getPublicUrl('').data.publicUrl}/`,
                ''
            );
            return supabase.storage.from('images').remove([filePath]);
        });

        await Promise.all(deletePromises);

        // product_images 테이블에서 기존 이미지 레코드 삭제
        const { error: deleteImagesError } = await supabase.from('product_images').delete().eq('product_id', id);

        if (deleteImagesError) {
            throw deleteImagesError;
        }
    }

    // 3. 새로운 이미지 업로드 및 product_images 테이블에 삽입
    const uploadPromises = images.map(async (file) => {
        const newFileName = uuid();
        const { error: imageError } = await supabase.storage.from('images').upload(`products/${newFileName}`, file);

        if (imageError) {
            throw imageError;
        }

        const imageUrl = supabase.storage.from('images').getPublicUrl(`products/${newFileName}`).data.publicUrl;

        const { error: productImageError } = await supabase
            .from('product_images')
            .insert({ product_id: id, image_url: imageUrl });

        if (productImageError) {
            throw productImageError;
        }
    });

    await Promise.all(uploadPromises);

    // const end = performance.now();
    // console.log(`요청 속도 테스트 ${end - start} milliseconds`);

    return data[0] as ProductType;
};
