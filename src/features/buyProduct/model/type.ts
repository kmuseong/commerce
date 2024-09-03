export interface BuyProductProps {
    price: string;
    id: number;
}

export interface AddCartProps {
    userId: string;
    productId: number;
    count: number;
}
