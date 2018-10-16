import React from "react";
import "./riskTable.css";

const Utilisation = ({ utilisation, breach }) => {
  let utilClass = "alert alert-";
  let icon = (
    <i
      className="fa fa-exclamation-circle"
      id="utilsationIcon"
      aria-hidden="true"
    />
  );

  if (utilisation >= 0.9 * breach) utilClass += "danger";
  else if (utilisation >= 0.8 * breach) utilClass += "warning";
  else {
    utilClass = "alert";
    icon = "";
  }

  return (
    <div className={utilClass} id="utilisationValue">
      {icon} {utilisation + "%"}
    </div>
  );
};

export default Utilisation;
