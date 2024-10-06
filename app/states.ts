import { atom } from "recoil";

export const activeSidebarState = atom({
    key: "activeSidebar",
    default: false,
});

type currentAlbumType = {
    title: string;
    releaseDate: string;
    musics: any;
}

export const currentAlbumState = atom<currentAlbumType>({
    key: 'currentAlbumState', 
    default: undefined,
});
