import React from "react";
import "./DateInput.css";

const DateInput = ({ value, onChange, id, name, className = "" }) => {
  const classes = `date-input ${className}`.trim();

  return (
    <div className={classes}>
      <input
        type="date"
        id={id}
        name={name}
        className="date-input__control"
        value={value ?? ""}
        onChange={(e) => onChange && onChange(e)}
      />
    </div>
  );
};

export default DateInput;
