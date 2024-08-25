import { type UseEmblaCarouselType } from 'embla-carousel-react';

export interface SignupType {
    email: string;
    password: string;
    nickname: string;
    isSeller: boolean;
}

export type CarouselApi = UseEmblaCarouselType[1];
