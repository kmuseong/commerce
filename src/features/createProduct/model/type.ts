export interface FormType {
    name: string;
    description: string;
    origin: string;
    bean_type: string;
    price: string;
    weight: string;
    stock_quantity: string;
}

export interface CreateFormType {
    form: FormType;
    images: File[];
}
