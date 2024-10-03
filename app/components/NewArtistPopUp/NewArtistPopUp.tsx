'use client'
import { useForm } from "react-hook-form";
import Image from "next/image";
import styles from './NewArtistPopUp.module.scss';
import ReusableButton from "../ReusableButton/ReusableButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import Cookies from 'js-cookie';

type FormValues = {
    fullName: string;
    biography: string;
    file: FileList;
};

interface NewArtistPopUpProps {
    onClose: () => void;
}

export const NewArtistPopUp: React.FC<NewArtistPopUpProps> = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [isPopupOpen, setIsPopupOpen] = useState(true);

    const onSubmit = (data: FormValues) => {
        const token = Cookies.get("token")
       
        if (!token) {
            console.log('token Error');
            return;
        }
        
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('biography', data.biography);

        if (data.file.length > 0) {
            formData.append('file', data.file[0]);
        }

        axios.post("https://project-spotify-1.onrender.com/authors", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => {
                
                console.log(res);
                reset();
                onClose();
            })
            .catch((err) => {
                console.log(err);
                reset();
            });
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        onClose();
    };

    if (!isPopupOpen) return null;

    return (
        <div className={styles.background} onClick={closePopup}>
            <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div onClick={closePopup}>
                        <ReusableIcon imgName={"rightArrow"} />
                    </div>
                    <h2>Peggy Gou</h2>
                    <div onClick={closePopup}>
                        <ReusableIcon imgName={"deleteCross"} />
                    </div>
                </div>
                <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputsWrapper}>
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

                        <div className={styles.inputs}>
                            <div>
                                <label>Artist name</label>
                                <input
                                    type="text"
                                    {...register("fullName", { required: "Artist name is required" })}
                                />
                            </div>
                            {errors.fullName && <p className={styles.errorMessage}>{errors.fullName.message}</p>}

                            <div>
                                <label>Biography</label>
                                <textarea
                                    {...register("biography", { required: "Biography is required" })}
                                />
                            </div>
                            {errors.biography && <p className={styles.errorMessage}>{errors.biography.message}</p>}
                        </div>
                    </div>

                    <ReusableButton title={"Save"} mode={'outline'} />
                </form>
            </div>
        </div>
    );
};
