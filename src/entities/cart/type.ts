export interface CartProps {
    id: number;
    quantity: number;
    roasting: string;
    grind: string;
    products: ProductType;
    user_id: string;
    product_id: number;
}

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

export interface CartFormProps {
    data: CartProps[];
    isAllSelected: boolean;
    selectedItems: number[];
    totalPrice: number;
    toggleSelectAll: () => void;
    toggleSelectItem: (id: number) => void;
}
