import styles from "./AddLine.module.scss"
type Props = {
    image?: string;
    title: string;
}

export const AddLine = (props: Props) => {
    return(
        <div className={styles.container} >
            <img src={props.image} />
            <p className={styles.fontProps}>{props.title}</p>
        </div>
    )
}