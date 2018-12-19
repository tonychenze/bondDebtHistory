import React, { Component } from "react";
import StockChartItem from "./stockChartItem";
import debtByClassService from "../../../services/debtByClassService";
import getTypeFromRows from "../common/getTypesFromRows";
import stringToDate from "../common/stringToDate";
import { headers } from "../debtHeader";

headers.splice(0, 2);
class StockChart extends Component {
  state = {
    rows: [],
    currentType: "BI",
    currentProperty: "A"
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

  handlePropertyClick = property => {
    this.setState({
      currentProperty: property
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

  renderPropetyButtonGroup = () => {
    console.log(headers);
    const filteredProps = headers.map(item => item.path);
    return filteredProps.map(property => (
      <button
        className="btn btn-success"
        onClick={() => this.handlePropertyClick(property)}
        style={{ margin: 10, width: 100 }}
        key={property}
        disabled={property === this.state.currentProperty}
      >
        {property}
      </button>
    ));
  };

  getRenderData = () => {
    const { rows, currentType, currentProperty } = this.state;
    const filteredRows = rows.filter(item => item.instrument === currentType);
    const renderData = filteredRows.reduce((acc, cur) => {
      const timeInInt = stringToDate(cur.maturityDate).getTime();
      acc.push([timeInInt, cur[currentProperty]]);
      return acc;
    }, []);

    return renderData;
  };

  render() {
    const { currentType, currentProperty } = this.state;
    const renderData = this.getRenderData();
    const sortedData = renderData.sort((a, b) => a[0] - b[0]);
    const headerItem = headers.filter(item => item.path === currentProperty)[0];
    const options = {
      title: {
        text: `Stock Chart of ${currentType} - ${headerItem.label}`
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
        <div>{this.renderTypeButtonGroup()}</div>
        <div>{this.renderPropetyButtonGroup()}</div>
        <StockChartItem options={options} />
      </div>
    );
  }
}

export default StockChart;
