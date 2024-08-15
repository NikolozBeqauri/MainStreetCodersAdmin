import React from 'react';
import { Table } from 'antd';
import 'antd/dist/reset.css';
import styles from './ReusubleTable.module.scss'
import { HeartIcon } from '../HeartIcon/HeartIcon';


export const ReusableTable = () => {
    const columns = [
        {
            title: '#',
            key: 'key',
            render: (record: any) => (
                <div className={styles.key}>{record.key}</div>
            ),
        },
        {
            title: 'SongName',
            key: 'key',
            render: (record: any) => (
                <div className={styles.infoWrapper}>
                    <img src={record.src} alt="tableMusic" width={48} height={48} />
                    <div className={styles.wrapper}>
                        <div className={styles.songName}>
                            {record.SongName}
                        </div>
                        <div className={styles.author}>
                            {record.Author}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Album',
            key: 'key',
            render: (record: any) => (
                <div className={styles.albumName}>
                    {record.Album}
                </div>
            ),
        },
        {
            title: 'Time',
            key: 'key',
            render: (record: any) => (
                <div className={styles.time}>
                    {record.Time}
                </div>
            ),
        },
        {
    
            key: 'key',
            render: (record: any) => (
                <div className={styles.icon}>
                   <HeartIcon />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            SongName: 'Girls Are Fascinating',
            Author: 'By Anetha',
            Album: "Mothearth",
            Time: '3:54',
            src: '/images/music1.png',
        },
        {
            key: '2',
            SongName: 'Smash My Heart',
            Author: 'By Robin Schulz',
            Album: "Pink",
            Time: '3:10',
            src: './images/music2.png',
        },
        {
            key: '3',
            SongName: 'Blackbird',
            Author: 'By Beyonce',
            Album: "Cowboy Carter",
            Time: '3:10',
            src: './images/music3.png'
        },
        {
            key: '4',
            SongName: 'Human',
            Author: 'By Lenny Kravitz',
            Album: "Blue Electric Light",
            Time: '3:54',
            src: './images/music4.png'
        },
        {
            key: '5',
            SongName: 'Toes',
            Author: 'By Glass Animals',
            Album: "Zaba",
            Time: '4:10',
            src: './images/music5.png'
        },
        {
            key: '6',
            SongName: 'Picture Of You',
            Author: 'By Anyma',
            Album: "Genesys II    ",
            Time: '3:54',
            src: './images/music6.png'
        }, {
            key: '7',
            SongName: 'End Of An Era',
            Author: 'By Dua Lipa',
            Album: "Radical Optimism",
            Time: '5:32',
            src: './images/music7.png'
        },
        {
            key: '8',
            SongName: 'Your Art',
            Author: 'By Peggy Gou',
            Album: "I Hear You",
            Time: '3:54',
            src: './images/music8.png'
        },
        {
            key: '9',
            SongName: 'Poker Face',
            Author: 'By Lady Gaga',
            Album: "The Fame Monster",
            Time: '3:54',
            src: './images/music9.png'
        },
        {
            key: '10',
            SongName: 'The man',
            Author: 'By Taylor Swift',
            Album: "Lover",
            Time: '3:54',
            src: './images/music10.png'
        },
        {
            key: '11',
            SongName: 'So Fresh, So  Clean',
            Author: 'By Outkast',
            Album: "Stankonia",
            Time: "3:54",
            src: './images/music11.png'
        }


    ];

    return (
        <div className={styles.wrapper} >
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

