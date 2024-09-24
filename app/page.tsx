"use client"
import { ArtistInfoPopUp } from "./components/ArtistInfoPopUp/ArtistInfoPopUp";
import ReusableButton from "./components/ReusableButton/ReusableButton";
import { UserInfoPopUp } from "./components/UserInfoPopUp/UserInfoPopUp";


export default function Home() {
  return (
    <main>
      <ReusableButton title={"Button"} mode={"outline"}/>
      <UserInfoPopUp/>
    </main>
  );
}