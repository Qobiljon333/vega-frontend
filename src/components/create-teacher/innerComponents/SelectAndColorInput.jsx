// @ts-nocheck
import React from "react";
import s from "../CreateProduct.module.css";
import SelectOption from "./selectOption/SelectOption";

const SelectAndColorInput = ({ kalit, placeholder, handleChange, value }) => {
  return (
    <div className={s.typeSelectInputs}>
      <SelectOption
          kalit={kalit}
          value={value}
          placeholder={placeholder}
          handleChange={handleChange}
        />
    </div>
  );
};

export default SelectAndColorInput;
