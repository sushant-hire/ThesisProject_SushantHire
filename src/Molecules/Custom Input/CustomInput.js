import React from "react";

function CustomInput({
  accept,
  style,
  type,
  placeholder,
  className,
  onChange,
  value,
  required,
}) {
  return (
    <input
      accept={accept}
      value={value}
      onChange={onChange}
      className={className}
      type={type}
      placeholder={placeholder}
      style={style}
      required={required}
    />
  );
}

export default CustomInput;
