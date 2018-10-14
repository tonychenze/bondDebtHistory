import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
class TableBody extends Component {
  getCellKey = (row, column) => {
    const { rowIdVal } = this.props;
    return column.path
      ? row[rowIdVal] + column.path
      : row[rowIdVal] + column.key;
  };

  renderCell = (row, column) => {
    const cellKey = this.getCellKey(row, column);
    if (column.content) return <td key={cellKey}>{column.content(row)}</td>;

    return <td key={cellKey}>{_.get(row, column.path)}</td>;
  };
  render() {
    const { columns, rows, rowIdVal } = this.props;
    return (
      <tbody>
        {rows.map(row => (
          <tr key={row[rowIdVal]}>
            {columns.map(column => this.renderCell(row, column))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  rowIdVal: PropTypes.string
};

TableBody.defaultProps = {
  rowIdVal: "_id"
};

export default TableBody;
