"use client"
import { NewPassword } from "./components/NewPassword/NewPassword";
import ReusableButton from "./components/ReusableButton/ReusableButton";


export default function Home() {
  return (
    <main>
      <ReusableButton title={"Button"} mode={"outline"}/>
      <NewPassword/>
    </main>
  );
}