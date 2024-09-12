import React from "react";
import { Button, Input, Select } from "antd";

const options = [
  { label: "America", value: "America" },
  { label: "Canada", value: "Canada" },
  { label: "Nigeria", value: "Nigeria" },
];

function Homepage() {
  return (
    <div className="p-5 flex flex-col gap-5 w-max">
      <h1>Shey-Hospital - Homepage</h1>
      <Button>Default Button</Button>
      <Button type="primary">Primary Button</Button>
      <Input placeholder="Basic Input" />
      <Select options={options} />
    </div>
  );
}

export default Homepage;
