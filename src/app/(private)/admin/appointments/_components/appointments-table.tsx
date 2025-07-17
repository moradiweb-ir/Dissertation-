"use client";

import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IPatient, IDoctor, IAppointment } from "@/interfaces";
import { Button, Table } from "antd";
import { Eye, X } from "lucide-react";
import React from "react";
import ViewAppointmentModal from "./view-appointment-modal";
import CancelAppointmentModal from "./cancel-appointment-model";
import dayjs from "dayjs";

interface AppointmentsTableProps {
  appointments: IAppointment[];
}

function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const [showViewAppointmentModal, setShowViewAppointmentModal] =
    React.useState(false);
  const [showCancelAppointmentModal, setShowCancelAppointmentModal] =
    React.useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<IAppointment | null>(null);
  const columns = [
    {
      title: "نام دکتر",
      dataIndex: "doctor",
      render: (doctor: IDoctor) => doctor?.name || "نامشخص",
    },
    {
      title: "نام بیمار",
      dataIndex: "patient",
      render: (patient: IPatient) => patient?.name || "نامشخص",
    },
    {
      title: "اقدام",
      dataIndex: "action",
      render: (text: string, record: IAppointment) => {
        let showCancelBtn = false;
        const isCancelled = record.status === "cancelled";
        const isPast = dayjs(
          `${record.date} ${record.time}`,
          "YYYY-MM-DD HH:mm A"
        ).isBefore(dayjs());
        return (
          <div className="flex gap-5">
            <Button
              icon={<Eye size={12} />}
              size="small"
              onClick={() => {
                setSelectedAppointment(record);
                setShowViewAppointmentModal(true);
              }}
            >
              View
            </Button>
            {!isPast && !isCancelled && (
              <Button
                icon={<X size={12} />}
                size="small"
                onClick={() => {
                  setSelectedAppointment(record);
                  setShowCancelAppointmentModal(true);
                }}
              >
                لغو کردن{" "}
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "رزرو شده در",
      dataIndex: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      render: (status?: string) => status?.toUpperCase() || "نامشخص",
    },
    {
      title: "تاریخ & زمان",
      dataIndex: "date",
      render: (date: string, row: IAppointment) =>
        getDateTimeFormat(`${date} ${row.time}`),
    },
    {
      title: "متخصص",
      dataIndex: "specialist",
      render: (specialist: string) => specialist?.toUpperCase() || "نامشخص",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={appointments} rowKey="_id" />
      {selectedAppointment && (
        <ViewAppointmentModal
          {...{
            showViewAppointmentModal,
            setShowViewAppointmentModal,
            appointment: selectedAppointment!,
          }}
        />
      )}

      {selectedAppointment && (
        <CancelAppointmentModal
          {...{
            showCancelAppointmentModal,
            setShowCancelAppointmentModal,
            appointment: selectedAppointment!,
          }}
        />
      )}
    </div>
  );
}

export default AppointmentsTable;
