import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
class TableBody extends Component {
  getCellKey = (row, column) => {
    return column.path
      ? row[rowIdVal] + column.path
      : row[rowIdVal] + column.key;
  };
  renderCell = (row, column) => {
    const cellKey = this.getCellKey(row, column);
    if (row.content) return <td key={cellKey}>{row.content(row)}</td>;
    return <td key={cellKey}>{_.get(row, column)}</td>;
  };
  render() {
    const { columns, rows, rowIdVal } = this.props;
    return (
      <tbody>
        {rows.map(row => (
          <tr key={rowIdVal}>
            {columns.map(column => {
              this.renderCell(row, column);
            })}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.PropTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  rowIdVal: PropTypes.string
};

TableBody.defaultProps = {
  rowIdVal: "_id"
};

export default TableBody;
