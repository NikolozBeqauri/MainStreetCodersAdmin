'use client';
import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import styles from './contentTable.module.scss';
import { useForm } from 'react-hook-form';

interface DataType {
    albums: any;
    key: string;
    artist: string;
    totalStreams: number;
    totalAlbums: number;
    totalSongs: number;
    image: string;
    name?: any;
    id?: any;
    files?: any;
    firstName?: any;
    lastName?: any;
}

const ContentTable: React.FC = () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [active, setActive] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { register, handleSubmit } = useForm();

    const tableData: DataType[] = [
        {
            key: '1',
            artist: 'Artist 1',
            totalStreams: 12000,
            totalAlbums: 3,
            totalSongs: 30,
            image: '/images/artist1.png',
            files: [{ url: '/images/artist1.png' }],
            firstName: 'John',
            lastName: 'Doe',
            id: 1,
            albums: undefined,
        },
        {
            key: '2',
            artist: 'Artist 2',
            totalStreams: 5000,
            totalAlbums: 2,
            totalSongs: 20,
            image: '/images/artist2.png',
            files: [{ url: '/images/artist2.png' }],
            firstName: 'Jane',
            lastName: 'Smith',
            id: 2,
            albums: undefined,
        },
        {
            key: '3',
            artist: 'Artist 3',
            totalStreams: 20000,
            totalAlbums: 5,
            totalSongs: 50,
            image: '/images/artist3.png',
            files: [{ url: '/images/artist3.png' }],
            firstName: 'Mike',
            lastName: 'Johnson',
            id: 3,
            albums: undefined,
        },
        {
            key: '4',
            artist: 'Artist 4',
            totalStreams: 8000,
            totalAlbums: 1,
            totalSongs: 10,
            image: '/images/artist4.png',
            files: [{ url: '/images/artist4.png' }],
            firstName: 'Sarah',
            lastName: 'Lee',
            id: 4,
            albums: undefined,
        },
    ]
           
    

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedKeys(new Set(tableData.map((item) => item.key)));
        } else {
            setSelectedKeys(new Set());
        }
    };

    const handleSelectOne = (key: string) => {
        setSelectedKeys((prev) => {
            const newSet = new Set(prev);
            newSet.has(key) ? newSet.delete(key) : newSet.add(key);
            return newSet;
        });
    };

    const onSubmit = (values: any) => {

    };

    const columns: ColumnsType<DataType> = [
        {
            title: () => (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="checkbox"
                        className={styles.inp}
                        {...register('selectAll')}
                        onChange={(e) => {
                            handleSelectAll(e.target.checked);
                            handleSubmit(onSubmit)();
                        }}
                    />
                </form>
            ),
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (text, record) => (
                <form className={styles.wrapperTwo} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="checkbox"
                        className={styles.inp}
                        {...register(`select-${record.id}`)}
                        checked={selectedKeys.has(record.key)}
                        onChange={() => {
                            handleSelectOne(record.key);
                            handleSubmit(onSubmit)();
                        }}
                    />
                </form>
            ),
            width: '5%',
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
            render: (text, record) => (
                <div className={styles.artistCell}>
                    <img className={styles.image} src={record.files[0]?.url} width={40} height={40} alt={text} />
                    <span>{record.firstName}</span>
                </div>
            ),
            width: '30%',
        },
        {
            title: 'Total Streams',
            dataIndex: 'totalStreams',
            key: 'totalStreams',
            width: '10%',
            render: (text, record) => <div>{record.totalStreams}</div>,
        },
        {
            title: 'Total Albums',
            dataIndex: 'totalAlbums',
            key: 'totalAlbums',
            width: '20%',
            render: (text) => <div className={styles.changeSize}>{text}</div>,
        },
        {
            title: 'Total Songs',
            dataIndex: 'totalSongs',
            key: 'totalSongs',
            width: '20%',
            render: (text) => <div className={styles.changeSize}>{text}</div>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className={styles.actions}>
                    <button onClick={() => setActive(true)} className={styles.unBorderPen}>
                        <Image src={`/icons/whiteEdit.svg`} width={24} height={24} alt="pen" />
                    </button>
                    <button onClick={() => console.log(`Delete record with ID ${record.id}`)} className={styles.unBorder}>
                        <Image src={`/icons/whiteTrash.svg`} width={24} height={24} alt="trash" />
                    </button>
                </div>
            ),
            width: '15%',
        },
    ];

    return (
        <>
            <Table
                className={styles.wrapper}
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 7, position: ['bottomCenter'] }}
                rowKey="id" 
            />
            {showAlert && <div>Alert Placeholder</div>}
            {active && (
                <div className={styles.popup}>
                    <div onClick={() => setActive(false)}>Popup Placeholder</div>
                </div>
            )}
        </>
    );
};

export default ContentTable;
