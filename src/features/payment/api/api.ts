import { CartProps } from '@/entities/cart/type';
import { OrderReturnType } from '@/entities/order/type';
import { ProductType } from '@/entities/product/type';
import { ProcessPaymentProps, SaveToPaymentOptionProps, SaveToPaymentProps } from '@/features/payment/model/type';
import supabase from '@/supabaseClient';
import * as PortOne from '@portone/browser-sdk/v2';

export const currentProductsStock = async (ids: number[]) => {
    const { data, error } = await supabase.from('products').select('id, stock_quantity').in('id', ids);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

const decreaseProductsStock = async (products: ProductType[]) => {
    const productIds = products.map((item) => item.id);

    const currentStock = await currentProductsStock(productIds as number[]);

    if (currentStock) {
        const updates = currentStock
            .map((product) => {
                const productToUpdate = products.find((p) => p.id === product.id);
                if (productToUpdate && product.stock_quantity > 0) {
                    return supabase
                        .from('products')
                        .update({ stock_quantity: product.stock_quantity - 1 })
                        .eq('id', product.id);
                }
                return null;
            })
            .filter((update) => update !== null);

        // 병렬로 실행
        const results = await Promise.all(updates);

        const error = results.find((result) => result.error);

        if (error) {
            throw new Error(error.error?.message);
        }
    }
};

export const increaseProductsStock = async (products: ProductType[]) => {
    const productIds = products.map((item) => item.id);

    const currentStock = await currentProductsStock(productIds as number[]);

    if (currentStock) {
        const updates = currentStock
            .map((product) => {
                const productToUpdate = products.find((p) => p.id === product.id);
                if (productToUpdate) {
                    return supabase
                        .from('products')
                        .update({ stock_quantity: product.stock_quantity + 1 })
                        .eq('id', product.id);
                }
            })
            .filter((update) => update !== null);

        //  병렬로 실행
        const results = await Promise.all(updates);

        const error = results.find((result) => result?.error);

        if (error) {
            throw new Error(error.error?.message);
        }
    }
};

const saveToPayment = async ({
    paymentId,
    addressId,
    totalAmount,
    userId,
}: SaveToPaymentProps): Promise<OrderReturnType> => {
    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                payment_id: paymentId,
                address_id: addressId,
                total_amount: totalAmount,
                user_id: userId,
                status: '주문완료',
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data[0];
};

const saveToPaymentOption = async ({ orderId, carts }: SaveToPaymentOptionProps) => {
    const options = carts.map((item) => ({
        order_id: orderId,
        grind: item.grind,
        quantity: item.quantity,
        roasting: item.roasting,
        product_id: item.product_id,
    }));

    const insertPromises = options.map((option) => supabase.from('order_options').insert([option]).select());

    const results = await Promise.all(insertPromises);

    results.forEach(({ error }) => {
        if (error) {
            throw new Error(error.message);
        }
    });
};

const deleteCarts = async (carts: CartProps[]) => {
    const cartIds = carts.map((cart) => cart.id);

    const { error } = await supabase.from('carts').delete().in('id', cartIds);

    if (error) {
        throw new Error(error.message);
    }
};

export const processPayment = async ({ carts, address, userId }: ProcessPaymentProps) => {
    const products = carts.map((item) => item.products);

    await decreaseProductsStock(products);

    const totalAmount = carts.reduce((acc, cur) => acc + cur.quantity * parseInt(cur.products.price), 0);

    const response = await PortOne.requestPayment({
        storeId: import.meta.env.VITE_STORE_ID,
        channelKey: import.meta.env.VITE_CHANNEL_KEY,
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: `${carts[0].products.name} ${carts.length > 1 && `외 ${carts.length - 1}개`}`,
        totalAmount: totalAmount,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
        customer: {
            fullName: address.name,
            phoneNumber: address.phone,
            address: {
                addressLine1: address.streetAddress,
                addressLine2: address.detailAddress,
            },
            zipcode: address.postalCode,
        },
    });

    if (response?.code != null) {
        throw new Error(response.message);
    }

    const order = await saveToPayment({
        paymentId: response?.paymentId as string,
        addressId: address.id,
        totalAmount,
        userId,
    });

    await saveToPaymentOption({ orderId: order.id, carts });
    await deleteCarts(carts);

    return response;
};
