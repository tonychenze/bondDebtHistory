import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Menu } from "@material-ui/core";
const range = 26;
let options = [];

for (let i = 0; i <= range; i++) {
  options.push(i.toString());
}

class Shift extends Component {
  handleShiftClick = event => {
    this.props.handleShiftChange(event.target.value);
  };
  render() {
    const { shiftValue } = this.props;
    return (
      <div className="shift">
        <center>
          <Select
            autoWidth={true}
            displayEmpty
            onChange={this.handleShiftClick}
            value={shiftValue}
          >
            <MenuItem value="" disabled>
              Enter shift amount
            </MenuItem>
            {options.map(option => (
              <MenuItem
                key={option}
                value={option}
                onClick={this.handleShiftClick}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </center>
      </div>
    );
  }
}

export default Shift;
