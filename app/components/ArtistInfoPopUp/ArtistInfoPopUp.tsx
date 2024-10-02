import { useState, useRef } from "react";
import ReusableButton from "../ReusableButton/ReusableButton";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from './ArtistInfoPopUp.module.scss';
import Image from 'next/image';
import { SquareCard } from "../SquareCard/SquareCard";
import { albumCardsData } from "./albumCardsData/albumCardsData";
import { useForm } from 'react-hook-form';

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
}

export const ArtistInfoPopUp = (props: Props) => {
    const { artist, onClose } = props;
    const [activeTab, setActiveTab] = useState('Albums');
    const [isEditable, setIsEditable] = useState(false);
    const { register, handleSubmit } = useForm<FormData>();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onSubmit = (data: FormData) => {
        setIsEditable(false);
    };

    const activateTextarea = () => {
        setIsEditable(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    };

    const handlePopupClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation(); 
    };

    return (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.wrapper} onClick={handlePopupClick}>
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
                        {activeTab === "Albums" ?
                            <ReusableButton icon={"whitePluse"} title={"New Album"} />
                            :
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
                        }
                    </div>

                    {activeTab === "Albums" ?
                        <div className={styles.artistCards}>
                            {albumCardsData.map((album, index) => (
                                <SquareCard key={index} title={album.title} img={album.image} />
                            ))}
                        </div>
                        :
                        <form className={styles.artistBiography} onSubmit={handleSubmit(onSubmit)}>
                            <textarea
                                className={styles.textarea}
                                {...register('biography')}
                                ref={textareaRef}
                                defaultValue={`Biography of ${artist.fullName}`}
                                readOnly={!isEditable}
                            />
                        </form>}
                </div>
            </div>
        </div>
    );
};
