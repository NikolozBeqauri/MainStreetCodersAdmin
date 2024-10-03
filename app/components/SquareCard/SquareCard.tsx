import { ReusableIcon } from '../ReusableIcon/ReusableIcon';
import styles from './SquareCard.module.scss';
import Image from 'next/image'; 

type Props = {
    title: string;
    img: string;
    onClick?: () => void; 
};

export const SquareCard = (props: Props) => {
    const stylesClass = [styles.cardIconsBackground];
    const cardImageStyle = [styles.defaultCardStyles];

    return (
        <div className={styles.cardWrapper} onClick={props.onClick}>
            <div className={styles.cardImageWrapper}>
                <Image
                    className={cardImageStyle.join(' ').trim()}
                    src={`/images/${props.img}.png`}
                    alt={`${props.title} image`}
                    width={200}
                    height={200} 
                    objectFit="cover" 
                />
                <div className={stylesClass.join(' ').trim()}>
                    <div className={styles.cardIconsWrapper}>
                        <ReusableIcon imgName={'delete'} background />
                    </div>
                </div>
            </div>

            <div className={styles.cardTitles}>
                <h3>{props.title}</h3>
            </div>
        </div>
    );
};
