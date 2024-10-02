'use client'
import { UserManagement } from "./components/UserManagement/UserManagement";
import UserManagmentTable from "./components/UserManagmentTable/UserManagmentTable";

export default function Home() {

  
   return (
    <main>
      <UserManagement content={"User Management"} count={175} />
      <section>
        <UserManagmentTable/>
      </section>
    </main>
  );
}