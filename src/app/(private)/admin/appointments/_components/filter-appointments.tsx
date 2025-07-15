"use client";

import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function FilterAppointments() {
  const [date, setDate] = React.useState("");
  const [patientName, setPatientName] = React.useState("");
  const [doctorName, setDoctorName] = React.useState("");
  const router = useRouter();

  const onFilter = () => {
    router.push(
      `/admin/appointments?date=${date}&patientName=${patientName}&doctorName=${doctorName}`
    );
  };

  const onClearFilters = () => {
    setDate("");
    setPatientName("");
    setDoctorName("");
    router.push("/admin/appointments");
  };

  return (
    <div className="grid lg:grid-cols-4 gap-5 ">
      <div className="flex flex-col text-start">
        <label htmlFor="Search" className="text-sm">
          تاریخ بیمار
        </label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col text-start ">
        <label htmlFor="Speciality" className="text-sm">
          نام دکتر
        </label>
        <Input
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
      </div>

      <div className="flex flex-col text-start ">
        <label htmlFor="Phone" className="text-sm">
          نام بیمار
        </label>
        <Input
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-5">
        <Button onClick={onClearFilters}>پاک کردن فیلتر</Button>
        <Button type="primary" onClick={onFilter}>
          اعمال فیلتر
        </Button>
      </div>
    </div>
  );
}

export default FilterAppointments;
