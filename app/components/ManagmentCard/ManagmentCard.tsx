import PlaylistTable from "../PlaylistTable/PlaylistTable"
import { ReusableIcon } from "../ReusableIcon/ReusableIcon"
import styles from './ManagmentCard.module.scss'
import Image from 'next/image'

export const ManagmentCard = () => {

    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <ReusableIcon imgName={"rightArrow"} />
                    <h2>Dolores Chambers</h2>
                    <ReusableIcon imgName={"deleteCross"} />
                </div>

                <div className={styles.artistInfo}>
                    <Image
                        src={'/images/managmentCard.png'}
                        alt='icon'
                        width={170}
                        height={152}
                    />
                    <div className={styles.artistInfoContent}>
                        <div className={styles.titles}>
                            <h3>react-hook-form</h3>
                            <span>Playlist name 4</span>
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
                <PlaylistTable/>
            </div>
        </div>
        
    )
}
