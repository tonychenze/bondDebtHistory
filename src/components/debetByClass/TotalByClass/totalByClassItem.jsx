import React, { Component } from "react";
class TotalByClassItem extends Component {
  getTotal = column => {
    const { rows } = this.props;
    const resutlt = rows ? rows.reduce((acc, cur) => acc + cur[column], 0) : 0;
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
        <td>{this.props.type}</td>
        <td>NA</td>
        {columns.map((column, index) => (
          <td key={index}>{this.getTotal(column)}</td>
        ))}
      </tr>
    );
  }
}

export default TotalByClassItem;
