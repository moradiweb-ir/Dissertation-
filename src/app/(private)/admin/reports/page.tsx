import PageTitle from "@/components/page-title";
import { getReportsData } from "@/server-actions/dashboard-reports";
import { Alert } from "antd";
import React, { Suspense } from "react";
import DateFiltersForReports from "./_components/date-filters";
import dayjs from "dayjs";
import DashboardCard from "../dashboard/_components/dashboard-card";
import AppointmentsTable from "../appointments/_components/appointments-table";

interface ReportsPageProps {
  searchParams: {
    fromDate: string;
    toDate: string;
  };
}

async function ReportsPage({ searchParams }: ReportsPageProps) {
  const { success, data } = await getReportsData({
    fromDate: searchParams.fromDate || dayjs().format("YYYY-MM-DD"),
    toDate: searchParams.toDate || dayjs().format("YYYY-MM-DD"),
  });

  if (!success) {
    return (
      <Alert
        message="دریافت داده‌های گزارش‌ها ناموفق بود"
        type="error"
        showIcon
      />
    );
  }
  return (
    <div className="p-5 flex flex-col gap-5 text-center">
      <PageTitle title="گزارشات" />

      <DateFiltersForReports />

      <div className="flex lg:flex-cols-3 gap-4 justify-start text-center ">
        <DashboardCard
          title="مجموع قرار ملاقات ها"
          value={data?.appointmentsCount || 0}
          description={`تعداد کل قرار ملاقات‌ها در محدوده تاریخ انتخاب شده`}
        />

        <DashboardCard
          title="هزینه جمع آوری شده"
          value={`${data?.feeCollected || 0}`}
          description={`کل هزینه مشاوره جمع‌آوری‌شده در محدوده تاریخ انتخاب ‌شده`}
        />
      </div>

      <div>
        <h1 className="text-sm font-bold text-start">
          داده‌های قرار ملاقات در محدوده تاریخ انتخاب شده
          {searchParams.toDate}
        </h1>

        <AppointmentsTable appointments={data?.appointmentsData || []} />
      </div>
    </div>
  );
}

export default function Page(props: any) {
  return (
    <Suspense>
      <ReportsPage {...props} />
    </Suspense>
  );
}
