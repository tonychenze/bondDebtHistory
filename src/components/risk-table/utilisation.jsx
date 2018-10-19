import React from "react";
import { nearBreachRatio, breachRatio } from "../../config.json";
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

  if (utilisation >= breachRatio * breach) utilClass += "danger";
  else if (utilisation >= nearBreachRatio * breach) utilClass += "warning";
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
