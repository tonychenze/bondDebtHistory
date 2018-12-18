import React, { Component } from "react";
import _ from "lodash";
import TableSortable from "../common/tableSortable";
import { headers } from "./debtHeader";
class debtClassTableItem extends Component {
  state = {
    currentSortColumn: { path: "instrument", order: "asc" }
  };

  handleSort = currentSortColumn => {
    this.setState({ currentSortColumn });
  };

  getTotal = column => {
    const { rows } = this.props;
    const resutlt = rows.reduce((acc, cur) => acc + cur[column], 0);
    return Math.round(resutlt * 100) / 100;
  };

  render() {
    const columns = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "II",
      "Total"
    ];

    return (
      <tr>
        <td>LD</td>
        <td>NA</td>
        {columns.map(column => (
          <td>{this.getTotal(column)}</td>
        ))}
      </tr>
    );
  }
}

export default debtClassTableItem;
