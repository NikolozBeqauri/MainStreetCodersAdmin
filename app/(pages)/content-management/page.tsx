'use client'
import ContentTable from "@/app/components/ContentTable/ContentTable"
import { TableNavigation } from "@/app/components/TableNavigation/TableNavigation"
import { UserManagement } from "@/app/components/UserManagement/UserManagement"

const contentManagement = () => {
    return (
        <div>
            <div>
            <UserManagement content={"User Management"} count={175} />
            <TableNavigation />
            <section>
                <ContentTable />
            </section>
        </div>
        </div>
    )
}

export default contentManagement