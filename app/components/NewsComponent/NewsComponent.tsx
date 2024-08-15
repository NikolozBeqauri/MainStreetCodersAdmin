import ReusableButton from "../ReusableButton/ReusableButton";
import styles from "./NewsComponent.module.scss";


type Props = {
    title: string,
    count: string;
}

export const NewsComponent = (props: Props) => {
    return( 
        <div className={styles.container}>
            <div className={styles.componentHeader}>
                <h1 className={styles.h1Style}>{props.title}</h1>
                <p className={styles.playCount}>{props.count} Plays</p>
                <div className={styles.buttonElement}>
                    <ReusableButton title={"Listen Now"} icon={"playIcon"}/>
                </div>
            </div>
            
        </div>
    )
}