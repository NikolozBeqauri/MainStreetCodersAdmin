import Styles from "./UserPlaylist.module.scss";

type Props = {
    image: string;
    count?: number;
}

const UserPlaylist = (props: Props) => {
    return(
        <div className={Styles.container}>
            <img src={`/icons/${props.image}.svg`} alt="Playlist icon" width={234} height={251} />
            <p className={Styles.paragraph}>{`Playlist name ${props.count}`}</p>
        </div>
    )
}
export default UserPlaylist;