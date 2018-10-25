import React, { Component } from "react";
import _ from "lodash";
import TableSortable from "../common/tableSortable";
import ShareChange from "./shareChange";
import SharePrice from "./sharePrice";
import ShareLocalService from "../../services/shareService";
import "./shares.css";

class Shares extends Component {
  constructor() {
    super();
    this.shareService = new ShareLocalService();
    this.state = {
      stocks: this.shareService.getUserStocks(),
      currentSortColumn: { path: "symbol", order: "asc" }
    };
  }

  componentDidMount() {
    this.shareService = new ShareLocalService();
    //get data from endpoint calling http service
    this.state.stocks.forEach(stock => {
      this.shareService.addStockListener(tick => this.handleTick(tick));
    });
  }

  componentWillUnmount() {
    this.state.stocks.forEach(stock => {
      this.shareService.removeStockListner();
    });
  }

  handleTick = tick => {
    const changeStock = this.state.stocks.filter(
      stock => stock.symbol === tick.symbol
    );
    if (changeStock && changeStock.price !== tick.price) {
      this.setState({ stocks: this.shareService.getUserStocks() });
    }
  };
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
      key: "valueChange",
      label: "Value Change",
      content: item => <ShareChange share={item} />
    }
  ];

  handleSort = currentSortColumn => {
    this.setState({ currentSortColumn });
  };

  render() {
    const { currentSortColumn, stocks } = this.state;
    const sortedRows = _.orderBy(
      stocks,
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
            rowIdVal={"symbol"}
          />
        </div>
      </div>
    );
  }
}

export default Shares;
