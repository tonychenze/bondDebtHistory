import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import debtByClassService from "../../../services/debtByClassService";
import getTypeFromRows from "../common/getTypesFromRows";
import stringToDate from "../common/stringToDate";
import { sectorDescriptons } from "../debtHeader";
class HighChart extends Component {
  state = {
    series1: [],
    series2: [],
    series3: [],
    total: [],
    rows: [],
    currentType: "BI"
  };
  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const rows = response ? response.data : [];
    this.setState({ rows });
  }

  getValueList = (list, value) => {
    return list.map(item => item[value]);
  };

  handleTypeClick = type => {
    this.setState({
      currentType: type
    });
  };

  renderButtons = () => {
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

  handleTypeClick = type => {
    this.setState({ currentType: type });
  };

  renderCharts = data => {
    const { currentType } = this.state;
    const groups = [
      ["A", "B", "C", "D"],
      ["E", "F", "G", "H"],
      ["I", "II"],
      ["Total"]
    ];

    const series = groups.map(group => this.getSeriesListData(group, data));
    console.log(series);
    return series.map((item, index) => (
      <HighchartsReact
        highcharts={Highcharts}
        key={index}
        options={{
          title: { text: `${currentType} - Part ${index + 1}` },
          series: item
        }}
      />
    ));
  };

  getSeriesListData = (seriesList, targetList) => {
    return seriesList.map(item => {
      const targetValue = this.getValueList(targetList, item);
      return { name: sectorDescriptons[item], data: targetValue };
    });
  };
  render() {
    const { rows } = this.state;

    const filtered = rows.filter(
      row => row.instrument === this.state.currentType
    );

    const sorted = filtered.sort((a, b) => {
      return stringToDate(a) > stringToDate(b) ? 1 : -1;
    });

    return (
      <div>
        {this.renderButtons()}
        {this.renderCharts(sorted)}
      </div>
    );
  }
}

export default HighChart;
