"use client"
import { TableNavigation } from "@/app/components/TableNavigation/TableNavigation"
import { UserManagement } from "@/app/components/UserManagement/UserManagement"
import UserManagmentTable from "@/app/components/UserManagmentTable/UserManagmentTable"


const userManagement = () => {

    return (
        <div>
            <UserManagement content={"User Management"} count={175} />
            <TableNavigation />
            <section>
                <UserManagmentTable />
            </section>
        </div>
    )
}

export default userManagement