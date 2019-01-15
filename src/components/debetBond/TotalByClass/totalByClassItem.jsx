import React, { Component } from "react";
import { sectors } from "../debtHeader";
import NumberFormat from "react-number-format";

class TotalByClassItem extends Component {
  getTotal = column => {
    const { rows } = this.props;
    const resutlt = rows ? rows.reduce((acc, cur) => acc + cur[column], 0) : 0;
    const rounded = Math.round(resutlt * 100) / 100;
    return (
      <NumberFormat
        value={rounded}
        displayType={"text"}
        thousandSeparator={true}
      />
    );
  };

  sectorClick = (type, column) => {
    this.props.onColumnClicked(type, column);
  };

  getClassName = (type, column) => {
    const { atciveColumn } = this.props;
    const currentColumn = `${type}_${column}`;
    return atciveColumn === currentColumn ? "table-warning" : "";
  };

  render() {
    const { type } = this.props;
    const columns = sectors;
    return (
      <tr>
        <td>{type}</td>
        <td>N/A</td>
        {columns.map((column, index) => (
          <td
            key={index}
            onClick={() => this.sectorClick(type, column)}
            className={this.getClassName(type, column)}
          >
            {this.getTotal(column)}
          </td>
        ))}
      </tr>
    );
  }
}

export default TotalByClassItem;
