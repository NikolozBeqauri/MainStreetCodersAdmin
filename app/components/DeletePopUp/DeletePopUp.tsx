'use client';
import { useState } from 'react';
import styles from './DeletePopUp.module.scss';

interface Props {
    onClose: () => void;
    onDelete: () => void;
}

export const DeletePopUp = (props:Props) => {
    const [showPopup, setShowPopup] = useState(true);

    const handleConfirmDelete = () => {
        setShowPopup(false);
        props.onDelete();
    };

    const handleCancel = () => {
        setShowPopup(false);
        props.onClose();
    };

    if (!showPopup) return null;

    return (
        <div className={styles.background} onClick={handleCancel}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <p>Are you sure you want to delete?</p>
                <div>
                    <button className={styles.cancle} onClick={handleCancel}>Cancle</button>
                    <button className={styles.delete} onClick={handleConfirmDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};
