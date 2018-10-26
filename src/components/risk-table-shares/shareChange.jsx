import React, { Component } from "react";
class ShareChange extends Component {
  state = {
    changeStatus: "even"
  };

  getChangeClassName = () => {
    const { share } = this.props;
    if (share.price > share.closingPrice) return "increasePrice";
    if (share.price < share.closingPrice) return "decreasePrice";
    return "evenPrice";
  };
  getChangeIcon = () => {
    const { share } = this.props;
    const className = this.getChangeClassName();
    if (share.price > share.closingPrice) {
      return (
        <i className={`fa fa-chevron-up ${className}`} aria-hidden="true" />
      );
    }
    if (share.price < share.closingPrice) {
      return (
        <i className={`fa fa-chevron-down ${className}`} aria-hidden="true" />
      );
    }
    return null;
  };

  render() {
    const { share } = this.props;
    const valueChange = Math.abs(share.price - share.closingPrice).toFixed(2);
    const percentChange = Math.abs(
      ((share.price - share.closingPrice) / share.closingPrice) * 100
    ).toFixed(3);
    return (
      <React.Fragment>
        <span className={this.getChangeClassName()}>
          <span className="valueChange">
            {this.getChangeIcon()}
            {valueChange}
          </span>
          <span className="precentageChange">{`(${percentChange}%)`}</span>
        </span>
      </React.Fragment>
    );
  }
}

export default ShareChange;
