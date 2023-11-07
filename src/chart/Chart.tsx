import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js/auto';

import { historicalAverage } from './data/historical-average';
import { currentPrecip } from './data/current-precip';
import { getColorRisk } from './lib/get-color-risk';
import { calculateRisks } from './lib/calculate-risks';
import { getRiskLine } from './lib/get-risk-line';
import { getChartOptions } from './lib/get-options';

import './chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const riskLine = getRiskLine(historicalAverage);
  const calculatedRisk = calculateRisks(historicalAverage, currentPrecip);
  const options = getChartOptions(riskLine);

  return (
    <div className="container">
      <div className="legend">
        <p className="legend_title">Legend</p>
        <div className="lines">
          <div className="legend_item">
            <img src="./Line.svg" /> Historical Average(10 yr)
          </div>
          <div className="legend_item">
            <img src="./BlackLine.svg" /> Current Precip.
          </div>
          <div className="legend_item">
            <span className="optimalBlock" /> Optimal Precip. Zone
          </div>
          <p className="precipitation-score">Daily Precipitation Score</p>
          <div className="legend_item">
            <div className="risk highRisk" /> High risk
          </div>
          <div className="legend_item">
            <div className="risk midRisk" /> Modarate risk
          </div>
          <div className="legend_item">
            <div className="risk lowRisk" /> Low risk
          </div>
        </div>

        <p className="legend_content">
          The daily precipitation risk score is based on your locations current
          precipitation levels and how far away they are from optimal
          precipitation limits.
        </p>
      </div>
      <div className="chart">
        <div className="chart_header">
          <div className="chart_header-title">
            Growing Season: Cumulative Precipitation
          </div>
          <div className="chart_header-right">
            <div className="chart_header-today-risk">
              Today Risk: <span className="green">Low</span>
            </div>
            <div className="selector">
              <div className="selector_item selector_item__selected">MTH</div>
              <div className="selector_item">YR</div>
            </div>
          </div>
        </div>
        <Line
          data={{
            labels: historicalAverage.map((item) =>
              new Date(item.date).getDate()
            ),
            datasets: [
              {
                data: historicalAverage.map((item) => item.value),
                pointRadius: 0,
                borderDash: [8, 8],
                borderColor: '#5276ff',
              },
              {
                data: currentPrecip.map((item) => item.value),
                pointRadius: 0,
                borderColor: '#000',
              },
              {
                data: historicalAverage.map((item) => item.min),
                pointRadius: 0,
                showLine: false,

                borderColor: 'rgba(230, 245, 251, 0.6)',
              },
              {
                fill: '-1',
                data: historicalAverage.map((item) => item.max),
                pointRadius: 0,
                backgroundColor: 'rgba(230, 245, 251, 0.6)',
                borderColor: 'rgba(230, 245, 251, 0.6)',
              },
              {
                data: calculatedRisk.map(() => riskLine),
                segment: {
                  borderColor: (ctx) =>
                    getColorRisk(calculatedRisk[ctx.p0DataIndex]),
                },
                pointRadius: 0,
                borderWidth: 10,
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
}

export default Chart;
