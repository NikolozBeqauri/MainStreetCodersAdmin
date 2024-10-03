// 'use client'
// import { useForm } from "react-hook-form";
// import Image from "next/image";
// import styles from './NewAlbum.module.scss';
// import ReusableButton from "../ReusableButton/ReusableButton";
// import { useState } from "react";
// import axios from "axios";
// import Cookies from 'js-cookie';

// type FormValues = {
//     artistName: string;
//     albumReleaseDate: string;
//     file: FileList;
// };

// export const NewAlbum = () => {
//     const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
//     const [isPopupOpen, setIsPopupOpen] = useState(true);

//     const onSubmit = (data: FormValues) => {
//         console.log(data)
//         const token = Cookies.get("token");

//         const formData = new FormData();
//         formData.append(`title`, data.artistName)
//         formData.append("releaseDate", data.albumReleaseDate)
//         formData.append("file", data.file[0])

//         axios.post("https://project-spotify-1.onrender.com/albums", data, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//                 "Authorization": `Bearer ${token}`
//             },})
//             .then(response => {
//                 console.log(response.data);
//                 reset();
//             })
//             .catch(request => {
//                 console.log(request)
//             })
//         reset();
//     };

//     const closePopup = () => {
//         setIsPopupOpen(false);
//     };

//     if (!isPopupOpen) return null;

//     return (
//         <div className={styles.background} onClick={closePopup}>
//             <div className={styles.wrapper} onClick={e => e.stopPropagation()}>
//                 <h2>Add New Artist</h2>
//                 <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
//                     <div className={styles.inputsWrapper}>
//                     <div className={styles.dragAndDrop}>
//                         <h3>Album  Cover  Photo</h3>
//                             <label htmlFor="forFile">
//                                 <Image
//                                     src={"/icons/dragAndDrop.svg"}
//                                     alt="icon"
//                                     width={88}
//                                     height={79}
//                                 />
//                             </label>
//                             <input
//                                 id="forFile"
//                                 type="file"
//                                 {...register("file", { required: "File is required" })}
//                             />
//                             {errors.file && <p className={styles.errorMessage}>{errors.file.message}</p>}
//                         </div>

//                         <div className={styles.inputs}>
//                             <div>
//                             <label>Add New Album</label>
//                             <input
//                                 type="text"
//                                 {...register("artistName", { required: "Artist name is required" })}
//                             />
//                             {errors.artistName && <p className={styles.errorMessage}>{errors.artistName.message}</p>}

//                             </div>

//                             <div>
//                             <label>Album release date</label>
//                             <input
//                                 type="date"
//                                 {...register("albumReleaseDate", {
//                                     required: "Album release date is required",
//                                     validate: value => {
//                                         const selectedDate = new Date(value);
//                                         const today = new Date();
//                                         if (selectedDate > today) {
//                                             return "The date cannot be in the future.";
//                                         }
//                                     }
//                                 })}
                                
//                             />
//                             {errors.albumReleaseDate && <p className={styles.errorMessage}>{errors.albumReleaseDate.message}</p>}
//                             </div>
//                         </div>
//                     </div>

//                     <ReusableButton title={"Save"} />
//                 </form>
//             </div>
//         </div>
//     );
// };

'use client';

import { useForm } from "react-hook-form";
import Image from "next/image";
import styles from './NewAlbum.module.scss';
import ReusableButton from "../ReusableButton/ReusableButton";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

type FormValues = {
    artistName: string;
    albumReleaseDate: string;
    file: FileList; // This will hold the uploaded file(s)
};

export const NewAlbum = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [isPopupOpen, setIsPopupOpen] = useState(true);

    const onSubmit = async (data: FormValues) => {
        const token = Cookies.get("token");

        
        const formData = new FormData();
        formData.append('title', data.artistName);
        formData.append('releaseDate', data.albumReleaseDate);

        
        if (data.file.length > 0) {
            formData.append('file', data.file[0]); 
        } else {
            console.error("No file selected");
            return;
        }

        try {
            // Send the request
            const response = await axios.post("https://project-spotify-1.onrender.com/albums/3", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(r => {
                console.log(r);
                reset();
            })
            .catch(req => {
                console.log(req);
                reset();
            });

            // console.log(response.data);
            reset()
        } catch (error: any) {
            console.error("Error uploading data:", error.response?.data || error.message);
        }
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
                                accept="image/*"
                                {...register("file", { required: "File is required" })}
                            />
                            {errors.file && <p className={styles.errorMessage}>{errors.file.message}</p>}
                        </div>

                        <div className={styles.inputs}>
                            <div>
                                <label>Add New Album</label>
                                <input
                                    type="text"
                                    {...register("artistName", { required: "Artist name is required" })}
                                />
                                {errors.artistName && <p className={styles.errorMessage}>{errors.artistName.message}</p>}
                            </div>

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
                                {errors.albumReleaseDate && <p className={styles.errorMessage}>{errors.albumReleaseDate.message}</p>}
                            </div>
                        </div>
                    </div>

                    <ReusableButton title={"Save"} />
                </form>
            </div>
        </div>
    );
};
