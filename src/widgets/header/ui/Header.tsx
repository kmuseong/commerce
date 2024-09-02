import { HeaderProps } from '@/widgets/header/model/type';
import React, { useEffect, useRef, useState } from 'react';
import classes from './Header.module.css';

export const Header: React.FC<HeaderProps> = ({ children }) => {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }

        const handleResize = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header>
            <div ref={headerRef} className={classes.header}>
                {children}
            </div>
            <div style={{ height: `${headerHeight}px` }} className="w-full"></div>
        </header>
    );
};
