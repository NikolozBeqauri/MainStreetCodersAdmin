'use client'

import { TableNavigation } from "./components/TableNavigation/TableNavigation";
import { UserManagement } from "./components/UserManagement/UserManagement";
import UserManagmentTable from "./components/UserManagmentTable/UserManagmentTable";


export default function Home() {
  return (
    <main>
      <UserManagement content={"User Management"} count={175} />
      <TableNavigation />
      <section>
        <UserManagmentTable/>
      </section>
    </main>
  );
}