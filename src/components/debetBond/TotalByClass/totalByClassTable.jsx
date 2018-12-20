import React, { Component } from "react";
import TotalByClassItem from "./totalByClassItem";
import debtByClassService from "../../../services/debtByClassService";
import getTypeFromRows from "../common/getTypesFromRows";
import { headers } from "../debtHeader";
class TotablByClassTable extends Component {
  state = {
    tableData: []
  };

  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const allRows = response ? response.data : [];
    if (!allRows) return;

    const newRows = [];
    const classes = getTypeFromRows(allRows);
    classes.forEach(type => {
      const rows = allRows.filter(row => row.instrument === type);
      newRows.push({ type: type, data: rows });
    });
    this.setState({ tableData: newRows });
  }
  render() {
    const { tableData } = this.state;

    return (
      <div>
        <h2>Total by Class </h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {headers.map(column => (
                <th key={column.path}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <TotalByClassItem type={row.type} rows={row.data} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TotablByClassTable;
