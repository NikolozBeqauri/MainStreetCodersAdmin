'use client'
import ContentTable from "@/app/components/ContentTable/ContentTable"
import { UserManagement } from "@/app/components/UserManagement/UserManagement"
import axios from "axios";
import Cookies from 'js-cookie';
import { useState } from "react";

const ContentManagement = () => {
    const [counter, setCounter] = useState<number>(0)
    const token = Cookies.get("token");

    axios.get("https://project-spotify-1.onrender.com/author", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCounter(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    return (
        <div>
            <div>
                <UserManagement content={"User Management"} artistCounter={counter} count={undefined} />
                <section>
                    <ContentTable />
                </section>
            </div>
        </div>
    )
}

export default ContentManagement;