"use client";
import { Table, message } from "antd";
import styles from "./PlaylistTable.module.scss";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

type Props = {
  data: any;
  img: string;
};

const PlaylistTable = (props: Props) => {
  const [data, setData] = useState(props.data);
  const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({
    current: 1,
    pageSize: 3,
  });

  console.log(data);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const parseDuration = (durationStr: string) => {
    const parts = durationStr.split(":");
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  };

  const handleDelete = async (musicId: number) => {
    try {
      await axios.get(`https://project-spotify-1.onrender.com/musics/${musicId}`);
      
      message.success("Music deleted successfully!");

      setData(data.filter((item: any) => item.id !== musicId));
    } catch (error) {
      message.error(`Failed to delete music. Please try again. Music Id is ${musicId}`);
    }
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
      dataIndex: "trackTitle",
      key: "trackTitle",
      width: "30%",
      render: (text: any, item: any) => (
        <div className={styles.cellSongname}>
          <img
            className={styles.image}
            src={props.img || "/default-album.png"}
            width={48}
            height={48}
            alt={text}
          />
          <div className={styles.fontGap}>
            <div className={styles.songTitle}>{item.trackTitle}</div>
            <div className={styles.songArtist}>{item.authorName}</div>
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
          {item.duration ? formatDuration(parseDuration(item.duration)) : "0:00"}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "like",
      width: "3%",
      render: (text: any, item: any) => (
        <div className={styles.center} onClick={() => handleDelete(item.id)}>
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
