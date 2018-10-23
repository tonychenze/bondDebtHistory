import React from "react";
const Input = ({ label, name, error, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label}</label>
      <input
        name={name}
        id={name}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
