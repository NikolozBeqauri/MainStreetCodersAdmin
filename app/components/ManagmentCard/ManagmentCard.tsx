import { useRecoilState } from "recoil";
import PlaylistTable from "../PlaylistTable/PlaylistTable";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from './ManagmentCard.module.scss';
import Image from 'next/image';
import { currentAlbumState } from "@/app/states";
import ReusableButton from "../ReusableButton/ReusableButton";
import TrackPopUp from "../TrackPopUp/TrackPopUp"; 
import { useState } from "react";

type Props = {
    title: string;
    img: string;
    onClose: () => void;
};

export const ManagmentCard: React.FC<Props> = ({ title, img, onClose }) => {
    const [currentAlbum,] = useRecoilState(currentAlbumState);
    const [isTrackPopUpVisible, setTrackPopUpVisible] = useState(false); 
    
    const toggleTrackPopUp = () => {
        setTrackPopUpVisible(!isTrackPopUpVisible); 
    };

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
                            <span>{currentAlbum.title}</span>
                        </div>
                        <div className={styles.titles}>
                            <h3>created:</h3>
                            <span>{currentAlbum.releaseDate}</span>
                        </div>
                        <div className={styles.titles}>
                            <h3>Number of Tracks:</h3>
                            <span>5</span>
                        </div>
                    </div>
                </div>

                <div className={styles.headerOfAlbums}>
                    <span>Playlist Tracks</span>
                    <div onClick={toggleTrackPopUp} >
                        <ReusableButton
                            icon="whitePluse"
                            title="New Track"
                        />
                    </div>
                </div>
                <PlaylistTable img={img} />

                {isTrackPopUpVisible && (
                    <TrackPopUp />
                )}
            </div>
        </div>
    );
};
