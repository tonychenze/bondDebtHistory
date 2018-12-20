import React, { Component } from "react";
import _ from "lodash";
import debtByClassService from "../../services/debtByClassService";
import TableSortable from "../common/tableSortable";
import { headers } from "./debtHeader";
import getTypeFromRows from "./common/getTypesFromRows";
import stringToDate from "./common/stringToDate";
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
      ? rows
      : rows.filter(row => row.instrument === currentType);
  };

  getSortedByDate = rows => {
    return rows.sort((a, b) => {
      return stringToDate(a) > stringToDate(b) ? 1 : -1;
    });
  };

  getSortedRows = () => {
    const { currentSortColumn } = this.state;
    const renderRows = this.getRenderRows();

    const sortedRows =
      currentSortColumn.path === "maturityDate"
        ? this.getSortedByDate(renderRows)
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
        <h2>
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
