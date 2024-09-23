import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const changePrice = (price: number) => {
    return price.toLocaleString('ko-KR');
};

export const formatPhoneNumber = (numbers: string) => {
    if (numbers.length !== 11) {
        throw new Error('11개의 숫자를 입력해야 합니다.');
    }

    const formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;

    return formattedNumber;
};
