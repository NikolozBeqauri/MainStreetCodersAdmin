import React, { useEffect, useMemo, useState } from "react";
import { Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import styles from "./UserManagmentTable.module.scss";
import { UserInfoPopUp } from "../UserInfoPopUp/UserInfoPopUp";
import { NewPassword } from "../NewPassword/NewPassword";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";

type User = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  active: boolean;
};

const UserManagmentTable: React.FC = () => {
  const [activePasswordId, setActivePasswordId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [editUserPassword, setEditUserPassword] = useState<number | null>(null);
  const [blockUnblockUser, setBlockUnblockUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [allBlockedUsers, setAllBlockedUsers] = useState<User[]>([]);
  const token = Cookies.get("token");
  const [userStatus, setUserStatus] = useState<any>(false);
  const [userInfo, setUserInfo] = useState<any>([])
let totalUsers: any[] = []

const toggleStatus = () => {
  // setUserStatus((prevStatus: any) => !prevStatus);
  // setUserInfo({blockUnblockUser: userStatus});
}

useEffect(() => {
  axios.get(`https://project-spotify-1.onrender.com/users/${blockUnblockUser}`, {headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${token}`
  },})
  .then(r => {
    // setUserInfo(() => {r.data.id, r.data.isBlocked})
    totalUsers.push(r.data.id, r.data.isBlocked)
    
    
    
  })
}, [toggleStatus])
// console.log(totalUsers)

// console.log(userInfo)
console.log(totalUsers)

  useEffect(() => {if(totalUsers.length > 0 && totalUsers[1] == false){
    const formData = new FormData();
    formData.append("id", blockUnblockUser)
    axios.patch(`https://project-spotify-1.onrender.com/users/block/${blockUnblockUser}`, formData, {
      headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
      },
  })
  .then((r) => {
    console.log(r)
  })
  .catch(res => {
    console.log(res)
  })
  }else if(totalUsers.length > 0 && totalUsers[1]){
    const formData = new FormData();
    formData.append("id", blockUnblockUser)
    axios.patch(`https://project-spotify-1.onrender.com/users/unblock/${blockUnblockUser}`, formData, {
      headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
      },
  })
  .then((r) => {
    console.log(r)
  })
  .catch(res => {
    console.log(res)
  })
  }}, [toggleStatus]);
  console.log(totalUsers)
  // console.log(userStatus)
  
  // if(userStatus){
  //   axios.post("https://project-spotify-1.onrender.com/authors", "s", {
  //     headers: {
  //         "Content-Type": "multipart/form-data",
  //         "Authorization": `Bearer ${token}`
  //     },
  // })
  // .then((r) => {
  //   console.log(r)
  // })
  // }


  useEffect(() => {
    axios
      .get("https://project-spotify-1.onrender.com/users/blocked", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const blockedUsers = res.data.map((user: any) => ({
          id: user.id,
          email: user.email,
          password: user.password,
          createdAt: dayjs(user.createAt).format("MMMM D, YYYY, h:mm A"),
          active: user.isBlocked ? false : true, 
        }));
        setAllBlockedUsers(blockedUsers);
      })
      .catch((err) => {
        console.log("Error fetching blocked users:", err);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("https://project-spotify-1.onrender.com/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const fetchedUsers = res.data.map((user: any) => ({
          id: user.id,
          email: user.email,
          password: user.password,
          createdAt: dayjs(user.createAt).format("MMMM D, YYYY, h:mm A"),
          active: user.isBlocked ? false : true, 
        }));
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        console.log("Error fetching users:", err);
      });
  }, [token]);

  const handleDeleteUser = (id: number) => {
    axios.delete(`https://project-spotify-1.onrender.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
  };

  const memoizedUsers = useMemo(() => {
    return users
      .filter((user) => user.active) 
      .filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((user) => ({ ...user, key: user.id }));
  }, [users, searchQuery]);

  const memoizedBlockedUsers = useMemo(() => {
    return allBlockedUsers
      ?.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((user) => ({ ...user, key: user.id })) || [];
  }, [allBlockedUsers, searchQuery]);

  const handlePasswordToggle = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePasswordId(activePasswordId === id ? null : id);
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const columns: ColumnsType<User> = [
    {
      title: "Registration Date",
      key: "createdAt",
      render: (_, record) => (
        <div className={styles.artistCell}>{record.createdAt}</div>
      ),
      width: "20%",
    },
    {
      title: "Email",
      key: "email",
      width: "30%",
      render: (_, record) => <div>{record.email}</div>,
    },
    {
      title: "Password",
      key: "password",
      width: "15%",
      render: (_, record) => (
        <div className={styles.Password}>
          <input
            type={activePasswordId === record.id ? "text" : "password"}
            value={record.password}
            readOnly
            className={styles.inputPassword}
          />
          <div onClick={(e) => handlePasswordToggle(record.id, e)}>
            <Image
              src={`/icons/passwordAppeare.svg`}
              width={24}
              height={24}
              alt="toggle password visibility"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_, record) => (
        <div className={styles.actions}>
          <button
            className={styles.unBorder}
            onClick={(e) => {
              e.stopPropagation();
              setEditUserPassword(record.id);
            }}
          >
            <Image
              className={styles.curImg}
              src={`/icons/whiteEdit.svg`}
              width={24}
              height={24}
              alt="edit"
            />
          </button>
          <button
            className={styles.unBorder}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteUser(record.id);
            }}
          >
            <Image
              className={styles.curImg}
              src={`/icons/whiteTrash.svg`}
              width={24}
              height={24}
              alt="delete"
            />
          </button>
          <button
            className={styles.unBorder}
            onClick={(e) => {
              e.stopPropagation();
              setBlockUnblockUser(record.id);
              toggleStatus();
            }}
          >
            <Image
              className={styles.curImg}
              src={record.active ? "/icons/block.svg" : "/icons/unBlock.svg"} 
              // src={!userStatus ? "/icons/block.svg" : "/icons/unBlock.svg"} 
              width={24}
              height={24}
              alt={record.active ? "block" : "unblock"}
            />
          </button>
        </div>
      ),
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: (
        <span style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>
          All Users
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          <input
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "500px",
              marginBottom: "20px",
              height: "55px",
              borderRadius: "8px",
              border: "1px solid gray",
              outline: "none",
              backgroundColor: "unset",
              padding: "0 18px",
              fontSize: "17px",
              color: "#fff",
              position: "absolute",
              top: "-193px",
            }}
          />
          <Table
            className={styles.wrapper}
            columns={columns}
            dataSource={memoizedUsers}
            pagination={{
              pageSize: 9,
              position: ["bottomCenter"],
            }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>
          Blocked Users
        </span>
      ),
      children: (
        <div className={styles.tabContent}>
          <input
            placeholder="Search by email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "500px",
              height: "55px",
              borderRadius: "8px",
              border: "1px solid gray",
              outline: "none",
              backgroundColor: "unset",
              padding: "0 18px",
              fontSize: "17px",
              color: "#fff",
              position: "absolute",
              top: "-193px",
            }}
          />
          <Table
            className={styles.wrapper}
            columns={columns}
            dataSource={memoizedBlockedUsers}
            pagination={{
              pageSize: 9,
              position: ["bottomCenter"],
            }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" items={tabItems} />
      {isPopupVisible && selectedUser && (
        <UserInfoPopUp user={selectedUser} onClose={closePopup} />
      )}
      {editUserPassword && (
        <NewPassword
          userId={editUserPassword}
          onClose={() => setEditUserPassword(null)}
        />
      )}
      {blockUnblockUser && (
        <div>
          <p>
            {blockUnblockUser
              ? `Blocking User: ${blockUnblockUser}`
              : `Unblocking User: ${blockUnblockUser}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagmentTable;
