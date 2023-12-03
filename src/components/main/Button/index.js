/* eslint-disable react/button-has-type */
import React from "react";

const Button = ({
  onClick, children, className, type = "button",
}) => (
  <button type={type} onClick={onClick} className={`bg-blue-500 text-white p-2 rounded-md ${className}`}>
    {children}
  </button>
);

export default Button;
