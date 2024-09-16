import { ResponsePaymentType } from '@/entities/payment/type';

export const confrimPayment = async (paymentId: string): Promise<ResponsePaymentType> => {
    const paymentResponse = await fetch(`https://api.portone.io/payments/${encodeURIComponent(paymentId)}`, {
        headers: {
            Authorization: `PortOne ${import.meta.env.VITE_PORTONE_API_SECRET}`,
            'Content-Type': 'application/json',
        },
    });

    if (!paymentResponse.ok) {
        throw new Error(paymentResponse.statusText);
    }

    const data = await paymentResponse.json();

    console.log(data);

    return data;
};
