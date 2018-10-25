import React, { Component } from "react";
import _ from "lodash";
//import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableSortable from "../common/tableSortable";
import ShareChange from "./shareChange";
import SharePrice from "./sharePrice";
import "./shares.css";

class Shares extends Component {
  state = {
    currentSortColumn: { path: "description", order: "asc" },
    rows: []
  };

  async componentDidMount() {
    //get data from endpoint calling http service
    //const { data: rows } = await limitService.getLimits();
    const rows = [
      {
        _id: "1",
        type: "equity",
        symbol: "NYSE:C",
        name: "Citigroup, Inc",
        currency: "USD",
        closingPrice: 123.45,
        price: 123.45
      },
      {
        _id: "2",
        type: "equity",
        symbol: "NYSE:B",
        name: "JP Morgan, Inc",
        currency: "USD",
        closingPrice: 23.45,
        price: 13.45
      },
      {
        _id: "3",
        type: "equity",
        symbol: "NYSE:B",
        name: "JP Morgan, Inc",
        currency: "USD",
        closingPrice: 3.45,
        price: 13.45
      }
    ];
    this.setState({ rows });
  }

  headers = [
    {
      path: "symbol",
      label: "Symbol"
    },
    {
      path: "name",
      label: "Name",
      content: item => <span className="shareName">{item.name} </span>
    },
    {
      path: "closingPrice",
      label: "Closing Price",
      content: item => <SharePrice share={item} />
    },
    {
      path: "valueChange",
      label: "Value Change",
      content: item => <ShareChange share={item} />
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
      if (exposure + tick <= limit * breach) {
        newItem.exposure = exposure + tick;
      } else {
        toast.error(`${description} reached the Breach`);
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
      <div>
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

export default Shares;
