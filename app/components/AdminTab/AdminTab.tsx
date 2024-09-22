
import { useState } from "react";
import Styles from "./AdminTab.module.scss";

export const AdminTab = () => {
    const [activeTab, setActiveTab] = useState<string>('all');

    const handleClick = (tab: string) => {
        setActiveTab(tab);
    };

    const state = activeTab === 'all' ? Styles.active : Styles.disabled

    return (
        <div className={Styles.container}>
            <p
                onClick={() => handleClick('all')}
                className={`${activeTab === 'all' ? Styles.active : Styles.disabled}`}
            >
                All Users
            </p>
            <p
                onClick={() => handleClick('blocked')}
                className={`${activeTab === 'blocked' ? Styles.active : Styles.disabled}`}
            >
                Blocked Users
            </p>
        </div>
    );
};