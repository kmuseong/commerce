export interface ProductType {
    id: string;
    name: string;
    description: string;
    origin: string;
    bean_type: string;
    price: string;
    weight: string;
    stock_quantity: string;
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
}
