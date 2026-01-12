import React from "react";
import "./Dropdown.css";

const Dropdown = ({
  value,
  onChange,
  options = [],
  placeholder = "",
  id,
  name,
  className = "",
  compact = false,
}) => {
  const renderOptions = () =>
    options.map((opt, i) => {
      if (opt && typeof opt === "object") {
        return (
          <option key={opt.value ?? i} value={opt.value}>
            {opt.label}
          </option>
        );
      }
      return (
        <option key={i} value={opt}>
          {opt}
        </option>
      );
    });

  const classes =
    `dropdown ${compact ? "dropdown--compact" : ""} ${className}`.trim();

  return (
    <div className={classes}>
      <select
        id={id}
        name={name}
        className="dropdown__select"
        value={value ?? ""}
        onChange={(e) => onChange && onChange(e)}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {renderOptions()}
      </select>
    </div>
  );
};

export default Dropdown;
