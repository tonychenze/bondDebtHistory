import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import debtByClassService from "../../../services/debtByClassService";
import getTypeFromRows from "../common/getTypesFromRows";
import stringToDate from "../common/stringToDate";
import { sectorDescriptons } from "../debtHeader";
class HighChart extends Component {
  state = {
    rows: [],
    currentType: "BI"
  };
  async componentDidMount() {
    const response = await debtByClassService.getBonds();
    const rows = response ? response.data : [];
    this.setState({ rows });
  }

  getChartData = (list, type) => {
    //{dateInt : value }
    //{1538262000000: 50612.47}
    const reducedListObj = list.reduce((acc, cur) => {
      const dateInt = stringToDate(cur.maturityDate).getTime();
      if (acc[dateInt]) {
        acc[dateInt] += cur[type];
      } else {
        acc[dateInt] = cur[type];
      }
      return acc;
    }, {});

    const sortByDateList = Object.keys(reducedListObj)
      .sort((a, b) => a - b)
      .reduce((acc, cur) => {
        acc.push([parseInt(cur), reducedListObj[cur]]);
        return acc;
      }, []);

    return sortByDateList;
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

    const series = groups.map(group => this.getSeriesGroupData(group, data));
    const sortedSeries = series.map(item => item.sort((a, b) => a[0] - b[0]));
    return sortedSeries.map((item, index) => (
      <HighchartsReact
        highcharts={Highcharts}
        key={index}
        options={{
          title: { text: `${currentType} - Part ${index + 1}` },
          series: item,
          xAxis: {
            type: "datetime",
            labels: {
              format: "{value:%Y-%b-%e}"
            }
          }
        }}
      />
    ));
  };

  getSeriesGroupData = (seriesList, targetList) => {
    return seriesList.map(item => {
      const targetValue = this.getChartData(targetList, item);
      return { name: sectorDescriptons[item], data: targetValue };
    });
  };
  render() {
    const { rows } = this.state;

    const filtered = rows.filter(
      row => row.instrument === this.state.currentType
    );

    return (
      <div>
        {this.renderButtons()}
        {this.renderCharts(filtered)}
      </div>
    );
  }
}

export default HighChart;
