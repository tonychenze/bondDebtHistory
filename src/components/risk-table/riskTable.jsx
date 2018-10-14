import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import TableSortable from "../common/tableSortable";
import "./riskTable.css";

class RiskTable extends Component {
  state = {
    currentSortColumn: { path: "description", order: "asc" },
    rows: []
  };

  componentDidMount() {
    this.setState({
      rows: [
        {
          _id: "1",
          description: "description",
          type: "VaR",
          utilisation: 45,
          exposure: 4.5,
          limit: 10,
          mrm: "MRM Onwer 1",
          business: "business owner",
          supervisor: "supervisor ",
          tick: 0.5
        },
        {
          _id: "2",
          description: "eescription",
          type: "PST",
          utilisation: 35,
          exposure: 7,
          limit: 20,
          mrm: "MRM Onwer 2",
          business: "business owner 3",
          supervisor: "supervisor 4 ",
          tick: 1
        }
      ]
    });
  }
  handleSort = currentSortColumn => {
    this.setState({ currentSortColumn });

    //    console.log("risktable sort item : ", currentSortColumn);
  };

  headers = [
    { path: "description", label: "Risk Description" },
    { path: "type", label: "Type" },
    { path: "utilisation", label: "Utilisation %" },
    { path: "exposure", label: "Exposure £ M" },
    { path: "limit", label: "Limit Value" },
    { path: "mrm", label: "MRM Owner" },
    { path: "business", label: "Business Owner" },
    { path: "supervisor", label: "Supervisor" },
    { path: "tick", label: "Tick" },
    {
      key: "buy",
      label: "",
      content: item => (
        <button
          className="btn btn-success"
          onClick={() => this.handleItemTick(item, "buy")}
        >
          Buy
        </button>
      )
    },
    {
      key: "sell",
      label: "",
      content: item => (
        <button
          className="btn btn-warning"
          onClick={() => this.handleItemTick(item, "sell")}
        >
          Sell
        </button>
      )
    }
  ];

  handleItemTick = (item, tickType) => {
    const rows = [...this.state.rows];
    const index = rows.indexOf(item);
    const newItem = rows[index];
    if (tickType === "buy") {
      newItem.exposure = item.exposure + item.tick;
    } else {
      if (item.exposure >= item.tick) {
        newItem.exposure = item.exposure - item.tick;
      } else {
        toast.error("Reach the Limit");
      }
    }
    newItem.utilisation = ((newItem.exposure * 100) / newItem.limit).toFixed(1);
    this.setState({ rows });
  };

  handleSellItem = item => {
    console.log("handle a sell of", item);
  };
  render() {
    const { currentSortColumn, rows } = this.state;
    const sortedRows = _.orderBy(
      rows,
      [currentSortColumn.path],
      [currentSortColumn.order]
    );
    return (
      <div className="row">
        <div className="col-10 offset-1">
          <TableSortable
            columns={this.headers}
            rows={sortedRows}
            onSort={this.handleSort}
            sortColumn={currentSortColumn}
          />
        </div>
      </div>
    );
  }
}

export default RiskTable;
