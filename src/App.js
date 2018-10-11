import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/navigation";
import RiskTable from "./components/risk-table/riskTable";
import Monitor from "./components/monitor/monitor";
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
