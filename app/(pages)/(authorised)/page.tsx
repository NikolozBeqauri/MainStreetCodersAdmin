'use client'
import { UserManagement } from "@/app/components/UserManagement/UserManagement";
import UserManagmentTable from "@/app/components/UserManagmentTable/UserManagmentTable";
import { userCounterState } from "@/app/states";
import { useRecoilState } from "recoil";

export default function Home() {
  const [userCounter] = useRecoilState(userCounterState);

  return (
    <main>
      <UserManagement content={"User Management"} count={userCounter} />
      <section>
        <UserManagmentTable/>
      </section>
    </main>
  );
}