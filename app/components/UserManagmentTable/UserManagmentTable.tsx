"use client";
import React, { useMemo, useState } from "react";
import { Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import styles from "./UserManagmentTable.module.scss";

type User = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  block: boolean;
};

const UserTable: React.FC = () => {
  const [selectedRowKeysAll, setSelectedRowKeysAll] = useState<React.Key[]>([]);
  const [selectedRowKeysBlocked, setSelectedRowKeysBlocked] = useState<
    React.Key[]
  >([]);
  const [activePasswordId, setActivePasswordId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const users: User[] = [
    {
      id: 1,
      email: "user1@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      block: true,
    },
    {
      id: 2,
      email: "blockeduser@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      block: true,
    },{
      id: 3,
      email: "blockeduser@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      block: true,
    },{
      id: 4,
      email: "blockeduser@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      block: true,
    },{
      id: 5,
      email: "blockeduser@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      block: true,
    },{
      id: 6,
      email: "blockeduser@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      block: true,
    },{
      id: 7,
      email: "blockeduser@example.com",
      password: "password123",
      createdAt: "2023-09-30",
      block: true,
    },
  ];

  const memoizedUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((user) => ({ ...user, key: user.id }));
  }, [users, searchQuery]);

  const memoizedBlockedUsers = useMemo(() => {
    return users
      .filter((user) => user.block)
      .filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((user) => ({ ...user, key: user.id }));
  }, [users, searchQuery]);

  const handlePasswordToggle = (id: number) => {
    setActivePasswordId(activePasswordId === id ? null : id);
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
      render: (_, record) => (
        <div>
          {record.email}
        </div>
      ),
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
          <div onClick={() => handlePasswordToggle(record.id)}>
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
          <button className={styles.unBorder}>
            <Image
              className={styles.curImg}
              src={`/icons/whiteEdit.svg`}
              width={24}
              height={24}
              alt="edit"
            />
          </button>
          <button className={styles.unBorder}>
            <Image
              className={styles.curImg}
              src={`/icons/whiteTrash.svg`}
              width={24}
              height={24}
              alt="delete"
            />
          </button>
          <button className={styles.unBorder}>
            <Image
              className={styles.curImg}
              src={
                record.block ? "/icons/block.svg" : "/icons/unBlock.svg"
              }
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
              top: "-200px",
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
              top: "-190px",
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
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ width: "1100px" }} />
    </div>
  );
};

export default UserTable;
