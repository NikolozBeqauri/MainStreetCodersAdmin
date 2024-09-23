import { HeartIcon } from '../HeartIcon/HeartIcon';
import { ReusableIcon } from '../ReusableIcon/ReusableIcon';
import styles from './SquareCard.module.scss';

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
                <img className={cardImageStyle.join(" ").trim()}
                    src={`/images/${props.img}.png`}
                    alt="musician image"
                    tabIndex={0}
                />
                <div className={stylesClass.join(" ").trim()}>
                    <div className={styles.cardIconsWrapper}>
                        <HeartIcon background />
                        <ReusableIcon imgName={'threeDots'} background />
                    </div>
                </div>
            </div>

            <div className={styles.cardTitles}>
                <h3>{props.title}</h3>
            </div>
        </div>
    );
};
