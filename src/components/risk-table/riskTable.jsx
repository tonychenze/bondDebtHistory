import React, { Component } from "react";
import TableHeader from "../common/tableHeader";

class RiskTable extends Component {
  state = {
    currentSortColumn: { path: "1", order: "asc" }
  };
  handleSort = currentSortColumn => {
    this.setState({ currentSortColumn });
    console.log("risktable sort item : ", currentSortColumn);
  };
  headers = [{ path: "1", label: "1" }, { path: "2", label: "2" }];
  body= [{path:'1', _id:'1', }]
  render() {
    const { currentSortColumn } = this.state;
    return (
      <div className="row">
        <div className="col-10 offset-1">
          <table className="table table-striped table-hover">
            <TableHeader
              columns={this.headers}
              onSort={this.handleSort}
              sortColumn={currentSortColumn}
            />
          </table>
        </div>
      </div>
    );
  }
}

export default RiskTable;
