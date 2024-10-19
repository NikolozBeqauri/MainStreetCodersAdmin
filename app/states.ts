import { atom } from "recoil";

export const activeSidebarState = atom({
    key: "activeSidebar",
    default: false,
});

type currentAlbumType = {
    title: string;
    releaseDate: string;
    musics: any;
    id: number;
}

export const currentAlbumState = atom<currentAlbumType>({
    key: 'currentAlbumState', 
    default: undefined,
});

export const artistDataState = atom({
    key: 'artistDataState', 
    default: [],
  });

export const userCounterState = atom<number>({
  key: 'userCounterState',
    default: 0,
});
