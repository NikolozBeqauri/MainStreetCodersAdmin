'use client'
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from './UserInfoPopUp.module.scss';
import Image from 'next/image';
import { SquareCard } from "../SquareCard/SquareCard";
import { playListCardsData } from "./playListCardsData/playListCardsData";

type User = {
    email: string;
    createdAt: string;
};

type Props = {
    user: User | null;
    onClose: () => void; 
};

export const UserInfoPopUp = (props: Props) => {
    if (!props.user) {
        return null;
    }

    return (
        <div className={styles.background} onClick={props.onClose}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div onClick={props.onClose}>
                        <ReusableIcon imgName={"rightArrow"} />
                    </div>
                    <h2>{props.user.email}</h2>
                    <div onClick={props.onClose}>
                        <ReusableIcon imgName={"deleteCross"} />
                    </div>
                </div>

                <div className={styles.userInfo}>
                    <Image
                        src={'/images/userInfoImage.png'}
                        alt='icon'
                        width={152}
                        height={152}
                    />
                    <div className={styles.userInfoContent}>
                        <div>
                            <h3>Email:</h3>
                            <span>{props.user.email}</span>
                        </div>
                        <div>
                            <h3>Registration Date:</h3>
                            <span>{props.user.createdAt}</span>
                        </div>
                        <div>
                            <h3>Playlists Created:</h3>
                            <span>4</span>
                        </div>
                    </div>
                </div>

                <div className={styles.navigationWholeWrapper}>
                    <h3>Playlists</h3>
                    <div className={styles.playListCards}>
                        {playListCardsData.map((album, index) => (
                            <SquareCard key={index} title={album.title} img={album.image} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
