"use client";
import { Table } from "antd";
import styles from "./PlaylistTable.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

const PlaylistTable = () => {
  const [data, setData] = useState<any>([]);
  const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({
    current: 1,
    pageSize: 3,
  });

  useEffect(() => {
    const staticData = [
      {
        id: 1,
        name: "gellaaaa",
        artistName: "a",
        duration: 180,
        albumCover: "/images/anyma.png",
      },
      {
        id: 12,
        name: "gellaaaa",
        artistName: "s",
        duration: 180,
        albumCover: "/images/anyma.png",
      },
      {
        id: 2,
        name: "gellaaaa",
        artistName: "d",
        duration: 240,
        albumCover: "/images/anyma.png",
      },
      {
        id: 3,
        name: "gellaaaa",
        artistName: "f",
        duration: 210,
        albumCover: "/images/anyma.png",
      },
      {
        id: 4,
        name: "gellaaaa",
        artistName: "g",
        duration: 210,
        albumCover: "/images/anyma.png",
      },
      {
        id: 5,
        name: "gellaaaa",
        artistName: "h",
        duration: 210,
        albumCover: "/images/anyma.png",
      },
      {
        id: 6,
        name: "gellaaaa",
        artistName: "j",
        duration: 210,
        albumCover: "/images/anyma.png",
      },
    ];
    setData(staticData);
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "1%",
      render: (text: any, item: any, index: number) => {
        const page = pagination.current - 1; 
        const pageSize = pagination.pageSize; 
        const rowNumber = page * pageSize + index + 1; 
        return <div className={styles.cellId}>{rowNumber}</div>;
      },
    },
    {
      title: "Song Name",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (text: any, item: any) => (
        <div className={styles.cellSongname}>
          <img
            className={styles.image}
            src={item.albumCover}
            width={48}
            height={48}
            alt={text}
          />
          <div className={styles.fontGap}>
            <div className={styles.songTitle}>{item.name}</div>
            <div className={styles.songArtist}>{item.artistName}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Time",
      key: "time",
      width: "15%",
      render: (text: any, item: any) => (
        <div className={styles.cellTimeName}>
          {formatDuration(item.duration)}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "like",
      width: "3%",
      render: () => (
        <div className={styles.center}>
          <Image src={"/icons/trash.svg"} width={24} height={24} alt="trash" />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Table
        className={styles.container}
        dataSource={data}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize });
          },
          position: ["bottomCenter"],
        }}
        rowClassName={styles.row111111}
      />
    </div>
  );
};

export default PlaylistTable;
