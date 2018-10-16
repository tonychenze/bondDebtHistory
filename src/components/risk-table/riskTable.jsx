import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import limitService from "../../services/limitService";
import TableSortable from "../common/tableSortable";
import Utilisation from "./utilisation";
import FormattedValue from "./formattedValue";

import "./riskTable.css";

class RiskTable extends Component {
  state = {
    currentSortColumn: { path: "description", order: "asc" },
    rows: []
  };

  async componentDidMount() {
    //get data from endpoint calling http service
    const { data: rows } = await limitService.getLimits();
    this.setState({ rows });
  }

  headers = [
    { path: "description", label: "Risk Description" },
    { path: "type", label: "Type" },
    {
      path: "utilisation",
      label: "Utilisation",
      content: item => (
        <Utilisation utilisation={item.utilisation} breach={item.breach} />
      )
    },
    {
      path: "exposure",
      label: "Exposure",
      content: item => <FormattedValue item={item} path="exposure" />
    },
    {
      path: "limit",
      label: "Limit Value",
      content: item => <FormattedValue item={item} path="limit" />
    },
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

  handleSort = currentSortColumn => {
    this.setState({ currentSortColumn });
  };

  handleItemTick = (item, tickType) => {
    const rows = [...this.state.rows];
    const index = rows.indexOf(item);
    const newItem = rows[index];

    const { description, exposure, tick, limit, breach } = item;

    if (tickType === "buy") {
      if (exposure + tick <= (limit * breach) / 100) {
        newItem.exposure = exposure + tick;
      } else {
        toast.error(`${description} reach the Breach`);
      }
    } else {
      if (exposure >= tick) {
        newItem.exposure = exposure - tick;
      } else {
        toast.error(`The ${description} exposure is less than 0`);
      }
    }

    newItem.utilisation = ((newItem.exposure * 100) / newItem.limit).toFixed(0);
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
