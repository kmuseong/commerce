import { v4 as uuid } from 'uuid';
import supabase from '@/supabaseClient';
import { CreateFormType, ProductFormType } from '@/entities/product/type';
import imageCompression from 'browser-image-compression';

const compressAndConvertImage = async (file: File) => {
    const options = {
        maxSizeMB: 1, // 최대 파일 크기 (MB)
        maxWidthOrHeight: 1920, // 최대 너비 또는 높이
        useWebWorker: true, // 웹 워커 사용
        fileType: 'image/webp', // 변환할 파일 형식
    };

    return await imageCompression(file, options);
};

export const addProduct = async (form: ProductFormType) => {
    const { data, error } = await supabase.from('products').insert([form]).select();

    if (error) {
        throw new Error(error.message);
    }

    return data[0];
};

export const uploadProductImages = async (product_id: string, images: File[]) => {
    const webpImagesPromises = images.map((file) => compressAndConvertImage(file));
    const webpImages = await Promise.all(webpImagesPromises);

    const uploadPromises = webpImages.map(async (webpImage) => {
        const newFileName = uuid();
        const { error: imageError } = await supabase.storage
            .from('images')
            .upload(`products/${newFileName}`, webpImage);

        if (imageError) {
            throw new Error(imageError.message);
        }

        const image_url = supabase.storage.from('images').getPublicUrl(`products/${newFileName}`).data.publicUrl;

        const { error: productImageError } = await supabase
            .from('product_images')
            .insert([{ product_id, image_url }])
            .select();

        if (productImageError) {
            throw new Error(productImageError.message);
        }
    });

    await Promise.all(uploadPromises);
};

export const onAddProduct = async ({ form, images }: CreateFormType) => {
    const product = await addProduct(form);
    if (images?.length) {
        await uploadProductImages(product.id, images);
    }
    return product;
};
