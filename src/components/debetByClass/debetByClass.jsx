import React, { Component } from "react";
import DebtClassTable from "./debtClassTable";
class DebtByClass extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Historic Debt Outstanding</h2>
        <DebtClassTable />
      </div>
    );
  }
}

export default DebtByClass;
