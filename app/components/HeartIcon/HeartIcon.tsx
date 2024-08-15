"use client"
import styles from "./HeartIcon.module.scss";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

type Props = {
    background?: boolean;
    width?: number;
    height?: number;
    padding?: number;
}

export const HeartIcon = ({ background, width, height, padding }: Props) => {
    const [iconState, setIconState] = useState<'neutral' | 'hover' | 'pressed'>('neutral');
    const imgRef = useRef<HTMLImageElement>(null);
    
    const stylesClasses = [styles.generalStyles];
    if (background) stylesClasses.push(styles.whiteBackground);

    const handleMouseEnter = () => {
        if (iconState !== 'pressed') setIconState('hover');
    };
    const handleMouseLeave = () => {
        if (iconState !== 'pressed') setIconState('neutral');
    };
    const handleMouseDown = () => {
        setIconState(prevState => (prevState === 'pressed' ? 'neutral' : 'pressed'));
    };

    useEffect(() => {
        const imgElement = imgRef.current;

        if (imgElement) {
            imgElement.addEventListener('mouseenter', handleMouseEnter);
            imgElement.addEventListener('mouseleave', handleMouseLeave);
            imgElement.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (imgElement) {
                imgElement.removeEventListener('mouseenter', handleMouseEnter);
                imgElement.removeEventListener('mouseleave', handleMouseLeave);
                imgElement.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, [iconState]);

    return (
        <Image
            ref={imgRef}
            className={stylesClasses.join(" ").trim()}
            src={`/icons/heartIcons/${iconState}Heart.svg`}
            alt="heart icon"
            width={width ? width : 32}
            height={height ? height : 32}
            style={{
                padding: `${padding}` 
            }}
            tabIndex={0} 
        />
    );
};
