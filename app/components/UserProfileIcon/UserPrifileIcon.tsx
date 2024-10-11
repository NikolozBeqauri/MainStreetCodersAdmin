'use client'
import Image from 'next/image';
import style from './UserProfileIcon.module.scss';
import { PersonalInfoPopUp } from '../PersonalInfoPopUp/PersonalInfoPopUp';
import { useState } from 'react';


export const UserProfileIcon = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <Image
                className={style.userImage}
                src={`/icons/profileIcon.svg`}
                alt="user image"
                width={36}
                height={36}
                onClick={() => setIsActive(true)}
            />
            {isActive && (
                <PersonalInfoPopUp isActive={isActive} setIsActive={setIsActive} />
            )}
        </div>
    );
};
