import { ReusableIcon } from "../ReusableIcon/ReusableIcon"
import styles from './UserInfoPopUp.module.scss'
import Image from 'next/image'
import { SquareCard } from "../SquareCard/SquareCard"
import { playListCardsData } from "./playListCardsData/playListCardsData"
export const UserInfoPopUp = () => {

    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <ReusableIcon imgName={"rightArrow"} />
                    <h2>Peggy Gou</h2>
                    <ReusableIcon imgName={"deleteCross"} />
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
                            <span>dolores.chambers@example.com</span>
                        </div>
                        <div>
                            <h3>Registration Date:</h3>
                            <span>September 17, 2024 11:22</span>
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
    )
}