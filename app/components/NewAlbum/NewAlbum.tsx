import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import styles from './NewAlbum.module.scss';
import ReusableButton from "../ReusableButton/ReusableButton";
import axios from "axios";
import Cookies from 'js-cookie';

type FormValues = {
    title: string;
    releaseDate: string;
    file: FileList;
};

type Props = {
    artistId: number; 
    setselectedArtistsInfo: Function;
    refreshAlbums: () => void;
    closePopup: () => void;  
}

export const NewAlbum = (props: Props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const token = Cookies.get("token");

    const onSubmit = (data: FormValues) => {
        const newData = new FormData();
        newData.append("title", data.title);
        newData.append("releaseDate", data.releaseDate);
        newData.append("file", data.file[0]);

        axios.post(`https://project-spotify-1.onrender.com/albums/${props.artistId}`, newData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log(res);
            props.refreshAlbums();
            setIsPopupOpen(false);
            props.closePopup();  
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            reset();
        });
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        props.closePopup(); 
    };

    if (!isPopupOpen) return null;

    return (
        <div className={styles.background} onClick={closePopup}>
            <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                <h2>Add New Album</h2>
                <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.dragAndDrop}>
                            <h3>Album Cover Photo</h3>
                            <label htmlFor="forFile">
                                <Image
                                    src={"/icons/dragAndDrop.svg"}
                                    alt="icon"
                                    width={88}
                                    height={79}
                                />
                            </label>
                            <input
                                id="forFile"
                                type="file"
                                accept="image/jpeg, image/png, image/gif" 
                                {...register("file", {
                                    required: "File is required",
                                    validate: {
                                        isImage: (files) => {
                                            const file = files[0];
                                            if (!file) return "File is required";
                                            const fileType = file.type;
                                            return (
                                                fileType === "image/jpeg" ||
                                                fileType === "image/png" ||
                                                fileType === "image/gif" ||
                                                "Only image files are allowed"
                                            );
                                        },
                                    },
                                })}
                            />
                            {errors.file && <p className={styles.errorMessage}>{errors.file.message}</p>}
                        </div>

                        <div className={styles.inputs}>
                            <div>
                                <label>Add New Album</label>
                                <input
                                    type="text"
                                    {...register("title", { required: "album name is required" })}
                                />
                                {errors.title && <p className={styles.errorMessage}>{errors.title.message}</p>}
                            </div>

                            <div>
                                <label>Album release date</label>
                                <input
                                    type="date"
                                    {...register("releaseDate", {
                                        required: "Album release date is required",
                                        validate: value => {
                                            const selectedDate = new Date(value);
                                            const today = new Date();
                                            if (selectedDate > today) {
                                                return "The date cannot be in the future.";
                                            }
                                        },
                                    })}
                                />
                                {errors.releaseDate && <p className={styles.errorMessage}>{errors.releaseDate.message}</p>}
                            </div>
                        </div>
                    </div>

                    <ReusableButton title={"Save"} />
                </form>
            </div>
        </div>
    );
};
