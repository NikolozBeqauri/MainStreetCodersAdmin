import { AdminTab } from "../AdminTab/AdminTab";
import { InfoCard } from "../InfoCard/InfoCard";
import Styles from "./TableNavigation.module.scss";

export const TableNavigation = () => {
    return(
        <div className={Styles.container}>
            <AdminTab />
            <InfoCard totalUsers={175} blockedUsers={45.000} />
        </div>
    )
}