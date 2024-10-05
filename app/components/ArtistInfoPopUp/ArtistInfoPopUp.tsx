import { useState, useRef, useEffect } from "react";
import ReusableButton from "../ReusableButton/ReusableButton";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from './ArtistInfoPopUp.module.scss';
import Image from 'next/image';
import { SquareCard } from "../SquareCard/SquareCard";
import { useForm } from 'react-hook-form';
import { NewAlbum } from '../NewAlbum/NewAlbum';
import { ManagmentCard } from '../ManagmentCard/ManagmentCard';
import Cookies from 'js-cookie';
import axios from "axios";

interface FormData {
    biography: string;
}

interface Props {
    artist: {
        image: string;
        totalStreams: number;
        totalAlbums: number;
        totalSongs: number;
        fullName: string;
    };
    onClose: () => void;
    selectedArtist: any;
}

export const ArtistInfoPopUp = (props: Props) => {
    const { artist, onClose } = props;
    const [activeTab, setActiveTab] = useState('Albums');
    const [isEditable, setIsEditable] = useState(false);
    const { register, handleSubmit } = useForm<FormData>();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isNewAlbumPopupOpen, setIsNewAlbumPopupOpen] = useState(false);
    const [isManagementCardVisible, setIsManagementCardVisible] = useState(false);
    const [selectedArtistsInfo, setselectedArtistsInfo] = useState<any>(null);

    const token = Cookies.get("token");
    console.log(selectedArtistsInfo);
    
    const fetchArtistAlbums = () => {
        axios.get(`https://project-spotify-1.onrender.com/authors/${props.selectedArtist.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        .then((res) => {
            setselectedArtistsInfo(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const deleteAlbum = (albumId: number) => {
        axios.delete(`https://project-spotify-1.onrender.com/albums/${albumId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(() => {
            fetchArtistAlbums();
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchArtistAlbums();
    }, [props.selectedArtist.id, token]);

    const onSubmit = (data: FormData) => {
        setIsEditable(false);
    };

    const activateTextarea = () => {
        setIsEditable(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    };

    const openNewAlbumPopup = () => {
        setIsNewAlbumPopupOpen(true);
    };

    const openManagementCard = (album: any) => {
        setIsManagementCardVisible(true);
    };

    const closeManagementCard = () => {
        setIsManagementCardVisible(false);
    };

    return (
        <>
            <div className={styles.background} onClick={onClose}>
                <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                    <div className={styles.header}>
                        <div onClick={onClose}>
                            <ReusableIcon imgName={"rightArrow"} />
                        </div>
                        <h2>{artist.fullName}</h2>
                        <div onClick={onClose}>
                            <ReusableIcon imgName={"deleteCross"} />
                        </div>
                    </div>

                    <div className={styles.artistInfo}>
                        <Image
                            src={artist.image}
                            alt='artist image'
                            width={267}
                            height={152}
                        />
                        <div className={styles.artistInfoContent}>
                            <div>
                                <h3>Total Streams</h3>
                                <span>{artist.totalStreams}</span>
                            </div>
                            <div>
                                <h3>Total Albums</h3>
                                <span>{artist.totalAlbums}</span>
                            </div>
                            <div>
                                <h3>Total Songs</h3>
                                <span>{artist.totalSongs}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.navigationWholeWrapper}>
                        <div className={styles.navigationWrapper}>
                            <div className={styles.navigation}>
                                <h3
                                    className={activeTab === 'Albums' ? styles.active : ''}
                                    onClick={() => setActiveTab('Albums')}
                                >
                                    Albums
                                </h3>
                                <h3
                                    className={activeTab === 'Biography' ? styles.active : ''}
                                    onClick={() => setActiveTab('Biography')}
                                >
                                    Biography
                                </h3>
                            </div>
                            {activeTab === "Albums" ? (
                                <div onClick={openNewAlbumPopup}>
                                    <ReusableButton icon={"whitePluse"} title={"New Album"} />
                                </div>
                            ) : (
                                <div
                                    className={styles.biographyButton}
                                    onClick={activateTextarea}
                                >
                                    <Image
                                        src={'/icons/whiteEdit.svg'}
                                        alt='edit icon'
                                        width={24}
                                        height={24}
                                    />
                                    <span>Edit</span>
                                </div>
                            )}
                        </div>

                        {activeTab === "Albums" ? (
                            <div className={styles.artistCards}>
                                {selectedArtistsInfo?.albums?.map((album: any, index: number) => (
                                    <SquareCard
                                        key={index}
                                        title={album.title || 'No Title Available'}
                                        img={album.coverImage || '/icons/whiteTrash.svg'}
                                        onClick={() => openManagementCard(album)}
                                        deleteAlbum={() => deleteAlbum(album.id)} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <form className={styles.artistBiography} onSubmit={handleSubmit(onSubmit)}>
                                <textarea
                                    className={styles.textarea}
                                    {...register('biography')}
                                    ref={textareaRef}
                                    defaultValue={selectedArtistsInfo?.biography}
                                    readOnly={!isEditable}
                                />
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {isNewAlbumPopupOpen && (
                <NewAlbum
                    artistId={props.selectedArtist.id}
                    setselectedArtistsInfo={setselectedArtistsInfo}
                    refreshAlbums={fetchArtistAlbums}
                />
            )}

            {isManagementCardVisible && (
                <ManagmentCard
                    title={artist.fullName}
                    img={artist.image}
                    onClose={closeManagementCard}
                />
            )}
        </>
    );
};
