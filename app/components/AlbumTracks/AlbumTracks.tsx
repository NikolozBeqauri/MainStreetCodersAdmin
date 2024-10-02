import PlaylistTable from "../PlaylistTable/PlaylistTable"
import { ReusableIcon } from "../ReusableIcon/ReusableIcon"
import styles from './AlbumTracks.module.scss'
import Image from 'next/image'


export const AlbumTracks = () => {
    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <ReusableIcon imgName={"rightArrow"} />
                    <h2>Peggy Gou</h2>
                    <ReusableIcon imgName={"deleteCross"} />
                </div>

                <div className={styles.artistInfo}>
                    <Image
                        src={'/images/artistinfoimage.png'}
                        alt='icon'
                        width={267}
                        height={152}
                    />
                    <div className={styles.artistInfoContent}>
                        <div>
                            <h3>Total Streams</h3>
                            <span>267,400</span>
                        </div>
                        <div>
                            <h3>Total Albums</h3>
                            <span>4</span>
                        </div>
                        <div>
                            <h3>Total Songs</h3>
                            <span>67</span>
                        </div>
                    </div>
                </div>
                <span>Playlist Tracks</span>
                <PlaylistTable />
            </div>
        </div>
    )
}