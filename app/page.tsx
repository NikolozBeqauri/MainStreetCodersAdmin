"use client"
import ReusableButton from "./components/ReusableButton/ReusableButton";
import TrackPopUp from "./components/TrackPopUp/TrackPopUp";


export default function Home() {
  return (
    <main>
      <ReusableButton title={"Button"} mode={"outline"}/>
      <TrackPopUp/>
    </main>
  );
}