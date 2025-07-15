"use client";
import PageTitle from "@/components/page-title";
import React from "react";
import { Form, Input, Button, Select, Alert, message } from "antd";
import { workHours, specializations } from "@/constants";
import dayjs from "dayjs";
import { IDoctor, IPatient } from "@/interfaces";
import {
  checkDoctorsAvailability,
  saveAppointment,
} from "@/server-actions/appointments";
import AvailableDoctors from "./_components/available-doctors";
import PatientDetails from "./_components/patient-details";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);
function BookAppoinmentPage() {
  const [slotData, setSlotData] = React.useState({
    date: "",
    time: "",
    specialist: "",
  });
  const [availableDoctors, setAvailableDoctors] = React.useState<IDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = React.useState<IDoctor | null>(
    null
  );
  const [patientDetails, setPatientDetails] = React.useState<Partial<IPatient>>(
    {
      name: "",
      email: "",
      phone: "",
      age: 0,
      gender: "",
      problem: "",
    }
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loadingPaymentIntent, setLoadingPaymentIntent] = React.useState(false);
  const router = useRouter();
  const checkAvailabilityHandler = async () => {
    try {
      setLoading(true);
      setError("");
      const { success, data } = await checkDoctorsAvailability(slotData);
      if (!success || !data.length) {
        setError("هیچ پزشکی برای زمان داده شده در دسترس نیست");
        setSelectedDoctor(null);
        setAvailableDoctors([]);
      } else {
        setAvailableDoctors(data);
        console.log(data);
      }
    } catch (error: any) {
      setAvailableDoctors([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const clearHandler = () => {
    setSlotData({ date: "", time: "", specialist: "" });
    setAvailableDoctors([]);
  };


  const onPaymentSuccess = async (paymentId: string) => {
    try {
      const response = await saveAppointment({
        date: slotData.date,
        time: slotData.time,
        doctorId: selectedDoctor?._id || "",
        specialist: slotData.specialist,
        fee: selectedDoctor?.fee || 0,
        paymentId,
        patientDetails,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      message.success("نوبت با موفقیت رزرو شد");
      router.push(`/appointment-confirmation?id=${response.data._id}`);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="px-10 my-5 text-start">
      <PageTitle title="نوبت دهی" />

      <Form layout="vertical" className="mt-5 text-end ">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          <Form.Item label="تاریخ">
            <Input
              type="date"
              value={slotData.date}
              onChange={(e) =>
                setSlotData({ ...slotData, date: e.target.value })
              }
              min={dayjs().format("YYYY-MM-DD")}
            />
          </Form.Item>
          <Form.Item label="ساعت">
            <Select
              options={workHours}
              value={slotData.time}
              onChange={(value) => setSlotData({ ...slotData, time: value })}
              disabled={!slotData.date}
            />
          </Form.Item>

          <Form.Item label="متخصص">
            <Select
              options={specializations}
              value={slotData.specialist}
              onChange={(value) =>
                setSlotData({ ...slotData, specialist: value })
              }
              disabled={!slotData.time}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-5">
            <Button onClick={clearHandler}>پاک کردن</Button>
            <Button
              disabled={!slotData.specialist}
              type="primary"
              onClick={checkAvailabilityHandler}
              loading={loading}
            >
              بررسی کردن
            </Button>
          </div>
        </div>
      </Form>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          className="mt-5"
        />
      )}

      {availableDoctors.length > 0 && (
        <AvailableDoctors
          doctorsList={availableDoctors}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
        />
      )}

      {selectedDoctor && (
        <PatientDetails
          patientDetails={patientDetails}
          setPatientDetails={setPatientDetails}
        />
      )}
      {selectedDoctor && (
        <div className="flex justify-end gap-5 mt-7">
          <Button
            type="primary"
            onClick={() => onPaymentSuccess("test-payment-id")}
            loading={loadingPaymentIntent}
          >
            تایید
          </Button>
        </div>
      )}
    </div>
  );
}

export default BookAppoinmentPage;
