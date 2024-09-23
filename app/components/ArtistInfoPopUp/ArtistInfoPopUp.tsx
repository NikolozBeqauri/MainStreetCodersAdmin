import { useState } from "react"
import ReusableButton from "../ReusableButton/ReusableButton"
import { ReusableIcon } from "../ReusableIcon/ReusableIcon"
import styles from './ArtistInfoPopUp.module.scss'
import Image from 'next/image'
import { SquareCard } from "../SquareCard/SquareCard"
import { albumCardsData } from "./albumCardsData/albumCardsData"
export const ArtistInfoPopUp = () => {

    const [activeTab, setActiveTab] = useState('Albums');


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
                        <ReusableButton icon={"whitePluse"} title={"New Album"} />
                    </div>

                    {activeTab === "Albums" ? <div className={styles.artistCards}>
                        {albumCardsData.map((album, index) => (
                            <SquareCard key={index} title={album.title} img={album.image} />
                        ))}
                    </div>
                        :
                        <div className={styles.artistBiography}>
                            Peggy Gou (born July 3, 1991) is a South Korean DJ and producer base
                            d in Berlin. Originally from Incheon, South Korea, she began taking piano
                            lessons at the age of 8 and moved to London during her teenage years to study Engli
                            sh. After a brief return to South Korea, Gou returned to England to study at the Londo
                            n College of Fashion. During this time, she also honed her skills in music production,
                            a hobby she had started in her younger years. Upon moving to Berlin, Gou made her offici
                            al debut in 2016 with the EPs Art of War and Art of War II, both released by the independ
                            ent label Rekids, releasing a third EP titled Seek for Maktoop the same year. As her repu
                            tation grew, she landed gigs at some of the world most iconic venues, becoming the first Ko
                            rean DJ to perform at the legendary Berlin nightclub Berghain. She has also shared the stage wi
                            th renowned artists such as DJ Koze, Moodymann, The Blessed Madonna, and secured spots at festival
                            s like Coachella, Glastonbury, and Primavera Sound. In 2018, Peggy Gou released the EP Once via Ninja
                            Tune Records, followed by the DJ mix album DJ-Kicks: Peggy Gou (2019), released by !K7 Records. In addition to r
                            eceiving rave reviews, the album marked her first appearance on the Billboard chart, peaking at number 9. Heavil
                            y inspired by 90s dance music, the single  was released in 2021 and reached number 39 on the Hot Dance/Electronic S
                            ongs chart. Her debut album I Hear You was released in July, 2024 through XL Recordings.
                        </div>}

                </div>
            </div>
        </div>
    )
}