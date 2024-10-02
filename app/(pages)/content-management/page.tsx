'use client'
import ContentTable from "@/app/components/ContentTable/ContentTable"
import { UserManagement } from "@/app/components/UserManagement/UserManagement"
    
const contentManagement = () => {
    return (
        <div>
            <div>
                <UserManagement content={"User Management"} count={175} />
                <section>
                    <ContentTable />
                </section>
            </div>
        </div>
    )
}

export default contentManagement