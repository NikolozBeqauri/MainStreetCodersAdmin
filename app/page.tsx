"use client"
import { ArtistInfoPopUp } from "./components/ArtistInfoPopUp/ArtistInfoPopUp";
import ReusableButton from "./components/ReusableButton/ReusableButton";


export default function Home() {
  return (
    <main>
      <ReusableButton title={"Button"} mode={"outline"}/>

      <ArtistInfoPopUp/>
    </main>
  );
}