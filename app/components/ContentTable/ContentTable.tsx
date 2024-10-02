'use client';
import React, { useState, useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import styles from './contentTable.module.scss';
import { DeletePopUp } from '../DeletePopUp/DeletePopUp';
import ReusableButton from '../ReusableButton/ReusableButton';
import { ArtistInfoPopUp } from '../ArtistInfoPopUp/ArtistInfoPopUp';
import { NewArtistPopUp } from '../NewArtistPopUp/NewArtistPopUp';

interface DataType {
    albums: any;
    key: string;
    totalStreams: number;
    totalAlbums: number;
    totalSongs: number;
    image: string;
    fullName: string;
    id?: any;
    files?: any;
}

const ContentTable: React.FC = () => {
    const [active, setActive] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedArtist, setSelectedArtist] = useState<DataType | null>(null);
    const [showNewArtistPopup, setShowNewArtistPopup] = useState(false);

    const tableData: DataType[] = [
        {
            key: '1',
            totalStreams: 12000,
            totalAlbums: 3,
            totalSongs: 30,
            image: '/images/artist1.png',
            files: [{ url: '/images/artist1.png' }],
            fullName: 'John Doe',
            id: 1,
            albums: undefined,
        },
        {
            key: '2',
            totalStreams: 5000,
            totalAlbums: 2,
            totalSongs: 20,
            image: '/images/artist2.png',
            files: [{ url: '/images/artist2.png' }],
            fullName: 'Jane Smith',
            id: 2,
            albums: undefined,
        },
        {
            key: '3',
            totalStreams: 20000,
            totalAlbums: 5,
            totalSongs: 50,
            image: '/images/artist3.png',
            files: [{ url: '/images/artist3.png' }],
            fullName: 'Mike Johnson',
            id: 3,
            albums: undefined,
        },
        {
            key: '4',
            totalStreams: 8000,
            totalAlbums: 1,
            totalSongs: 10,
            image: '/images/artist4.png',
            files: [{ url: '/images/artist4.png' }],
            fullName: 'Sarah Lee',
            id: 4,
            albums: undefined,
        },
    ];

    const filteredData = useMemo(() => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        const filtered = tableData.filter((item) =>
            item.fullName?.toLowerCase().includes(lowerSearchQuery)
        );
        return filtered.sort((a, b) => {
            const isExactMatchA = a.fullName?.toLowerCase() === lowerSearchQuery;
            const isExactMatchB = b.fullName?.toLowerCase() === lowerSearchQuery;
            if (isExactMatchA && !isExactMatchB) {
                return -1;
            } else if (!isExactMatchA && isExactMatchB) {
                return 1;
            } else {
                return 0;
            }
        });
    }, [searchQuery, tableData]);

    const handleDeleteClick = (id: number, event: React.MouseEvent) => {
        event.stopPropagation();
        setCurrentDeleteId(id);
        setShowDeletePopup(true);
    };

    const handleDeleteConfirm = () => {
        setShowDeletePopup(false);
        setCurrentDeleteId(null);
    };

    const handleDeleteCancel = () => {
        setShowDeletePopup(false);
        setCurrentDeleteId(null);
    };

    const closeArtistPopup = () => {
        setSelectedArtist(null);
    };

    const closeNewArtistPopup = () => {
        setShowNewArtistPopup(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text, record) => (
                <div
                    className={styles.artistCell}
                    onClick={() => setSelectedArtist(record)}
                >
                    <img className={styles.image} src={record.files[0]?.url} width={40} height={40} alt={text} />
                    <span>{record.fullName}</span>
                </div>
            ),
            width: '30%',
        },
        {
            title: 'Total Streams',
            dataIndex: 'totalStreams',
            key: 'totalStreams',
            width: '10%',
            render: (text, record) => (
                <div onClick={() => setSelectedArtist(record)}>
                    {record.totalStreams}
                </div>
            ),
        },
        {
            title: 'Total Albums',
            dataIndex: 'totalAlbums',
            key: 'totalAlbums',
            width: '20%',
            render: (text, record) => (
                <div onClick={() => setSelectedArtist(record)}>
                    {record.totalAlbums}
                </div>
            ),
        },
        {
            title: 'Total Songs',
            dataIndex: 'totalSongs',
            key: 'totalSongs',
            width: '20%',
            render: (text, record) => (
                <div onClick={() => setSelectedArtist(record)}>
                    {record.totalSongs}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className={styles.actions}>
                    <button onClick={() => setSelectedArtist(record)} className={styles.unBorderPen}>
                        <Image src={`/icons/whiteEdit.svg`} width={24} height={24} alt="pen" />
                    </button>
                    <button onClick={(event) => handleDeleteClick(record.id, event)} className={styles.unBorder}>
                        <Image src={`/icons/whiteTrash.svg`} width={24} height={24} alt="trash" />
                    </button>
                </div>
            ),
            width: '15%',
        },
    ];

    return (
        <>
            <div className={styles.artistAddButton}>
                <div onClick={() => setShowNewArtistPopup(true)}>
                    <ReusableButton icon='addArtist' title='Add' />
                </div>
            </div>

            <input
                placeholder="Search by full name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />

            <div>
                <Table
                    className={styles.wrapper}
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 7, position: ['bottomCenter'] }}
                    rowKey="id"
                />
                {showDeletePopup && (
                    <DeletePopUp
                        onClose={handleDeleteCancel}
                        onDelete={handleDeleteConfirm}
                    />
                )}
                {selectedArtist && (
                    <ArtistInfoPopUp
                        artist={selectedArtist}
                        onClose={closeArtistPopup}
                    />
                )}
                {showNewArtistPopup && (
                    <NewArtistPopUp
                        onClose={closeNewArtistPopup}
                    />
                )}
            </div>
        </>
    );
};

export default ContentTable;
