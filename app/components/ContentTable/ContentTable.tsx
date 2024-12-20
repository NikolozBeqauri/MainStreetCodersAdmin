'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import styles from './ContentTable.module.scss';
import { DeletePopUp } from '../DeletePopUp/DeletePopUp';
import ReusableButton from '../ReusableButton/ReusableButton';
import { ArtistInfoPopUp } from '../ArtistInfoPopUp/ArtistInfoPopUp';
import { NewArtistPopUp } from '../NewArtistPopUp/NewArtistPopUp';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedArtist, setSelectedArtist] = useState<DataType | null>(null);
    const [showNewArtistPopup, setShowNewArtistPopup] = useState(false);
    const [tableData, setTableData] = useState<DataType[]>([]); 
    

    const token = Cookies.get("token");

    function getAuthors () {
        axios.get("https://project-spotify-83tj.onrender.com/author", {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          })
          .then((res) => {
            const fetchedData = res.data.map((author: any, index: number) => ({
                key: index.toString(),
                totalStreams: author.totalStreams || 0, 
                totalAlbums: author.totalAlbumsOfAuthor || 0, 
                totalSongs: author.totalSongsOfAuthor || 0, 
                image: author.image || '/images/defaultArtist.png', 
                files: [{ url: author.image || '/images/defaultArtist.png' }], 
                fullName: author.fullName || 'Unknown Artist', 
                id: author.id || null,
                albums: author.albums || [],
            }));
    
            setTableData(fetchedData);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    useEffect(() => {
        getAuthors();
    }, [token]);

    const addArtist = (newArtist: DataType) => {
        setTableData((prevData) => [...prevData, newArtist]);
    };

    const filteredData = useMemo(() => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        return tableData.filter((item) =>
            item.fullName?.toLowerCase().includes(lowerSearchQuery)
        );
    }, [searchQuery, tableData]);

    const handleDeleteClick = (id: number, event: React.MouseEvent) => {
        event.stopPropagation();
        setCurrentDeleteId(id); 
        setShowDeletePopup(true); 
    };

    const handleDeleteConfirm = () => {
        if (currentDeleteId) {
            axios
                .delete(`https://project-spotify-83tj.onrender.com/author/${currentDeleteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                })
                .then(() => {
                    setTableData((prevData) => prevData.filter((artist) => artist.id !== currentDeleteId));
                    setShowDeletePopup(false);
                    setCurrentDeleteId(null);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
                    <Image
                        className={styles.image}
                        src={`${record.image}`}
                        width={40}
                        height={40}
                        alt={text}
                    />
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
                        selectedArtist={selectedArtist}
                        getAuthors={getAuthors} 
                    />
                )}
                {showNewArtistPopup && (
                    <NewArtistPopUp
                        onClose={closeNewArtistPopup}
                        addArtist={addArtist} 
                        getAuthors={getAuthors} 
                   />
                )}
            </div>
        </>
    );
};

export default ContentTable;
