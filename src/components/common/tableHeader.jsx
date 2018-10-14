import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
  raiseSort = path => {
    const { sortColumn, onSort } = this.props;
    if (!onSort || !path) return;
    const newSort = { ...sortColumn };
    if (sortColumn.path === path) {
      newSort.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSort.path = path;
      newSort.order = "asc";
    }
    onSort(newSort);
  };

  renderOrderIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    return sortColumn.order === "asc" ? (
      <i className="fa fa-sort-asc" aria-hidden="true" />
    ) : (
      <i className="fa fa-sort-desc" aria-hidden="true" />
    );
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
              {this.renderOrderIcon(column)}
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
