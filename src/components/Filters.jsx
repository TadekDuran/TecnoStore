import React from "react";
import { Slider, Select, Option } from "@mui/joy";
const Filters = () => {
  const marks = [
    {
      value: 100,
      label: "$100",
    },
    {
      value: 2000,
      label: "$2000",
    },
  ];
  return (
    <div className="sticky top-[7vh] h-[93vh] w-72 bg-black p-3">
      <section>
        <p>Marca</p>
        <Select placeholder="Selecciona una marca">
          <Option value="Apple">Apple</Option>
          <Option value="Samsung">Samsung</Option>
          <Option value="Motorola">Motorola</Option>
          <Option value="Xiaomi">Xiaomi</Option>
        </Select>
      </section>
      <section>
        <Slider
          color="primary"
          size="md"
          aria-label="precio"
          marks={marks}
          step={50}
          min={100}
          max={2000}
          valueLabelDisplay="auto"
        />
      </section>
    </div>
  );
};

export default Filters;
