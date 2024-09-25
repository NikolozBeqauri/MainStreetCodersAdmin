"use client"
import { ForgetPassword } from "./components/ForgetPassword/ForgetPassword";
import ReusableButton from "./components/ReusableButton/ReusableButton";


export default function Home() {
  return (
    <main>
      <ReusableButton title={"Button"} mode={"outline"}/>
      <ForgetPassword/>
    </main>
  );
}