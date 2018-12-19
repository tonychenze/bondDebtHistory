import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import debtByClassService from "../../../services/debtByClassService";
class HighChart extends Component {
  state = {
    series1: [],
    series2: [],
    series3: [],
    total: []
  };
  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const rows = response ? response.data : [];
    const filtered = rows.filter(row => row.instrument === "LD");
    const sorted = filtered.sort((a, b) => {
      return this.stringToDate(a) > this.stringToDate(b) ? 1 : -1;
    });

    const firstChart = ["A", "B", "C", "D"];
    const secondChart = ["E", "F", "G", "H"];
    const thridChart = ["I", "II"];
    const totalChart = ["Total"];

    const series1 = this.getSeriesListData(firstChart, sorted);
    const series2 = this.getSeriesListData(secondChart, sorted);
    const series3 = this.getSeriesListData(thridChart, sorted);
    const total = this.getSeriesListData(totalChart, sorted);
    this.setState({
      series1,
      series2,
      series3,
      total
    });
  }

  getSeriesListData = (seriesList, targetList) => {
    return seriesList.map(item => {
      const targetValue = this.getValueList(targetList, item);
      return { data: targetValue };
    });
  };
  getValueList = (list, value) => {
    return list.map(item => item[value]);
  };

  stringToDate = maturityDate => {
    const dateArray = maturityDate.toString().split("/");
    return new Date(dateArray[2], dateArray[1], dateArray[0]);
  };
  render() {
    const options1 = {
      title: { text: "LD A-D" },
      series: this.state.series1
    };

    const options2 = {
      title: { text: "LD E-H" },
      series: this.state.series2
    };

    const options3 = {
      title: { text: "LD I and II" },
      series: this.state.series3
    };

    const total = {
      title: { text: "LD-Total" },
      series: this.state.total
    };

    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options1} />
        <HighchartsReact highcharts={Highcharts} options={options2} />
        <HighchartsReact highcharts={Highcharts} options={options3} />
        <HighchartsReact highcharts={Highcharts} options={total} />
      </div>
    );
  }
}

export default HighChart;
