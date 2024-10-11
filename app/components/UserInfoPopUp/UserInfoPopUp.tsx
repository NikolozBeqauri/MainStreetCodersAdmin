import React from 'react';
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from './UserInfoPopUp.module.scss';
import Image from 'next/image';

type User = {
    email: string;
    createdAt: string;
    active: boolean;
};

type Props = {
    user: User | null;
    onClose: () => void;
};

export const UserInfoPopUp = (props: Props) => {
    
    if (!props.user) {
        return null;
    }

    console.log(props.user);
    

    return (
        <>  
        
            <div className={styles.background} onClick={props.onClose}>
                <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <div onClick={props.onClose}>
                            <ReusableIcon imgName={"rightArrow"} />
                        </div>
                        <h2>User</h2>
                        <div onClick={props.onClose}>
                            <ReusableIcon imgName={"deleteCross"} />
                        </div>
                    </div>

                    <div className={styles.userInfo}>
                        <Image
                            src={'/images/userInfoImage.png'}
                            alt='icon'
                            width={152}
                            height={152}
                        />
                        <div className={styles.userInfoContent}>
                            <div>
                                <h3>Email:</h3>
                                <span>{props.user.email}</span>
                            </div>
                            <div>
                                <h3>Registration Date:</h3>
                                <span>{props.user.createdAt}</span>
                            </div>
                            <div>
                                <h3>User:</h3>
                                <span>{props.user.active ? "Active":"Blocked"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
