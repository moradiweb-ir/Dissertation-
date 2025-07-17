import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IAppointment } from "@/interfaces";
import React from "react";

interface IAppointmentReceiptProps {
  appointment: IAppointment;
}

function AppointmentReceipt({ appointment }: IAppointmentReceiptProps) {
  const renderProperty = (label: string, value: any) => (
    <div className="flex justify-between text-sm">
      <p className="font-semibold ml-2">{label}</p>
      <p>{value}</p>
    </div>
  );

  return (
    <div className="w-full">
      <div className="p-5 border border-primary rounded-sm flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl text-pretty uppercase">
            رزرو وقت آنلاین
          </h1>

          <div className="text-sm">
            <p>Hyderabad , Telangana</p>
            <p>+91 1234567890</p>
          </div>
        </div>

        <hr />

        <h1 className="bg-gray-300 uppercase py-2 px-3 mt-5 text-sm">
          جزئیات نوبت اینترنتی
        </h1>

        <div className="flex flex-col gap-2 mt-5">
          {renderProperty("شناسه رزرو", appointment._id)}
          {renderProperty("نام دکتر", appointment.doctor.name)}
          {renderProperty("متخصص", appointment.specialist)}
          {renderProperty("تاریخ", appointment.date)}
          {renderProperty("زمان", appointment.time)}
          {renderProperty("وضعیت", appointment.status.toUpperCase())}
          {renderProperty("نام بیمار", appointment.patient.name)}
          {renderProperty("ایمیل بیمار", appointment.patient.email)}
          {renderProperty("نلفن همراه بیمار", appointment.patient.phone)}
          {renderProperty(
            "تاریخ ثبت",
            getDateTimeFormat(appointment.createdAt)
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentReceipt;
