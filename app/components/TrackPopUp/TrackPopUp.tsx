import { useState } from "react";
import { useForm } from "react-hook-form";
import ReusableButton from "../ReusableButton/ReusableButton";
import styles from "./TrackPopUp.module.scss";
import axios from "axios";

type FormValues = {
    trackName: string;
    musicFile: FileList;
};

const TrackPopUp = () => {
    const [modalState, setModalState] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

    const toggleChange = () => {
        setModalState(!modalState);
    };

    const onSubmit = (data: FormValues) => {
        const formData = new FormData();
        console.log(data);
        
        formData.append("trackName", data.trackName);
        if (data.musicFile.length > 0) {
            formData.append("musicFile", data.musicFile[0]);
            formData.append("musicFile", data.musicFile[0])
        }

        axios.post("https://project-spotify-1.onrender.com/musics/addMusic", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log(res);
            reset();
        })
        .catch((err) => {
            console.log(err);
        })

    };


    return (
        <>
            <button onClick={toggleChange} className={styles.clickBtn}>
                Click here
            </button>

            {modalState && (
                <div className={styles.main}>
                    <div className={styles.overlay} onClick={toggleChange}></div>
                    <div className={styles.miniContainer}>
                        <h3 className={styles.title}>Add New Track</h3>
                        <form className={styles.addingBox} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.addingMiniBox}>
                                <label htmlFor="trackName">Track name</label>
                                <input
                                    type="text"
                                    id="trackName"
                                    {...register("trackName", { required: "Track name is required" })}
                                />
                            </div>
                            {errors.trackName && <span className={styles.error}>{errors.trackName.message}</span>}
                            <div className={styles.addingMiniBox}>
                                <label htmlFor="upload">Add music file</label>
                                <input
                                    type="file"
                                    id="upload"
                                    accept="audio/*"
                                    {...register("musicFile", {
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
                            {errors.musicFile && <span className={styles.error}>{errors.musicFile.message}</span>}
                            <ReusableButton title="Save" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TrackPopUp;
