import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Plaintext from "./Plaintext";
import Ciphertext from "./Ciphertext";
import Shift from "./Shift";
import "./CaesarApp.css";

const charCounts = 26;

class CaesarApp extends Component {
  state = {
    plainText: "",
    cipherText: "",
    shift: ""
  };

  convertText = (textArr, shift) => {
    if (shift === "" || shift === undefined) return textArr.join("");
    const shiftNum = parseInt(shift);

    if (shiftNum < 0) {
      return this.convertText(textArr, shiftNum + charCounts);
    }

    let output = "";
    for (let i = 0; i < textArr.length; i++) {
      let char = textArr[i];

      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0);
        if (code >= 65 && code <= 90)
          output += String.fromCharCode(((code - 65 + shiftNum) % 26) + 65);
        else output += String.fromCharCode(((code - 97 + shiftNum) % 26) + 97);
      } else if (char === " " || char === "\t" || char === "\n") {
        output += " ";
      }
    }

    return output;
  };

  plainToCipher = plain => {
    const { shift } = this.state;
    if (shift === 0) return plain;
    return this.convertText(plain.split(""), shift);
  };

  cipherToPlain = cipher => {
    const { shift } = this.state;
    if (shift === 0) return cipher;
    return this.convertText(cipher.split(""), -shift);
  };

  handleShiftChange = shift => {
    this.setState({ shift, plainText: "", cipherText: "" });
  };

  handlePlainChange = plainText => {
    const cipherText = this.plainToCipher(plainText);
    this.setState({ plainText, cipherText });
  };

  handleCipherChange = cipherText => {
    const plainText = this.plainToCipher(cipherText);
    this.setState({ plainText, cipherText });
  };

  render() {
    const { plainText, cipherText, shift } = this.state;
    return (
      <div className="container">
        <center>
          <h1>Caesar's Cipher</h1>
        </center>
        <Shift handleShiftChange={this.handleShiftChange} shiftValue={shift} />
        <Paper elevation={10} className="child-container">
          <Plaintext
            handlePlainTextChange={this.handlePlainChange}
            plainText={plainText}
          />
          <Ciphertext
            handleCipherTextChange={this.handleCipherChange}
            cipherText={cipherText}
          />
        </Paper>
      </div>
    );
  }
}

export default CaesarApp;
