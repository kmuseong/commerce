import { z } from 'zod';

export const schema = z.object({
    email: z.string().email({ message: '유효한 이메일을 입력해주세요.' }).min(1, { message: '이메일을 입력해주세요.' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }), // 나중에 최소 비밀번호 길이 설정하기
});
