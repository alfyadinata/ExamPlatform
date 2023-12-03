import React from "react";

const Input = ({
  type, name, placeholder, onChange, className,
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    className={`w-full p-2 border rounded-md ${className}`}
  />
);

export default Input;
