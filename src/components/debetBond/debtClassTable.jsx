import React, { Component } from "react";
import _ from "lodash";
import debtByClassService from "../../services/debtByClassService";
import TableSortable from "../common/tableSortable";
import { headers } from "./debtHeader";
import getTypeFromRows from "./common/getTypesFromRows";
import sortByDate from "./common/sortByDate";
class DebtClassTable extends Component {
  state = {
    currentSortColumn: { path: "instrument", order: "asc" },
    rows: [],
    currentType: "ALL"
  };

  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const rows = response ? response.data : [];
    this.setState({ rows });
  }

  handleSort = currentSortColumn => {
    this.setState({ currentSortColumn });
  };

  renderButtons = () => {
    const bondTypesList = getTypeFromRows(this.state.rows);
    const bondTypes = ["ALL", ...bondTypesList];
    return bondTypes.map(type => (
      <button
        className="btn btn-primary"
        onClick={() => this.handleTypeClick(type)}
        style={{ margin: 10, width: 100 }}
        key={type}
        disabled={type === this.state.currentType}
      >
        {type}
      </button>
    ));
  };

  handleTypeClick = type => {
    this.setState({ currentType: type });
  };

  getRenderRows = () => {
    const { rows, currentType } = this.state;
    return currentType === "ALL"
      ? [...rows]
      : rows.filter(row => row.instrument === currentType);
  };

  getSortedRows = () => {
    const { currentSortColumn } = this.state;
    const renderRows = this.getRenderRows();

    const sortedRows =
      currentSortColumn.path === "maturityDate"
        ? renderRows.sort(
            currentSortColumn.order === "asc" ? sortByDate.desc : sortByDate.asc
          )
        : _.orderBy(
            renderRows,
            [currentSortColumn.path],
            [currentSortColumn.order]
          );

    return sortedRows;
  };

  render() {
    const { currentSortColumn, currentType } = this.state;
    const sortedRows = this.getSortedRows();

    return (
      <div>
        <h2 className="alert alert-info">
          <span>{`Historic Debt Outstanding - ${currentType} `}</span>
          <span style={{ color: "	#5bc0de" }}>{`${sortedRows.length} `}</span>
          <span>items</span>
        </h2>
        <div>{this.renderButtons()}</div>
        <div className="col-12">
          <TableSortable
            columns={headers}
            rows={sortedRows}
            onSort={this.handleSort}
            sortColumn={currentSortColumn}
          />
        </div>
      </div>
    );
  }
}

export default DebtClassTable;
