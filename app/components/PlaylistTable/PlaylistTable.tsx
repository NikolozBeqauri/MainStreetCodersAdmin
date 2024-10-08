"use client";
import { Table, message } from "antd";
import styles from "./PlaylistTable.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type Props = {
  albumId?: any;
  img?: string;
};

const PlaylistTable = (props: Props) => {
  const [data, setData] = useState([]);
  const [musicIdForDelete, setMusicIdForDelete] = useState<string | undefined>(undefined);
  console.log(musicIdForDelete);


  const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({
    current: 1,
    pageSize: 3,
  });

  const token = Cookies.get("token");

  const fetchMusics = () => {
    axios
      .get(`https://project-spotify-1.onrender.com/albums/${props.albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.musics);
        setData(res.data.musics);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .delete(`https://project-spotify-1.onrender.com/musics/${musicIdForDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Music deleted:", res);
        message.success("Music deleted successfully");
        fetchMusics();
      })
      .catch((err) => {
        console.log(err);
      });
  },[musicIdForDelete])




  useEffect(() => {
    fetchMusics();
  }, [props.albumId]);

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
    key: "actions",
    width: "3%",
    render: (text: any, item: any) => (
      <div className={styles.center}>
        <Image
          src={"/icons/trash.svg"}
          width={24}
          height={24}
          alt="trash"
          onClick={() => setMusicIdForDelete(item.id)}
          style={{ cursor: "pointer" }}
        />
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
