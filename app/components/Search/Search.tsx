import Image from 'next/image';
import styles from "./Search.module.scss";
type Props = {
    placeHolder?: string;
}

export const Search = (props: Props) => {
    
    const placeHolder = props.placeHolder ? props.placeHolder : "Artists, tracks, albums"

    return (
        <div className={styles.searchform}>
            <input type="text" placeholder={placeHolder} />
            <Image 
                className={styles.searchImage}
                src="/icons/search.svg"
                alt="search icon"
                width={24}
                height={24}
            />
        </div>
    )
}