import React from "react";

import { SyncLoader } from "react-spinners";

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <SyncLoader height={35} width={4} radius={2} color={"#5bc0de"} />
      </div>
    );
  }
}
