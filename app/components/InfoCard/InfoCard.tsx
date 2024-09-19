import Styles from "./InfoCard.module.scss";


type Props = {
    totalUsers: number;
    blockedUsers: number;
}
export const InfoCard = (props: Props) => {
    return(
        <div className={Styles.container}>
            <div className={Styles.boxWrapper}>
                <p className={Styles.boxWrapperUsers}>Total Users:</p>
                <p className={Styles.boxWrapperCount}>{props.totalUsers}</p>
            </div>
            <div className={Styles.boxWrapper}>
                <p className={Styles.boxWrapperUsers}>Blocked Users:</p>
                <p className={Styles.boxWrapperCount}>{props.blockedUsers}</p>
            </div>
        </div>
    )
}