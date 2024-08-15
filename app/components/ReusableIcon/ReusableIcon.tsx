'use client'

import { useState } from "react";
import styles from "./ReusableIcon.module.scss";

type Props = {
    imgName: string,
    background?: boolean,
    active?: boolean,
    isHovered?: boolean,
    width?: number,
    height?: number,
    onFocus?: () => void,
}

export const ReusableIcon = (props: Props) => {
    const imageName = props.active ? `${props.imgName}Active` : props.imgName;
    
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus();
    };


    const stylesClasses = [styles.generalStyles];
    if (props.background) stylesClasses.push(styles.whiteBackground);
    if (props.active || isFocused || props.isHovered) stylesClasses.push(styles.active);
    
    return (
        <img
            className={stylesClasses.join(" ").trim()}
            src={`/icons/${imageName}.svg`}
            alt="icon"
            width={props.width ? props.width : 32}
            height={props.height ? props.height : 32}
            onFocus={handleFocus}
            tabIndex={0}
        />
    );
};
