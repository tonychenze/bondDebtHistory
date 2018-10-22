import React from "react";
import utils from "../utils";
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

  if (utils.isBreached(utilisation, breach)) utilClass += "danger";
  else if (utils.isNearBreach(utilisation, breach)) utilClass += "warning";
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
