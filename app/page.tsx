  "use client"

import { HeartIcon } from "./components/HeartIcon/HeartIcon";
import ReusableButton from "./components/ReusableButton/ReusableButton";
import { SideBar } from "./components/SideBar/SideBar";
import TrackPopUp from "./components/TrackPopUp/TrackPopUp";


export default function Home() {
  return (
    <main>
      <ReusableButton title={"Button"} mode={"outline"}/>

      <TrackPopUp />
    </main>
  );
}