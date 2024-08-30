export interface ProductType {
    name: string;
    description: string;
    origin: string;
    bean_type: string;
    price: string;
    weight: string;
    stock_quantity: string;
    product_images: ProductImageType[];
}

export interface ProductImageType {
    id: number;
    image_url: string;
}
