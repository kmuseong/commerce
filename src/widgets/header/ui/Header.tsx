import { HeaderProps } from '@/widgets/header/model/type';
import { FC, useEffect, useRef, useState } from 'react';
import classes from './Header.module.css';

export const Header: FC<HeaderProps> = ({ children, isSpace = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header>
            <div ref={headerRef} className={`${classes.header} ${isScrolled ? classes.scrolled : ''}`}>
                {children}
            </div>
            {isSpace && <div style={{ height: `${headerHeight}px` }} className="w-full" />}
        </header>
    );
};
