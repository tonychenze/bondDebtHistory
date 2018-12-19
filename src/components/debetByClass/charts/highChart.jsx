import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import debtByClassService from "../../../services/debtByClassService";
import getTypeFromRows from "../common/getTypesFromRows";
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

  getSeriesListData = (seriesList, targetList) => {
    return seriesList.map(item => {
      const targetValue = this.getValueList(targetList, item);
      return { name: item, data: targetValue };
    });
  };
  getValueList = (list, value) => {
    return list.map(item => item[value]);
  };

  stringToDate = maturityDate => {
    const dateArray = maturityDate.toString().split("/");
    return new Date(dateArray[2], dateArray[1], dateArray[0]);
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

  render() {
    const { currentType, rows } = this.state;

    const filtered = rows.filter(
      row => row.instrument === this.state.currentType
    );

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
    const totalData = this.getSeriesListData(totalChart, sorted);

    const options1 = {
      title: { text: `${currentType} [A,B,C,D]` },
      series: series1
    };

    const options2 = {
      title: { text: `${currentType} [E,F,G,H] ` },
      series: series2
    };

    const options3 = {
      title: { text: `${currentType} [I, II]` },
      series: series3
    };

    const total = {
      title: { text: `${currentType} Total` },
      series: totalData
    };

    return (
      <div>
        {this.renderButtons()}
        <HighchartsReact highcharts={Highcharts} options={options1} />
        <HighchartsReact highcharts={Highcharts} options={options2} />
        <HighchartsReact highcharts={Highcharts} options={options3} />
        <HighchartsReact highcharts={Highcharts} options={total} />
      </div>
    );
  }
}

export default HighChart;
