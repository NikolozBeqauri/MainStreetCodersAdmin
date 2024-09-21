import { useState } from "react";
import ReusableButton from "../ReusableButton/ReusableButton";
import styles from "./TrackPopUp.module.scss";

const TrackPopUp = () => {

    const [modalState, setModalState] = useState(false)

    const toggleChange = () => {
        setModalState(!modalState)
    }
        
    return (
        <>

            <button onClick={toggleChange} className={styles.clickBtn}>
                Click here
            </button>

            {modalState && 
            (<div className={styles.main}>
                <div className={styles.overlay} onClick={toggleChange}></div>
                <div className={styles.miniContainer}>
                    <h3 className={styles.title}>Add New Track</h3>
                    <form className={styles.addingBox}>
                        <div className={styles.addingMiniBox}>
                            <label htmlFor="uploadText">Track name</label>
                            <input type="text" id="uploadText" required/>
                        </div>
                        <div className={styles.addingMiniBox}>
                            <label htmlFor="uploadLabel">Add music file</label>
                            <input type="file" id="upload" required/>
                            <label htmlFor="upload" id="uploadLabel">
                                <img src="/images/uploaderIcon.svg" />
                            </label>
                        </div>
                        <ReusableButton title="Save"/>
                    </form>
                </div>
            </div>)}
        </>
    )
}


export default TrackPopUp;