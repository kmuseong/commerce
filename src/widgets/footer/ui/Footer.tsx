import React, { useEffect, useRef, useState } from 'react';
import { FooterProps } from '@/widgets/footer/model/type';

export const Footer: React.FC<FooterProps> = ({ children, className }) => {
    const footerRef = useRef<HTMLDivElement | null>(null);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        if (footerRef.current) {
            setFooterHeight(footerRef.current.offsetHeight);
        }

        const handleResize = () => {
            if (footerRef.current) {
                setFooterHeight(footerRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <footer>
            <div
                ref={footerRef}
                className={`w-full flex gap-3 p-2 fixed bottom-0 justify-around border-t border-[#8a8a8a1a] bg-[#937664] lg:w-[600px] ${className} !important`}
            >
                {children}
            </div>
            <div style={{ height: `${footerHeight}px` }} className="w-full" />
        </footer>
    );
};
