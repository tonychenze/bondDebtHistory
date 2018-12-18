import React, { Component } from "react";
import DebtClassTableItem from "../debtClassTableItem";
import debtByClassService from "../../../services/debtByClassService";
import { headers } from "../debtHeader";
class LDInstrument extends Component {
  state = {
    rows: []
  };
  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const allRows = response ? response.data : [];
    if (!allRows) return;
    const rows = allRows.filter(row => row.instrument === "LD");
    this.setState({ rows });
  }
  render() {
    return (
      <div>
        <h2>Historic Debt Outstanding -LD</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              {headers.map(column => (
                <th key={column.path}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <DebtClassTableItem rows={this.state.rows} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default LDInstrument;
