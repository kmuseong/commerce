export interface ProductFormType {
    name: string;
    description: string;
    origin: string;
    bean_type: string;
    price: string;
    weight: string;
    stock_quantity: string;
}

export interface ProductType {
    id?: number;
    name: string;
    description: string;
    origin: string;
    bean_type: string;
    price: string;
    weight: string;
    stock_quantity: string;
    product_images: ProductImageType[];
    user_id: string;
}

export interface ProductImageType {
    id: number;
    image_url: string;
    product_id?: string;
}

export interface CreateFormType {
    form: ProductFormType;
    images: File[];
}

export interface UpdateFrormProps {
    id: string;
    form: ProductFormType;
    images: File[];
}
