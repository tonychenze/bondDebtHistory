import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class Navigation extends Component {
  state = { collapsed: true };
  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "navbar-toggler navbar-toggler-right collapsed"
      : "navbar-toggler navbar-toggler-right";
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          TradePass
        </Link>
        <button
          onClick={this.toggleNavbar}
          className={`${classTwo}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`${classOne}`} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/risktable">
                FX
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shares">
                Shares
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/debtByClass">
                All Bond Types
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/bondLD">
                Total By Class
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/highChart">
                High Charts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/stockChart">
                Stock Charts
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;
