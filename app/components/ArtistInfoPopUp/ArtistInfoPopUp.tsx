import { useState, useRef } from "react"
import ReusableButton from "../ReusableButton/ReusableButton"
import { ReusableIcon } from "../ReusableIcon/ReusableIcon"
import styles from './ArtistInfoPopUp.module.scss'
import Image from 'next/image'
import { SquareCard } from "../SquareCard/SquareCard"
import { albumCardsData } from "./albumCardsData/albumCardsData"
import { useForm } from 'react-hook-form';

interface FormData {
    biography: string;
}

export const ArtistInfoPopUp = () => {

    const [activeTab, setActiveTab] = useState('Albums');
    const [isEditable, setIsEditable] = useState(false);  
    const { register, handleSubmit, setValue } = useForm<FormData>();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
        setIsEditable(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSubmit(onSubmit)();
        }
    };

    const activateTextarea = () => {
        setIsEditable(true); 
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    };

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
                                    alt='icon'
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
                                defaultValue={`Peggy Gou (born July 3, 1991) is a South Korean DJ and producer based in Berlin. Originally from Incheon, South Korea, she began taking piano lessons at the age of 8 and moved to London during her teenage years to study English. After a brief return to South Korea, Gou returned to England to study at the London College of Fashion. During this time, she also honed her skills in music production, a hobby she had started in her younger years. Upon moving to Berlin, Gou made her official debut in 2016 with the EPs Art of War and Art of War II, both released by the independent label Rekids, releasing a third EP titled Seek for Maktoop the same year. As her reputation grew, she landed gigs at some of the world's most iconic venues, becoming the first Korean DJ to perform at the legendary Berlin nightclub Berghain. She has also shared the stage with renowned artists such as DJ Koze, Moodymann, The Blessed Madonna, and secured spots at festivals like Coachella, Glastonbury, and Primavera Sound. In 2018, Peggy Gou released the EP Once via Ninja Tune Records, followed by the DJ mix album DJ-Kicks: Peggy Gou (2019), released by !K7 Records. In addition to receiving rave reviews, the album marked her first appearance on the Billboard chart, peaking at number 9. Heavily inspired by 90s dance music, the single "I Go" was released in 2021 and reached number 39 on the Hot Dance/Electronic Songs chart. Her debut album I Hear You was released in July, 2024 through XL Recordings.`}
                                onKeyDown={handleKeyDown} 
                                readOnly={!isEditable} 
                            />
                        </form>}
                </div>
            </div>
        </div>
    )
}
