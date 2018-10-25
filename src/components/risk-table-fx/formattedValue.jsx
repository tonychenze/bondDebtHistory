import React from "react";
const FormattedValue = ({ item, path }) => {
  const { currency, unit } = item;
  const valueType = item[path];
  return (
    <div>
      <span className="valueLabel">{currency}</span>
      <span className={path + "Value"}>{valueType}</span>
      <span className="valueLabel">{unit}</span>
    </div>
  );
};

export default FormattedValue;
