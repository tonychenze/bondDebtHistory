import React, { Component } from "react";
import StockChartItem from "./stockChartItem";
import debtByClassService from "../../../services/debtByClassService";
import getTypeFromRows from "../common/getTypesFromRows";
const options = {
  title: {
    text: "My stock chart"
  },
  series: [
    {
      data: [1, 2, 3]
    }
  ]
};

class StockChart extends Component {
  state = {
    rows: [],
    currentType: "BI"
  };

  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const rows = response ? response.data : [];
    this.setState({ rows });
  }

  handleTypeClick = type => {
    this.setState({
      currentType: type
    });
  };

  renderTypeButtonGroup = () => {
    const bondTypes = getTypeFromRows(this.state.rows);

    return bondTypes.map(type => (
      <button
        className="btn btn-primary"
        onClick={() => this.handleTypeClick(type)}
        style={{ margin: 10, width: 100 }}
        key={type}
        disabled={type === this.state.currentType}
      >
        {type}
      </button>
    ));
  };

  render() {
    return (
      <div>
        {this.renderTypeButtonGroup()}
        <StockChartItem options={options} />
      </div>
    );
  }
}

export default StockChart;
