"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IDoctor } from "@/interfaces";
import { Button, message, Table } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteDoctor } from "@/server-actions/doctors";

function DoctorsTable({ doctors }: { doctors: IDoctor[] }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const deleteDoctorHandler = async (id: string) => {
    try {
      setLoading(true);
      const { success } = await deleteDoctor(id);
      if (success) {
        message.success("دکتر با موفقیت حذف شد");
      } else {
        message.error("حذف پزشک ناموفق بود");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ایمیل",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "اقدامات",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, row: IDoctor) => (
        <div className="flex gap-5">
          <Button size="small" onClick={() => deleteDoctorHandler(row._id)}>
            <Trash2 size={14} />
          </Button>
          <Button
            size="small"
            onClick={() => router.push(`/admin/doctors/edit/${row._id}`)}
          >
            <Pencil size={14} />
          </Button>
        </div>
      ),
    },

    {
      title: "اضافه شد",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => getDateTimeFormat(date),
    },
    {
      title: "نخصص ها",
      dataIndex: "specializations",
      key: "specilizations",
      render: (specializations: string[]) => specializations.join(" , "),
    },
    {
      title: "تلفن",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  return (
    <div>
      <Table
        dataSource={doctors}
        columns={columns}
        rowKey="_id"
        pagination={false}
        loading={loading}
      />
    </div>
  );
}

export default DoctorsTable;
