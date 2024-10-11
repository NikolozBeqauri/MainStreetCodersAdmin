import { useState } from "react";
import { useForm } from "react-hook-form";
import ReusableButton from "../ReusableButton/ReusableButton";
import styles from "./TrackPopUp.module.scss";
import axios from "axios";
import { useRecoilState } from "recoil";
import { artistDataState, currentAlbumState } from "@/app/states";
import Cookies from 'js-cookie';

type FormValues = {
    trackTitle: string;
    file: FileList;
    albumId: any;
};

const TrackPopUp = ({ onClose, albumId }: { onClose: () => void; albumId: any }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [currentAlbum,] = useRecoilState(currentAlbumState);
    const [, setData] = useRecoilState(artistDataState);
    const token = Cookies.get("token");

    const onSubmit = (data: FormValues) => {
        const formData = new FormData();
        if (data.file.length > 0) {
            formData.append("trackTitle", data.trackTitle);
            formData.append("file", data.file[0]);
        }

        axios.post(`https://project-spotify-1.onrender.com/musics/${currentAlbum.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res);
                axios
                    .get(`https://project-spotify-1.onrender.com/albums/${albumId}`, {
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
                reset();
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styles.main}>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.miniContainer}>
                <h3 className={styles.title}>Add New Track</h3>
                <form className={styles.addingBox} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.addingMiniBox}>
                        <label htmlFor="trackTitle">Track name</label>
                        <input
                            type="text"
                            id="trackTitle"
                            {...register("trackTitle", { required: "Track name is required" })}
                        />
                    </div>
                    {errors.trackTitle && <span className={styles.error}>{errors.trackTitle.message}</span>}

                    <div className={styles.addingMiniBox}>
                        <label htmlFor="upload">Add music file</label>
                        <input
                            type="file"
                            id="upload"
                            accept="audio/*"
                            {...register("file", {
                                required: "Music file is required",
                                validate: {
                                    checkFileType: (value) => {
                                        if (value.length === 0) return "Music file is required";
                                        const file = value[0];
                                        const fileType = file.type;
                                        return fileType.startsWith("audio/")
                                            ? true
                                            : "Only audio files are allowed";
                                    }
                                }
                            })}
                        />
                        <label htmlFor="upload" id="uploadLabel">
                            <img src="/images/uploaderIcon.svg" alt="Upload icon" />
                        </label>
                    </div>
                    {errors.file && <span className={styles.error}>{errors.file.message}</span>}
                    <ReusableButton title="Save" />
                </form>
            </div>
        </div>
    );
};

export default TrackPopUp;
