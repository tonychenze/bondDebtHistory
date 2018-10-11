import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
  raiseSort = path => {
    const { sortColumn, onSort } = this.props;
    if (!onSort) return;
    const newSort = { ...sortColumn };
    if (!path) return;
    if (sortColumn.path === path) {
      newSort.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSort.path = path;
      newSort.order = "asc";
    }
    onSort(newSort);
  };

  render() {
    const { columns, headerStyle } = this.props;
    return (
      <thead className={headerStyle}>
        <tr>
          {columns.map(column => (
            <th
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  sortColumn: PropTypes.object,
  headerStyle: PropTypes.string
};
TableHeader.defaultProps = {
  headerStyle: "thead-dark"
};
export default TableHeader;

// columns: arrays
// currentSortColumn: obj
//onSort: return sortColumn
//<TableHeader columns={items} sortColumn={item} onSort={()=>this.handleSort(column)}
