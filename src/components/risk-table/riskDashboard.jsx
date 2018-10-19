import React, { Component } from "react";
class RiskDashboard extends Component {
  render() {
    //const { data } = this.props;
    const totalCount = 10;
    const nearBreach = 2;
    const breached = 3;
    return (
      <div className="row">
        <div className="col-2" id="tableName">
          Risk Table
        </div>
        <div className="col-2">
          <span className="dashboard-count" id="dashboard-total">
            {totalCount}
          </span>
          <span className="dashboard-name">reocrds</span>
        </div>
        <div className="col-2">
          <span className="dashboard-count" id="dashboard-nearBreach">
            {nearBreach}
          </span>
          <span className="dashboard-name">near breach</span>
        </div>
        <div className="col-2">
          <span className="dashboard-count" id="dashboard-breach">
            {breached}
          </span>
          <span className="dashboard-name">breached</span>
        </div>
      </div>
    );
  }
}

export default RiskDashboard;
