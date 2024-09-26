'use client'
import { useForm } from "react-hook-form";
import Image from "next/image";
import styles from './NewArtistPopUp.module.scss';
import ReusableButton from "../ReusableButton/ReusableButton";
import { useState } from "react";

type FormValues = {
    artistName: string;
    albumReleaseDate: string;
    file: FileList;
};

export const NewArtistPopUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [isPopupOpen, setIsPopupOpen] = useState(true);

    const onSubmit = (data: FormValues) => {
        console.log(data);

        reset();
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    if (!isPopupOpen) return null;

    return (
        <div className={styles.background} onClick={closePopup}>
            <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                <h2>Add New Artist</h2>
                <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.inputs}>
                            <div>
                            <label>Artist name</label>
                            <input
                                type="text"
                                {...register("artistName", { required: "Artist name is required" })}
                            />
                            </div>
                            {errors.artistName && <p className={styles.errorMessage}>{errors.artistName.message}</p>}

                            <div>
                            <label>Album release date</label>
                            <input
                                type="date"
                                {...register("albumReleaseDate", {
                                    required: "Album release date is required",
                                    validate: value => {
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        if (selectedDate > today) {
                                            return "The date cannot be in the future.";
                                        }
                                    }
                                })}
                            />
                            </div>
                            {errors.albumReleaseDate && <p className={styles.errorMessage}>{errors.albumReleaseDate.message}</p>}
                        </div>

                        <div className={styles.dragAndDrop}>
                            <label htmlFor="forFile">
                                <Image
                                    src={`/icons/dragAndDrop.svg`}
                                    alt="icon"
                                    width={88}
                                    height={79}
                                />
                            </label>
                            <input
                                id="forFile"
                                type="file"
                                {...register("file", { required: "File is required" })}
                            />
                            {errors.file && <p className={styles.errorMessage}>{errors.file.message}</p>}
                        </div>
                    </div>

                    <ReusableButton title={"Save"} />
                </form>
            </div>
        </div>
    );
};
