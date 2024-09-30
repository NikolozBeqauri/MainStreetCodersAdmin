import React from 'react';
import { Table } from 'antd';
import styles from './ReusubleTable.module.scss';
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
            title: 'Song Name',
            key: 'SongName',
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
            title: 'Time',
            key: 'Time',
            render: (record: any) => (
                <div className={styles.time}>
                    {record.Time}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: any) => (
                <div  className={styles.icon}>
                  <img src="/icons/deleteTable.svg" alt="" />
                </div>  
            ),
        },
    ];

    const data = [
        {
            key: '1',
            SongName: 'Girls Are Fascinating',
            Author: 'By Anetha',
            Time: '3:54',
            src: '/images/music1.png',
        },
        {
            key: '2',
            SongName: 'Smash My Heart',
            Author: 'By Robin Schulz',
            Time: '3:10',
            src: './images/music2.png',
        },
        {
            key: '3',
            SongName: 'Blackbird',
            Author: 'By Beyonce',
            Time: '3:10',
            src: './images/music3.png',
        },
        {
            key: '4',
            SongName: 'Human',
            Author: 'By Lenny Kravitz',
            Time: '3:54',
            src: './images/music4.png',
        },
        {
            key: '5',
            SongName: 'Toes',
            Author: 'By Glass Animals',
            Time: '4:10',
            src: './images/music5.png',
        },
    ];

    return (
        <div className={styles.wrapper}>
            <Table pagination={false} columns={columns} dataSource={data} />
        </div>
    );
};
