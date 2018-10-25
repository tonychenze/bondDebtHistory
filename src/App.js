import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/navigation";
import RiskTable from "./components/risk-table-fx/riskTable";
import RiskEntryForm from "./components/risk-table-fx/riskEntryForm";
import Monitor from "./components/monitor/monitor";
import Shares from "./components/risk-table-shares/shares";
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
          <Route path="/shares" component={Shares} />
          <Route path="/risktable/:id" component={RiskEntryForm} />
          <Route path="/risktable" component={RiskTable} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/risktable" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
