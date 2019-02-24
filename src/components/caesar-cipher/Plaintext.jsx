import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

class Plaintext extends Component {
  handleTextChange = event => {
    this.props.handlePlainTextChange(event.target.value);
  };
  render() {
    const { plainText } = this.props;
    return (
      <div className="left">
        <center>
          <h2>Plaintext</h2>
          <TextField
            multiline
            rowsMax="10"
            margin="normal"
            placeholder="Enter plaintext"
            onChange={this.handleTextChange}
            value={plainText}
          />
        </center>
      </div>
    );
  }
}

export default Plaintext;
