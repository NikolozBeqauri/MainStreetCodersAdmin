import React, { useMemo, useState } from "react";
import { Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import styles from "./UserManagmentTable.module.scss";
import { UserInfoPopUp } from "../UserInfoPopUp/UserInfoPopUp";
import { NewPassword } from "../NewPassword/NewPassword";

type User = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  active: boolean;
};

const UserManagmentTable: React.FC = () => {
  const [selectedRowKeysAll, setSelectedRowKeysAll] = useState<React.Key[]>([]);
  const [selectedRowKeysBlocked, setSelectedRowKeysBlocked] = useState<React.Key[]>([]);
  const [activePasswordId, setActivePasswordId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [editUserPassword, setEditUserPassword] = useState<number | null>(null); 
  const [deleteUser, setDeleteUser] = useState<number | null>(null); 
  const [blockUnblockUser, setBlockUnblockUser] = useState<number | null>(null); 

  const users: User[] = [
    {
      id: 1,
      email: "user1@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      active: true,
    },
    {
      id: 5,
      email: "blockeduser@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      active: true,
    },
    {
      id: 26,
      email: "blockeduser@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      active: true,
    },
  ];

  const memoizedUsers = useMemo(() => {
    return users
      .filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((user) => ({ ...user, key: user.id }));
  }, [users, searchQuery]);

  const memoizedBlockedUsers = useMemo(() => {
    return users
      .filter((user) => !user.active)
      .filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((user) => ({ ...user, key: user.id }));
  }, [users, searchQuery]);

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
      render: (_, record) => <div className={styles.artistCell}>{record.createdAt}</div>,
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
              console.log(editUserPassword, deleteUser, blockUnblockUser);
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
              setDeleteUser(record.id); 
              console.log(editUserPassword, deleteUser, blockUnblockUser);
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
              console.log(editUserPassword, deleteUser, blockUnblockUser);
            }}
          >
            <Image
              className={styles.curImg}
              src={record.active ? "/icons/block.svg" : "/icons/unBlock.svg"}
              width={24}
              height={24}
              alt="block/unblock"
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
              top: "-282px",
            }}
          />
          <Table
            rowSelection={{
              selectedRowKeys: selectedRowKeysAll,
              onChange: setSelectedRowKeysAll,
            }}
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
              top: "-282px",
            }}
          />
          <Table
            rowSelection={{
              selectedRowKeys: selectedRowKeysBlocked,
              onChange: setSelectedRowKeysBlocked,
            }}
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
      {deleteUser && (
        <div>
          <p>Deleting User: {deleteUser}</p>
        </div>
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
