import React, { Component } from "react";
import { toast } from "react-toastify";
import utils from "../utils";

class RiskDashboard extends Component {
  getBreachedCount = () => {
    const { data } = this.props;
    if (!data) return 0;
    const breached = data.filter(item =>
      utils.isBreached(item.utilisation, item.breach)
    );
    return breached.length;
  };

  getNearBreachedCount = () => {
    const { data } = this.props;
    if (!data) return 0;
    const nearBreached = data.filter(
      item =>
        utils.isNearBreach(item.utilisation, item.breach) &&
        !utils.isBreached(item.utilisation, item.breach)
    );
    return nearBreached.length;
  };

  render() {
    const { data } = this.props;
    return (
      <div className="row">
        <div className="col-2" id="tableName">
          <span>Risk Table</span>
        </div>
        <div className="col-2">
          <span className="dashboard-count" id="dashboard-total">
            {data.length}
          </span>
          <span className="dashboard-name">reocrds</span>
        </div>
        <div className="col-2">
          <span className="dashboard-count" id="dashboard-nearBreach">
            {this.getNearBreachedCount()}
          </span>
          <span className="dashboard-name">near breach</span>
        </div>
        <div className="col-2">
          <span className="dashboard-count" id="dashboard-breach">
            {this.getBreachedCount()}
          </span>
          <span className="dashboard-name">breached</span>
        </div>
      </div>
    );
  }
}

export default RiskDashboard;
