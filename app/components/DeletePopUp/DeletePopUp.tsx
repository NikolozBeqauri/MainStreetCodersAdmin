'use client';
import styles from './DeletePopUp.module.scss';

interface Props {
    onClose: () => void;
    onDelete: () => void;
}

export const DeletePopUp = (props: Props) => {

    // Handle delete confirmation
    const handleConfirmDelete = () => {
        props.onDelete();
    };

    // Handle cancel action
    const handleCancel = () => {
        props.onClose();
    };

    return (
        <div className={styles.background} onClick={handleCancel}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <p>Are you sure you want to delete this artist?</p>
                <div className={styles.actions}>
                    <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
                    <button className={styles.delete} onClick={handleConfirmDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};
