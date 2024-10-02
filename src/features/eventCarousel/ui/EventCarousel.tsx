import React, { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import image1 from '@/assets/event/event-1.webp';
import image2 from '@/assets/event/event-2.webp';

const eventList = [image1, image2];

export const EventCarousel: React.FC = () => {
    const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

    return (
        <Carousel plugins={[plugin.current]} className="w-full h-full lg:min-h-[650px]">
            <CarouselContent className="lg:min-h-[650px]">
                {eventList.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="h-full w-full">
                            <img
                                src={item}
                                alt={`event_image_${index}`}
                                width={'1200px'}
                                height={'700px'}
                                className="object-cover min-w-[1200px] h-full"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};
