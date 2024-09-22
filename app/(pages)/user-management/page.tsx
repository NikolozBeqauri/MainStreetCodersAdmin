"use client"

import { AdminTab } from "@/app/components/AdminTab/AdminTab"
import { TableNavigation } from "@/app/components/TableNavigation/TableNavigation"
import { UserManagement } from "@/app/components/UserManagement/UserManagement"


const userManagement = () => {

    return(
        <div>
            <UserManagement content={"User Management"} count={175} />
            <TableNavigation />
        </div>
    )
}

export default userManagement