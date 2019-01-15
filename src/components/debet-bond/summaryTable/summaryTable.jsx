import React, { Component } from "react";
import TotalByClassItem from "./totalByClassItem";
import debtByClassService from "../../../services/debtByClassService";
import getTypeFromRows from "../common/getTypesFromRows";
import StockChart from "../charts/stockChart";
import { headers, sectors, sectorDescriptons } from "../bondTypeTable/header-constants";

const headersCopy = [...headers];
headersCopy.splice(0, 2);

class TotablByClassTable extends Component {
  state = {
    tableData: [],
    currentType: "BI",
    currentSector: "A"
  };

  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const allRows = response ? response.data : [];
    if (!allRows) return;

    const newRows = [];
    const classes = getTypeFromRows(allRows);
    classes.forEach(type => {
      const rows = allRows.filter(row => row.instrument === type);
      newRows.push({ type: type, data: rows });
    });
    this.setState({ tableData: newRows });
  }

  handleColumnClick = (currentType, currentSector) => {
    this.setState({ currentType, currentSector });
  };

  getStokChartTitle = () => {
    const { currentSector, currentType } = this.state;
    return `Summary of ${currentType} - ${sectorDescriptons[currentSector]}`;
  };

  renderBodyContent = () => {
    const { tableData, currentSector, currentType } = this.state;
    return (
      <tbody>
        {tableData.map((row, index) => (
          <TotalByClassItem
            type={row.type}
            rows={row.data}
            key={index}
            onColumnClicked={this.handleColumnClick}
            onRowColicked={this.handleRowClick}
            atciveColumn={`${currentType}_${currentSector}`}
          />
        ))}
      </tbody>
    );
  };

  renderHeaderContent = () => {
    return (
      <thead className="thead-dark">
        <tr>
          {headers.map(column => (
            <th key={column.path}>{column.label}</th>
          ))}
        </tr>
      </thead>
    );
  };

  render() {
    const { tableData, currentSector, currentType } = this.state;
    return (
      <div>
        <h2 className="alert alert-info">Historic Debt Outstanding Summary</h2>
        <table className="table table-striped table-hover">
          {this.renderHeaderContent()}
          {this.renderBodyContent()}
        </table>
        <div>
          <StockChart
            sectors={sectors}
            headers={headersCopy}
            currentType={currentType}
            currentSector={currentSector}
            rows={tableData}
            title={this.getStokChartTitle()}
          />
        </div>
      </div>
    );
  }
}

export default TotablByClassTable;
