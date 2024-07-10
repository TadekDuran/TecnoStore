import React from "react";

const Filters = () => {
  return (
    <div className="sticky top-[7vh] h-[93vh] w-72 bg-black p-3">
      <section>
        <p>Categoria</p>
        <select className="w-full text-black" name="Marca">
          <option value="value1">Samsung</option>
          <option value="value2" selected>
            Apple
          </option>
          <option value="value3">Xiaomi</option>
          <option value="value3">Motorola</option>
        </select>
      </section>
      <section>
        <p>Precio</p>
        <div className="flex gap-2">
          <p>$100</p>
          <input type="range" min="100" max="1000" />
          <p>$1000</p>
        </div>
      </section>
    </div>
  );
};

export default Filters;
