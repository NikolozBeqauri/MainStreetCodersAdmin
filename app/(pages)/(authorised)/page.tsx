'use client'
import { UserManagement } from "@/app/components/UserManagement/UserManagement";
import UserManagmentTable from "@/app/components/UserManagmentTable/UserManagmentTable";

export default function Home() {

  return (
    <main>
      <UserManagement content={"User Management"} count={175} />
      <section>
        <UserManagmentTable />
      </section>
    </main>
  );
}