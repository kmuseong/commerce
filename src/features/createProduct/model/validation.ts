import { z } from 'zod';

export const schema = z.object({
    name: z.string().min(1, { message: '제목을 입력해주세요.' }),
    description: z.string().min(1, { message: '제품 설명을 입력해주세요.' }),
    origin: z.string().min(1, { message: '원산지를 입력해주세요.' }),
    bean_type: z.string().min(1, { message: '원두 종류를 입력해주세요.' }),
    price: z.string().min(1, { message: '가격을 입력해주세요.' }),
    weight: z.string().min(1, { message: '무게를 선택해주세요.' }),
    stock_quantity: z.string().min(1, { message: '수량을 입력해주세요.' }),
});
