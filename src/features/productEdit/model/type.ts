export interface ProductType {
    id: string;
    name: string;
    description: string;
    origin: string;
    bean_type: string;
    price: string;
    weight: string;
    stock_quantity: string;
    product_images: ProductImageType[];
}

export interface UpdateFormType {
    name: string;
    description: string;
    origin: string;
    bean_type: string;
    price: string;
    weight: string;
    stock_quantity: string;
}

export interface UpdateFrormProps {
    id: string;
    form: UpdateFormType;
    images: File[];
}

export interface ProductImageType {
    id: number;
    image_url: string;
}
