import { AddLine } from "./AddLIne/AddLine"
import styles from "./AddPlaylist.module.scss";



export const AddPlaylist = () => {


    return(
        <div className={`${styles.container} ${styles.background}`} >
            <AddLine title="Add to playlists" image={"public/icons/addPlaylistComponentIcons/addPlaylistIcon.svg"} />
            <AddLine title="View Album" image={"public/icons/addPlaylistComponentIcons/viewAlbumIcon.svg"} />
            <AddLine title="viewArtist" image={"public/icons/addPlaylistComponentIcons/viewArtistIcon.svg"} />
        </div>
    )
}