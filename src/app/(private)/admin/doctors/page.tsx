import PageTitle from "@/components/page-title";
import { getDoctors } from "@/server-actions/doctors";
import { Button, Alert } from "antd";
import Link from "next/link";
import React from "react";
import DoctorsTable from "./_components/doctors-table";
import FilterDoctors from "./_components/filter-doctors";

interface DoctorsPageProps {
  searchParams: {
    search: string;
    speciality: string;
    phone: string;
  };
}

async function DoctorsPage({ searchParams }: DoctorsPageProps) {
  const { success, data } = await getDoctors(searchParams);
  if (!success) {
    return (
      <Alert
        message="Failed to fetch doctors , please try again later"
        showIcon
      />
    );
  }

  const doctors = data;
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <Button type="primary">
          <Link href="/admin/doctors/new">اضافه کردن دکتر</Link>
        </Button>
        <PageTitle title="پزشکان" />
      </div>

      <FilterDoctors />

      <DoctorsTable doctors={doctors} />
    </div>
  );
}

export default DoctorsPage;
