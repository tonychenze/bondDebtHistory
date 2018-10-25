import React from "react";
const SharePrice = ({ share }) => {
  return (
    <span>
      <span className="sharePrice">{share.price}</span>
      <span className="shareCurrency">{share.currency}</span>
    </span>
  );
};

export default SharePrice;
