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
      title: "اقدام",
      dataIndex: "اقدام",
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
                انصراف
              </Button>
            )}
          </div>
        );
      },
    },
    {
      title: "رزرو شده در",
      dataIndex: "رزرو شده در",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "شناسه پرداخت",
      dataIndex: "شناسه پرداخت",
    },
    {
      title: "وضعیت",
      dataIndex: "وضعیت",
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: "هزینه",
      dataIndex: "هزینه",
      render: (fee: number) => `$${fee}`,
    },
    {
      title: "تاریخ & زمان",
      dataIndex: "تاریخ",
      render: (date: string, row: IAppointment) =>
        getDateTimeFormat(`${date} ${row.time}`),
    },
    {
      title: "متخصص",
      dataIndex: "متخصص",
      render: (specialist: string) => specialist.toUpperCase(),
    },
    {
      title: "نام دکتر",
      dataIndex: "دکتر",
      render: (doctor: IDoctor) => doctor.name,
    },
    {
      title: "نام بیمار",
      dataIndex: "بیمار",
      render: (patient: IPatient) => patient.name,
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
