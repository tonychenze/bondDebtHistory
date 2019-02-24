import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

class Ciphertext extends Component {
  handleTextChange = event => {
    this.props.handleCipherTextChange(event.target.value);
  };
  render() {
    const { cipherText } = this.props;
    return (
      <div className="right">
        <center>
          <h2>Ciphertext</h2>
          <TextField
            multiline
            rowsMax="10"
            margin="normal"
            placeholder="Enter ciphertext"
            onChange={this.handleTextChange}
            value={cipherText}
          />
        </center>
      </div>
    );
  }
}

export default Ciphertext;

Ciphertext.propTypes = {
  handleCipherTextChange: PropTypes.func.isRequired,
  cipherText: PropTypes.string.isRequired
};
