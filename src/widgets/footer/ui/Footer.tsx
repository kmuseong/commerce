import React, { useEffect, useRef, useState } from 'react';
import classes from './Footer.module.css';
import { FooterProps } from '@/widgets/footer/model/type';

export const Footer: React.FC<FooterProps> = ({ children }) => {
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
            <div ref={footerRef} className={classes.footer}>
                {children}
            </div>
            <div style={{ height: `${footerHeight}px` }} className="w-full" />
        </footer>
    );
};
