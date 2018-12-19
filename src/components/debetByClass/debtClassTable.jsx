import React, { Component } from "react";
import _ from "lodash";
import debtByClassService from "../../services/debtByClassService";
import TableSortable from "../common/tableSortable";
import { headers } from "./debtHeader";
class debtClassTable extends Component {
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
    const bondTypes = ["ALL", "BI", "LD", "ME", "MP", "SE", "SP"];
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

  render() {
    const { currentSortColumn } = this.state;

    const renderRows = this.getRenderRows();

    const sortedRows = _.orderBy(
      renderRows,
      [currentSortColumn.path],
      [currentSortColumn.order]
    );

    return (
      <div>
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

export default debtClassTable;
