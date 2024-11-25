import React from "react";
import classNames from "classnames";

export const Button = ({ content, onClick, className, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={classNames(
      "px-6 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary transition-all duration-300 ease-in-out transform scale-105 hover:scale-100 shadow-md hover:shadow-lg",
      className
    )}
  >
    {content}
  </button>
);

export default Button;
