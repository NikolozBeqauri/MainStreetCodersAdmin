'use client'
import { useState } from "react";
import styles from './DeletePopUp.module.scss'

export const DeletePopUp = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [deleteMusic, setDeleteMusic] = useState(false);
    const handleConfirmDelete = () => {
        console.log("Music deleted");
        setShowPopup(false);
        setDeleteMusic(true)
    };

    const handleCancel = () => {
        console.log("Music calcled");
        setShowPopup(false);
    };
    if(!showPopup) return ""

    return (
        <div onClick={() => setShowPopup(false)} className={styles.background}>
            <div className={styles.wrapper}>
                <p>Are you sure you want to delete?</p>
                <div>
                    <button className={styles.cancle} onClick={handleCancel}>Cancel</button>
                    <button className={styles.delete} onClick={handleConfirmDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}