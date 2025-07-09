import PageTitle from "@/components/page-title";
import { getDashboardData } from "@/server-actions/dashboard-reports";
import { Alert } from "antd";
import React, { Suspense } from "react";
import DashboardCard from "./_components/dashboard-card";
import AppointmentsTable from "../appointments/_components/appointments-table";
import SpinnerForServerComponents from "@/components/spinner-for-server-components";

async function DashboardPage() {
  const { success, data }: any = await getDashboardData();
  if (!success) {
    return (
      <Alert
        message="Failed to fetch dashboard data, please try again later"
        showIcon
      />
    );
  }

  return (
    <div className="p-5 flex flex-col gap-5 text-end">
      <PageTitle title="داشبورد" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-2 text-center">
        <DashboardCard
          title="رزروهای امروز"
          value={data?.todayAppointmentsCount || 0}
          description="کل وقت‌های رزرو شده امروز"
        />

        <DashboardCard
          title="همه رزروها"
          value={data?.allAppointmentsCount || 0}
          description="کل وقت‌های رزرو شده تا این لحظه"
        />

        <DashboardCard
          title="دکترها"
          value={data?.allDoctorsCount || 0}
          description="کل پزشکان ثبت شده در سامانه"
        />

        <DashboardCard
          title="بیماران"
          value={data?.allPatientsCount || 0}
          description="کل بیماران ثبت شده تا این لحظه"
        />
      </div>

      <div className="mt-7">
        <h1 className="text-xl font-bold">قرارهای ملاقات امروز</h1>
        <AppointmentsTable appointments={data?.todayAppointmentsData} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<SpinnerForServerComponents />}>
      <DashboardPage />
    </Suspense>
  );
}
