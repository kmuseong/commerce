export interface ResponsePaymentType {
    id: string;
    status: string;
    method: string;
    orderName: string;
    paidAt: string;
    receiptUrl: string;
    amount: PaymentAmount;
    customer: CustomerType;
}

interface PaymentAmount {
    total: number;
    taxFree: number;
    vat: number;
}

interface CustomerType {
    address: AddressType;
    name: string;
    zipcode: string;
    phoneNumber: string;
}

interface AddressType {
    oneLine: string;
}
