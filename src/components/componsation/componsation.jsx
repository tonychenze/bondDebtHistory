import React, { Component } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Componsation extends Component {
  render() {
    const options = {
      title: {
        text: "Glassdoor - Associate compensation"
      },
      xAxis: {
        categories: ["M.Stanley", "Goldman", "BoA", "Bloomberg", "Citi"]
      },
      series: [
        {
          name: "Base",
          data: [70168, 71023, 72403, 72663, 76181]
        },
        {
          name: "Total Pay",
          data: [101000, 102000, 86000, 85000, 157000]
        }
      ]
    };
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default Componsation;
