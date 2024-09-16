"use client";
import PageTitle from "@/components/page-title";
import React from "react";
import { Form, Input, Button, Select, message, Alert } from "antd";
import { workHours, specializations } from "@/constants";
import dayjs from "dayjs";
import { IDoctor } from "@/interfaces";
import { checkDoctorsAvailability } from "@/server-actions/appointments";

function BookAppoinmentPage() {
  const [slotData, setSlotData] = React.useState({
    date: "",
    time: "",
    specialist: "",
  });
  const [availableDoctors, setAvailableDoctors] = React.useState<IDoctor[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const checkAvailabilityHandler = async () => {
    try {
      setLoading(true);
      setError("");
      const { success, data } = await checkDoctorsAvailability(slotData);
      if (!success || !data.length) {
        setError("No doctors available for the given slot");
      } else {
        setAvailableDoctors(data);
        console.log(data);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const clearHandler = () => {
    setSlotData({ date: "", time: "", specialist: "" });
    setAvailableDoctors([]);
  };

  return (
    <div className="px-10 my-5">
      <PageTitle title="Book Appointment" />

      <Form layout="vertical" className="mt-5">
        <div className="grid grid-cols-4 gap-5 items-end">
          <Form.Item label="Date">
            <Input
              type="date"
              value={slotData.date}
              onChange={(e) =>
                setSlotData({ ...slotData, date: e.target.value })
              }
              min={dayjs().format("YYYY-MM-DD")}
            />
          </Form.Item>

          <Form.Item label="Time">
            <Select
              options={workHours}
              value={slotData.time}
              onChange={(value) => setSlotData({ ...slotData, time: value })}
              disabled={!slotData.date}
            />
          </Form.Item>

          <Form.Item label="Specialist">
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
            <Button onClick={clearHandler}>Clear</Button>
            <Button
              disabled={!slotData.specialist}
              type="primary"
              onClick={checkAvailabilityHandler}
              loading={loading}
            >
              Check Availability
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
    </div>
  );
}

export default BookAppoinmentPage;
