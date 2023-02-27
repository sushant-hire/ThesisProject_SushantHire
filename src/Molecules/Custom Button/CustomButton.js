import React from "react";

function CustomButton({ buttontext, onClick, className, type }) {
  return (
    <div>
      <button type={type} className={className} onClick={onClick}>
        {buttontext}
      </button>
    </div>
  );
}

export default CustomButton;
