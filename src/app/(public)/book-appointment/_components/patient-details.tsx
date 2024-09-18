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
        Please provide the following details to book an appointment
      </h1>

      <Form layout="vertical">
        <div className="grid grid-cols-4 gap-5 mt-5">
          <Form.Item label="Name">
            <Input
              value={patientDetails.name}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, name: e.target.value })
              }
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-5">
            <Form.Item label="Age">
              <Input
                type="number"
                value={patientDetails.age}
                onChange={(e) =>
                  setPatientDetails({ ...patientDetails, age: +e.target.value })
                }
              />
            </Form.Item>

            <Form.Item label="Gender">
              <Select
                value={patientDetails.gender}
                onChange={(value) =>
                  setPatientDetails({ ...patientDetails, gender: value })
                }
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <Form.Item label="Email">
            <Input
              value={patientDetails.email}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Phone">
            <Input
              value={patientDetails.phone}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, phone: e.target.value })
              }
            />
          </Form.Item>

          <div className="col-span-4">
            <Form.Item label="Problem">
              <Input.TextArea
                value={patientDetails.problem}
                onChange={(e) =>
                  setPatientDetails({ ...patientDetails, problem: e.target.value })
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
