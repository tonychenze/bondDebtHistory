import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class TableSortable extends Component {
  render() {
    const { columns, rows, sortColumn, onSort, rowIdVal } = this.props;
    return (
      <table className="table tabl-striped table-hover">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody rows={rows} columns={columns} rowIdVal={rowIdVal} />
      </table>
    );
  }
}

export default TableSortable;
