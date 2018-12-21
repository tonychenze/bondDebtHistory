import React, { Component } from "react";
import StockChartItem from "./stockChartItem";
import debtByClassService from "../../../services/debtByClassService";
import getChartData from "./getChartData";

class StockChart extends Component {
  state = {
    rows: []
  };

  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const rows = response ? response.data : [];
    this.setState({ rows });
  }

  getRenderData = () => {
    const { rows } = this.state;
    const { currentSector, currentType } = this.props;
    const filteredRows = rows.filter(item => item.instrument === currentType);
    return getChartData(filteredRows, currentSector);
  };

  render() {
    const { headers, currentSector, title } = this.props;
    const renderData = this.getRenderData();
    const sortedData = renderData.sort((a, b) => a[0] - b[0]);
    const headerItem = headers.filter(item => item.path === currentSector)[0];
    const options = {
      title: {
        text: title
      },
      series: [
        {
          name: headerItem.label,
          data: sortedData
        }
      ]
    };
    return (
      <div>
        <StockChartItem options={options} />
      </div>
    );
  }
}

export default StockChart;
