import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/navigation";
import RiskTable from "./components/risk-table-fx/riskTable";
import RiskEntryForm from "./components/risk-table-fx/riskEntryForm";
import Monitor from "./components/monitor/monitor";
import DebtClassTable from "./components/debet-bond/bondTypeTable/debt-type-table";
import TotalByClassTable from "./components/debet-bond/summaryTable/summaryTable";
import HighChart from "./components/debet-bond/charts/highChart";
import Shares from "./components/risk-table-shares/shares";
import Componsation from "./components/componsation/componsation";
import NotFound from "./components/not-found/not-found";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Navigation />
        <Switch>
          <Route path="/monitor" component={Monitor} />
          <Route path="/debtByClass" component={DebtClassTable} />
          <Route path="/highChart" component={HighChart} />
          <Route path="/bondSummary" component={TotalByClassTable} />
          <Route path="/shares" component={Shares} />
          <Route path="/risktable/:id" component={RiskEntryForm} />
          <Route path="/risktable" component={RiskTable} />
          <Route path="/compensation" component={Componsation} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/bondSummary" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
