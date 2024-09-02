export interface ItemProps {
    item: ProductsType;
}

interface ProductsType {
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

interface ProductImageType {
    id: number;
    image_url: string;
    product_id: string;
}
