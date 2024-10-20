'use client'; 
import axios from 'axios';
import { ManagmentCard } from '../ManagmentCard/ManagmentCard';
import { ReusableIcon } from '../ReusableIcon/ReusableIcon';
import styles from './SquareCard.module.scss';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { message } from 'antd';

type Props = {
    albumId?: number;
    title: string;
    img: string;
    onClick?: () => void;
    deleteAlbum?: () => void;
    isManagementCardVisible?: any;
    setIsManagementCardVisible?: Function | undefined;
    selectedArtistsInfo?: any;
    refreshAlbums?: () => void;
    userPlaylist?: boolean;
    fetchPlaylists?: () => void; 
};

export const SquareCard = (props: Props) => {
    const stylesClass = [styles.cardIconsBackground];
    const cardImageStyle = [styles.defaultCardStyles];
    const token = Cookies.get("token");

    
    const closeManagementCard = () => {
        if (props.setIsManagementCardVisible) {
            props.setIsManagementCardVisible(false);
        }
    };

    const handleDeleteClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if(props.userPlaylist){
            if(props.fetchPlaylists){
                try {
                    await axios.delete(`https://project-spotify-1.onrender.com/playlist/${props?.albumId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Playlist deleted successfully');
                    message.success('Playlist deleted successfully'); 
                    props.fetchPlaylists();
                } catch (err) {
                    console.error('Error deleting playlist:', err);
                    message.error('Failed to delete playlist'); 

                }
            }
        }
             
        if (props.deleteAlbum) {
            props.deleteAlbum();
        }
        if (props.refreshAlbums) {
            props.refreshAlbums();
        }   
    };
        
    return (
        <>
            <div className={styles.cardWrapper} onClick={props.onClick}>
                <div className={styles.cardImageWrapper}>
                    <Image
                        className={cardImageStyle.join(' ').trim()}
                        src={`${props.img}`}
                        alt={`${props.title} image`}
                        width={200}
                        height={200}
                        objectFit="cover"
                    />
                    <div className={stylesClass.join(' ').trim()}>
                        <div className={styles.cardIconsWrapper} onClick={handleDeleteClick}>
                            <ReusableIcon imgName={'delete'} background />
                        </div>
                    </div>
                </div>

                <div className={styles.cardTitles}>
                    <h3>{props.title}</h3>
                </div>
            </div>

            {props.isManagementCardVisible && (
                <ManagmentCard
                    title={props.selectedArtistsInfo.fullName}
                    img={props.selectedArtistsInfo.image}
                    onClose={closeManagementCard}
                />
            )}
        </>
    );
};
