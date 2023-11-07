import { IHistoricalAverage } from '../model/historical-average.interface';

export const getRiskLine = (points: IHistoricalAverage[]) => {
  const minValue = Math.min(...points.map((item) => item.min));
  const riskLine = +(minValue - 1).toFixed(0);
  return riskLine;
};
