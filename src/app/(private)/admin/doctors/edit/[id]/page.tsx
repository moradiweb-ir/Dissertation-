import PageTitle from "@/components/page-title";
import React, { Suspense } from "react";
import DoctorForm from "../../_components/doctor-form";
import { getDoctorById } from "@/server-actions/doctors";
import { Alert } from "antd";
import SpinnerForServerComponents from "@/components/spinner-for-server-components";

interface EditDoctorPageProps {
  params: {
    id: string;
  };
}

async function EditDoctorPage({ params }: EditDoctorPageProps) {
  const { success, data } = await getDoctorById(params.id);
  if (!success) {
    return (
      <Alert
        message="تماس با پزشک ناموفق بود، لطفاً بعداً دوباره امتحان کنید"
        showIcon
      />
    );
  }

  const doctor = data;
  return (
    <div className="p-5">
      <PageTitle title="ویرایش دکتر" />
      <DoctorForm type="edit" initialValues={doctor} />
    </div>
  );
}

export default function Page(props: EditDoctorPageProps) {
  return (
    <Suspense fallback={<SpinnerForServerComponents />}>
      <EditDoctorPage {...props} />
    </Suspense>
  );
}
