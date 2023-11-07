import { ChartOptions } from 'chart.js';

export const getChartOptions = (riskLine: number): ChartOptions<'line'> => {
  return {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value: number | string) {
            if (value === riskLine) {
              return 'Risk';
            }
            return `${value} in.`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
};
