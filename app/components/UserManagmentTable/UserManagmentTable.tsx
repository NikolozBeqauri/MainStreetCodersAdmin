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
import { useRecoilState } from "recoil";
import { userCounterState } from "@/app/states";

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
  const [users, setUsers] = useState<User[]>([]);
  const [allBlockedUsers, setAllBlockedUsers] = useState<User[]>([]);
  const [, setUserCounter] = useRecoilState(userCounterState);
  useEffect(()=>{
    setUserCounter(users.length)
  },[users])
  const token = Cookies.get("token");
  const [, setState] = useState<any>(false);
  useEffect(()=>{

  })
  const toggleStatus = () => {
    setState((prevState: any) => !prevState);
  };

  const fetchUsers = () => {
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
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleBlockUnblock = (id: number) => {
    axios
      .get(`https://project-spotify-1.onrender.com/users/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        const isBlocked = response.data.isBlocked;
        const formData = new FormData();
        formData.append("id", id.toString());

        if (!isBlocked) {
          await axios.patch(`https://project-spotify-1.onrender.com/users/block/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          await axios.patch(`https://project-spotify-1.onrender.com/users/unblock/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
        }

        fetchUsers();
      })
      .catch((err) => {
        console.log("Error during block/unblock:", err);
      });
  };

  const handleDeleteUser = (id: number) => {
    axios
      .delete(`https://project-spotify-1.onrender.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setAllBlockedUsers((prevBlockedUsers) =>
          prevBlockedUsers.filter((user) => user.id !== id)
        );
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
  };

  const memoizedUsers = useMemo(() => {
    return users
      .filter((user) => user.active)
      .filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((user) => ({ ...user, key: user.id }));
  }, [users, searchQuery]);

  const memoizedBlockedUsers = useMemo(() => {
    return allBlockedUsers
      ?.filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
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
        <div className={record.active ? styles.artistCell : styles.blockedCell}>
          {record.createdAt}
        </div>
      ),
      width: "20%",
    },
    {
      title: "Email",
      key: "email",
      width: "30%",
      render: (_, record) => {
        return (
          <div className={record.active ? '' : styles.blockedCell} onClick={() => handleRowClick(record)}>
            {record.email}
          </div>
        );
      },
    },
    {
      title: "Password",
      key: "password",
      width: "15%",
      render: (_, record) => (
        <div className={record.active ? styles.Password : `${styles.Password} ${styles.blockedCell}`}>
          <input
            type={activePasswordId === record.id ? "text" : "password"}
            value={record.password}
            readOnly
            className={record.active ? styles.inputPassword : styles.blockedPassword}
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
              handleBlockUnblock(record.id);  
            }}
          >
            <Image
              className={styles.curImg}
              src={record.active ? "/icons/block.svg" : "/icons/unBlock.svg"}
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
    </div>
  );
};

export default UserManagmentTable;
