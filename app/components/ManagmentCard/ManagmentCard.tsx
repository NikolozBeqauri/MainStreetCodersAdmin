import PlaylistTable from "../PlaylistTable/PlaylistTable";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from './ManagmentCard.module.scss';
import Image from 'next/image';

type Props = {
    title: string;
    img: string;
    onClose: () => void;
};

export const ManagmentCard: React.FC<Props> = ({ title, img, onClose }) => {

    

    return (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div onClick={onClose}>
                        <ReusableIcon imgName={"rightArrow"} />
                    </div>
                    <h2>{title}</h2>
                    <div onClick={onClose}>
                        <ReusableIcon imgName={"deleteCross"} />
                    </div>
                </div>

                <div className={styles.artistInfo}>
                    <Image
                        src={img}
                        alt='icon'
                        width={170}
                        height={152}
                    />
                    <div className={styles.artistInfoContent}>
                        <div className={styles.titles}>
                            <h3>Album Name:</h3>
                            <span>{title}</span>
                        </div>
                        <div className={styles.titles}>
                            <h3>created:</h3>
                            <span>September 17, 2024 11:22</span>
                        </div>
                        <div className={styles.titles}>
                            <h3>Number of Tracks:</h3>
                            <span>5</span>
                        </div>
                    </div>
                </div>
                <span>Playlist Tracks</span>
                <PlaylistTable />
            </div>
        </div>
    );
};
