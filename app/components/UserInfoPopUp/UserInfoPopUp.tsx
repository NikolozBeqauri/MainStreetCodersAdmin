import React, { useEffect, useState } from 'react';
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from './UserInfoPopUp.module.scss';
import Image from 'next/image';
import axios from 'axios';
import Cookies from "js-cookie";
import { SquareCard } from '../SquareCard/SquareCard';
import { ReusableTable } from '../ReusableTable/Reusable';

type User = {
    id: number;
    email: string;
    password: string;
    createdAt: string;
    active: boolean;
};

type Props = {
    user: User | null;
    onClose: () => void;
};

export const UserInfoPopUp = (props: Props) => {
    const token = Cookies.get("token");
    const [userPlaylists, setUserPlaylists] = useState([]);

    const fetchUserPlaylists = (userId: number) => {
        axios.get(`https://project-spotify-83tj.onrender.com/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            setUserPlaylists(res.data.playlists);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        if (props.user) {
            fetchUserPlaylists(props.user.id);
        }
    }, [props.user]); 

    if (!props.user) {
        return null;
    }

    
      
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
                    <div className={styles.artistCards}>
                            {userPlaylists?.map((album: any) => (
                                <SquareCard
                                    key={album.id}
                                    albumId={album.id}
                                    title={album.name || 'No Title Available'}
                                    img={album.image || '/icons/whiteTrash.svg'}
                                    userPlaylist
                                    fetchPlaylists={() => fetchUserPlaylists(props.user!.id)} 
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};
