"use client";
import { IUser } from "@/interfaces";
import { updateUser } from "@/server-actions/users";
import { IUsersStore, usersGlobalStore } from "@/store/users-store";
import { Table, Switch, message } from "antd";
import dayjs from "dayjs";
import React from "react";

function UsersTable({ users }: { users: IUser[] }) {
  const [loading, setLoading] = React.useState(false);

  const { currentUserData }: IUsersStore = usersGlobalStore() as any;

  const updateUserHandler = async ({
    userId,
    updatedData,
  }: {
    userId: string;
    updatedData: Partial<IUser>;
  }) => {
    try {
      setLoading(true);
      const { success } = await updateUser({ userId, updatedData });
      if (success) {
        message.success("User updated successfully");
      } else {
        message.error("Failed to update user");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "تایید است",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved: boolean, row: IUser) => (
        <Switch
          checked={isApproved}
          onChange={(newValue) =>
            updateUserHandler({
              userId: row._id,
              updatedData: { isApproved: newValue },
            })
          }
        />
      ),
    },

    {
      title: "ادمبن فعال",
      dataIndex: "isSuperAdmin",
      key: "isSuperAdmin",
      render: (isSuperAdmin: boolean, row: IUser) => (
        <Switch
          checked={isSuperAdmin}
          onChange={(newValue) =>
            updateUserHandler({
              userId: row._id,
              updatedData: { isSuperAdmin: newValue },
            })
          }
        />
      ),
    },
    {
      title: "زمان ورود",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <> {dayjs(createdAt).format("MMM DD YYYY , hh:mm A")} </>
      ),
    },
    {
      title: "آیدی کاربر",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
    },
  ];

  
  if (!currentUserData?.isSuperAdmin) {
    columns.splice(4, 2);
  }

  return (
    <div>
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

export default UsersTable;
