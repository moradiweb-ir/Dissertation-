import { IPatient } from "@/interfaces";
import { Form, Input, Select } from "antd";
import React from "react";

interface PatientDetailsProps {
  patientDetails: Partial<IPatient>;
  setPatientDetails: (patientDetails: Partial<IPatient>) => void;
}

function PatientDetails({
  patientDetails,
  setPatientDetails,
}: PatientDetailsProps) {
  return (
    <div className="mt-7">
      <h1 className="text-sm font-bold text-primary">
        لطفا برای رزرو نوبت، مشخصات زیر را ارائه دهید
      </h1>

      <Form layout="vertical">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          <Form.Item
            label="نام"
            className="col-span-4 md:col-span-2 lg:col-span-1"
          >
            <Input
              value={patientDetails.name}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, name: e.target.value })
              }
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-5 col-span-4 md:col-span-2 lg:col-span-1 ">
            <Form.Item label="سن">
              <Input
                type="شماره"
                value={patientDetails.age}
                onChange={(e) =>
                  setPatientDetails({ ...patientDetails, age: +e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="جنسیت"
              className="col-span-2 md:col-span-1 lg:col-span-1"
            >
              <Select
                value={patientDetails.gender}
                onChange={(value) =>
                  setPatientDetails({ ...patientDetails, gender: value })
                }
                options={[
                  {
                    label: "مرد",
                    value: "male",
                  },
                  {
                    label: "زن",
                    value: "female",
                  },
                  {
                    label: "بیشتر",
                    value: "other",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="ایمیل"
            className="col-span-4 md:col-span-2 lg:col-span-1"
          >
            <Input
              value={patientDetails.email}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="شماره تلفن"
            className="col-span-4 md:col-span-2 lg:col-span-1"
          >
            <Input
              value={patientDetails.phone}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, phone: e.target.value })
              }
            />
          </Form.Item>

          <div className="col-span-4">
            <Form.Item label="مشکل">
              <Input.TextArea
                value={patientDetails.problem}
                onChange={(e) =>
                  setPatientDetails({
                    ...patientDetails,
                    problem: e.target.value,
                  })
                }
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default PatientDetails;
