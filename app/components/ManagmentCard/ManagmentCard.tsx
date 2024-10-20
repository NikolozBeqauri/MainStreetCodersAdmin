import { useRecoilState } from "recoil";
import PlaylistTable from "../PlaylistTable/PlaylistTable";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from './ManagmentCard.module.scss';
import Image from 'next/image';
import { currentAlbumState } from "@/app/states";
import ReusableButton from "../ReusableButton/ReusableButton";
import TrackPopUp from "../TrackPopUp/TrackPopUp"; 
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type Props = {
    title: string;
    img: string;
    onClose: () => void;
};

export const ManagmentCard: React.FC<Props> = ({ title, img, onClose }) => {
    const [currentAlbum,] = useRecoilState(currentAlbumState);
    const [isTrackPopUpVisible, setTrackPopUpVisible] = useState(false); 
    const token = Cookies.get("token");
    const [numberOfMusics, setNumberOfMusics] = useState(0)

    axios.get(`https://project-spotify-1.onrender.com/album/${currentAlbum.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNumberOfMusics(res.data.musics.length);
      })
      .catch((err) => {
        console.log(err);
      });
    
    
    const openTrackPopUp = () => {
        setTrackPopUpVisible(true);
    };

    const closeTrackPopUp = () => {
        setTrackPopUpVisible(false);
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
                            <span>{numberOfMusics}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.headerOfAlbums}>
                    <span>Playlist Tracks</span>
                    <div onClick={openTrackPopUp}>
                        <ReusableButton
                            icon="whitePluse"
                            title="New Track"
                        />
                    </div>
                </div>
                <PlaylistTable img={img} albumId={currentAlbum.id} />

                {isTrackPopUpVisible && (
                    <TrackPopUp onClose={closeTrackPopUp} albumId={currentAlbum.id}/>
                )}
            </div>
        </div>
    );
};
