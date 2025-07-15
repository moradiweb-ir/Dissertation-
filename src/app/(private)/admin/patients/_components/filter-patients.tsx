"use client";
import { Button, Input, Select } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

const genders = [
  { label: "مرد", value: "مرد" },
  { label: "زن", value: "زن" },
  { label: "بیشتر", value: "بیشتر" },
];

function FilterPatients() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [gender, setGender] = React.useState("");
  const router = useRouter();

  const onFilter = () => {
    router.push(`/admin/patients?name=${name}&phone=${phone}&gender=${gender}`);
  };

  const onClearFilters = () => {
    setName("");
    setPhone("");
    setGender("");
    router.push("/admin/patients");
  };

  return (
    <div className="grid lg:grid-cols-4 gap-5 items-end">
      <div className="flex flex-col text-start">
        <label htmlFor="Search" className="text-sm">
          نام
        </label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex flex-col  text-start">
        <label htmlFor="phone" className="text-sm">
          تلفن
        </label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="flex flex-col  text-start">
        <label htmlFor="gender" className="text-sm">
          جنسیت
        </label>
        <Select
          options={genders}
          value={gender}
          onChange={(value) => setGender(value)}
          className="w-full"
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

export default FilterPatients;
